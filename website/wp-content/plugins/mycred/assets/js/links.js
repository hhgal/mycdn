/**
 * myCRED Points for Link Clicks jQuery Scripts
 * @contributors Kevin Reeves
 * @since 0.1
 * @version 1.4
 */
jQuery(function($) {
	var mycred_click = function( href, title, target, skey ) {
		$.ajax({
			type : "POST",
			data : {
				action : 'mycred-click-points',
				url    : href,
				token  : myCREDlink.token,
				etitle : title,
				key    : skey
			},
			dataType : "JSON",
			url : myCREDlink.ajaxurl,
			success    : function( data ) {
				console.log( data );
				if ( target == 'self' || target == '_self' )
					window.location.href = href;
			}
		});
	};
	
	$('.mycred-points-link').click(function(){
		var target = $(this).attr( 'target' );
		//console.log( target );
		if ( typeof target === 'undefined' ) {
			target = 'self';
		}
		
		mycred_click( $(this).attr( 'href' ), $(this).text(), target, $(this).attr( 'data-token' ) );
		
		if ( target == 'self' || target == '_self' ) return false;
	});
});