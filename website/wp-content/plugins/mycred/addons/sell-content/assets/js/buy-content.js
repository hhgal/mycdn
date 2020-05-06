/**
 * myCRED Sell Content
 * @since 1.1
 * @version 1.0.1
 */
(function($) {

	var mycred_buy_content = function( button, label ) {

		wrapper = button.parents( 'div.mycred-content-forsale' );

		$.ajax({
			type : "POST",
			data : {
				action    : 'mycred-buy-content',
				postid    : button.attr( 'data-id' ),
				token     : myCREDsell.token
			},
			dataType : "HTML",
			url : myCREDsell.ajaxurl,
			// Before we start
			beforeSend : function() {

				button.attr( 'value', myCREDsell.working );
				button.attr( 'disabled', 'disabled' );
				wrapper.slideUp();

			},
			// On Successful Communication
			success    : function( data ) {

				wrapper.empty();
				wrapper.append( data );
				wrapper.slideDown();

			}
		});

	};
	
	$( '.mycred-sell-this-button' ).click(function(){

		mycred_buy_content( $(this), $(this).attr( 'value' ) );

	});

})( jQuery );