//Client-side JS logic 

//excutes only after HTML is loaded
$(document).ready(() => { 
  $('.error-message').hide();
  //check the tweet submitted isn't empty or exceeds max characters otherwise post it to the browser
  const submitHandler = (text) => {
      //aync js always return a promise allows to send http request (get post put delete) without refreshing the page. Always start with $.ajax, its a function inside jquery
      $.ajax({ //return a promise, so needs success or fail cb. async so need to know the page is loaded and the tweet is submited before running
        url: '/tweets',
        method: 'POST',
        data: text,
        success: () => {
          refresh();
        }, 
        error: () => {
          $('.error-message').slideDown();
          $('.error-message strong').text("Could not submit tweet");
        }
      });
  };

  //reset the page so that textarea is empty and charcount is 140
  const refresh = () => {
    $('textarea').val('');
    $('.counter').text(140);
    $('#tweet-container').empty();
    loadTweets();
  };

  //form submission using jquery to grab elements from the HTML
  $('.tweet-form').submit(function (event) {
    event.preventDefault();
    const text = $(this).find('#tweet-text').val();
    $('.error-message').hide();
    if (text.length === 0) {
      $('.error-message').slideDown();
      $('.error-message strong').text("Your tweet is empty!");
      return;
    } else if (text.length > 140) {
      $('.error-message').slideDown();
      $('.error-message strong').text("Your tweet exceeds the maximum characters!");
      return;
    } else {
      submitHandler($(this).serialize());
    }
  })

  //load tweets to the html page
  const loadTweets = function () {
    $.ajax({ url: './tweets', method: 'GET' })
      .done(tweets => renderTweets(tweets))
      .fail(error => console.log(`Error:`, error))
  }

  //loop through the tweets and append to the tweet container
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const renderedTweet = createTweetElement(tweet);
      $('#tweet-container').prepend(renderedTweet);
    }
  };

  //prevent cross-site scripting(XSS) attack  - re-encodes user text so that unsafe characters are converted into a safe "encoded" representation
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //make the page dynamic
  const createTweetElement = function (tweet) {
    const timeStamp = timeago.format(tweet.created_at);

    let $tweet = `<article class="tweet">
    
    <header class="user-name">
    <div>
    <img src=${tweet.user.avatars}/>
    <span> ${tweet.user.name} </span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    
    <div class="content"> 
    ${escape(tweet.content.text)}
    </div>
    
    <footer class="tweet-footer">
    <span>${timeStamp}</span>
      <div>
        <i id="flag" class="fa-solid fa-flag"></i>
        <i id="retweet" class="fa-solid fa-retweet"></i>
        <i id="heart" class="fa-solid fa-heart"></i>
      </div>
    </footer>
    </article>`;

    return $tweet;
  }

  //first time that the page loads all the tweets
  loadTweets(); 
});
