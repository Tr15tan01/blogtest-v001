// const img = document.getElementsByClassName('masthead')[0]

//     img.classList.add('is-loaded')  
    
// This is "probably" IE9 compatible but will need some fallbacks for IE8
// - (event listeners, forEach loop)

// wait for the entire page to finish loading
window.addEventListener('load', function() {
	
	// setTimeout to simulate the delay from a real page load
	setTimeout(lazyLoad, 1000);
	
});

function lazyLoad() {
	var blur_image = document.querySelector('.blur-image');

		var image_url = blur_image.getAttribute('data-image-full');
		var content_image = blur_image.querySelector('img');
		
		// change the src of the content image to load the new high res photo
		content_image.src = image_url;
		
		// listen for load event when the new photo is finished loading
		content_image.addEventListener('load', function() {
			// swap out the visible background image with the new fully downloaded photo
			blur_image.style.backgroundImage = 'url(' + image_url + ')';
			// add a class to remove the blur filter to smoothly transition the image change
			blur_image.className = blur_image.className + ' is-loaded';
	});
	
}

