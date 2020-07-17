$(document).ready(function () {
    $('.menu-toggler').on('click',function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click',function(){
        $('.menu-toggler').removeClass('open');
        $('.top-nav').removeClass('open');
    });

    AOS.init({
        easing: 'ease',
        duration: 1800,
        once: false
    });

});


function getMessages() {
  fetch('/data').then(response => response.json()).then((cmts) => {

    console.log(cmts);
    const cmtListElement = document.getElementById('msgs-container');

    cmtListElement.innerHTML = '';

    for (const cmtsingle of cmts) { 		      
         cmtListElement.appendChild(createParaElement(cmtsingle.commentInput));  		
      }
    
  });
}


function createParaElement(text) {
  const ParaElement = document.createElement('p');
  ParaElement.innerText = text;
  return ParaElement;
}



