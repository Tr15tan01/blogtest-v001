const img = document.getElementsByClassName('masthead')[0]

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    img.classList.add('is-loaded')  
    
  });