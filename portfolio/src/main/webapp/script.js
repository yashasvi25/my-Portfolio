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

function CheckLoginStatus()
{
    fetch('/login').then(response => response.json()).then((IsUserLogged) => {

    console.log(IsUserLogged);
    
    var commentSection = document.getElementById('comment-section');
    var login = document.getElementById('login');
    var logout = document.getElementById('logout');


    if(IsUserLogged)
    {
        if(commentSection.style.display == '')
        {
            commentSection.style.display = 'block';
        }

        if(logout.style.display == '')
        {
            logout.style.display = 'block';
        }

        if(login.style.display == 'block')
        {
            login.style.display = 'none';
        }

    }
    else{
        console.log(login.style.display);
        if(login.style.display == '')
        {
            login.style.display = 'block';
        }

        if(commentSection.style.display == 'block')
        {
            commentSection.style.display = 'none';
        }

        if(logout.style.display == 'block')
        {
            logout.style.display = 'none';
        }

    }
    
  });
}

function createMap() {
  const map = new google.maps.Map(
      document.getElementById('map'),
      {center: {lat: 24.571270, lng: 73.691544}, zoom: 12});
}


function getMessages() {
  
  fetch('/data').then(response => response.json()).then((cmts) => {

    console.log(cmts);
    const cmtListElement = document.getElementById('msgs-container');

    cmtListElement.innerHTML = '';

    for (const cmtsingle of cmts) { 		      
         cmtListElement.appendChild(createParaElement(cmtsingle.email + " : " + cmtsingle.commentInput));  		
      }
    
  });
}


function createParaElement(text) {
  const ParaElement = document.createElement('p');
  ParaElement.innerText = text;
  return ParaElement;
}



