/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const renderedTweet = createTweetElement(tweet);
    $('#tweet-container').append(renderedTweet);
  }
};

const createTweetElement = function(tweet) {
let $tweet = `<article class="tweet">

<header class="user-name">
  <div>
    <img src=${tweet.user.avatars}/>
    <span> ${tweet.user.name} </span>
  </div>
  <span class="handle">${tweet.user.handle}</span>
</header>

<div class="content"> 
  ${encodeURIComponent(tweet.content.text)}
</div>

<footer class="tweet-footer">
  <span>${tweet.created_at}</span>
  <div>
    <i id="flag" class="fa-solid fa-flag"></i>
    <i id="retweet" class="fa-solid fa-retweet"></i>
    <i id="heart" class="fa-solid fa-heart"></i>
  </div>
</footer>
</article>`;
return $tweet;
}

{/* renderTweets(data); */}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.