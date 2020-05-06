jQuery(document).ready(function($){

	var el = $('.advanced-browser-check');

	if(el.length > 0) { // If the wrapper container exists, continue

		var url = el.data('url');

		if(!$.cookie('abc-hide')) {

			var ajax_action = {'action': 'abc_ajax'};

			$.post(url.abc_url, ajax_action, function(response) {
				
				if(response) {

					// We will need to add a css class to the body
					// if we detect IE 6 for combability css to load
					// properly
					if ($(response).find('.old-ie').length > 0) {
						$('body').addClass('abc-old-ie');
					}

					// Put in HTML response into the wrapper container
					el.html(response).show();

					// Hide the overlay if the close btn is clicked
					el.on('click','a.abc-hide',function(e){
						e.preventDefault();

						el.fadeOut('slow');
						$.cookie("abc-hide", true, { expires: 1, path: '/' });
					});
					
				}

			});

		}

	}

});