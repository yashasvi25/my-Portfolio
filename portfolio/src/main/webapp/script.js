// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */

/*
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}*/

$(document).ready(function () {
    $('.menu-toggler').on('click',function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click',function(){
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    /*$('nav a[href="#').on('click',function(){
        $('html, body').animate( keyframes: {
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, options:2000);
    });*/

    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: false
    });

});

/*
function getHelloMsg() {
  console.log('Fetching hello message.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}


function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addQuoteToDom() function.
  textPromise.then(addMessageToDom);
}

/*
/** Adds a random quote to the DOM. 
function addMessageToDom(msg) {
  console.log('Adding message to dom: ' + msg);

  const msgContainer = document.getElementById('msg-container');
  //msgContainer.innerHTML('<h1></h1>');
  msgContainer.innerText = msg;
}

/**
 * The above code is organized to show each individual step, but we can use an
 * ES6 feature called arrow functions to shorten the code. This function
 * combines all of the above code into a single Promise chain. You can use
 * whichever syntax makes the most sense to you.
 
function getHelloMessageUsingArrowFunctions() {
    console.log('using arrow functions');
  fetch('/data').then(response => response.text()).then((msg) => {
    document.getElementById('msg-container').innerText = msg;
  });
}

/**
 * Another way to use fetch is by using the async and await keywords. This
 * allows you to use the return values directly instead of going through
 * Promises.
 
async function getHelloMessageUsingAsyncAwait() {
  const response = await fetch('/data');
  const msg = await response.text();
  document.getElementById('msg-container').innerText = msg;
}

*/

function getMessages() {
  fetch('/data').then(response => response.json()).then((msgs) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content

    console.log(msgs[0]);
    console.log(msgs[1]);
    console.log(msgs[2]);

    const msgListElement = document.getElementById('msgs-container');

    msgListElement.innerHTML = '';
     
    msgListElement.appendChild(
        createListElement(msgs[0]));
    msgListElement.appendChild(
        createListElement(msgs[1]));
    msgListElement.appendChild(
        createListElement(msgs[2]));
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}



