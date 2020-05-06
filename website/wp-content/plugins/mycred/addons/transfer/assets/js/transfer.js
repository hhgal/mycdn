/**
 * myCRED Transfer jQuery
 * Handles transfer requests and autocomplete of recipient search.
 *
 * @requires jQuery
 * @requires jQuery UI
 * @requires jQuery Autocomplete
 * @since 0.1
 * @version 1.5
 */
(function($) {

	var mycred_transfer_submit = '';
	var mycred_transfer_cache  = {};

	$( 'input.mycred-click' ).on( 'click', function(){

		mycred_transfer_submit = $(this);

	});

	// Autocomplete
	// @api http://api.jqueryui.com/autocomplete/
	$( 'input.mycred-autofill' ).autocomplete({

		minLength: 2,
		source: function( request, response ) {

			var term = request.term;
			if ( term in mycred_transfer_cache ) {
				response( mycred_transfer_cache[ term ] );
				return;
			}
			
			var send = {
				action : "mycred-autocomplete",
				token  : myCRED.atoken,
				string : request
			};

			$.getJSON( myCRED.ajaxurl, send, function( data, status, xhr ) {
				mycred_transfer_cache[ term ] = data;
				response( data );
			});

		},
		messages: {
			noResults: '',
			results: function() {}
		},
		appendTo : 'div.transfer-to'

	});

	// Transfer form submissions
	// @since 1.6.3
	$( 'div.mycred-transfer-cred-wrapper' ).on( 'submit', 'form.mycred-transfer', function(e){

		var buttonlabel = mycred_transfer_submit.val();

		e.preventDefault();

		$.ajax({
			type       : "POST",
			data       : {
				action    : 'mycred-transfer-creds',
				form      : $(this).serialize(),
				token     : myCRED.token
			},
			dataType   : "JSON",
			url        : myCRED.ajaxurl,
			beforeSend : function() {

				mycred_transfer_submit.attr( 'disabled', 'disabled' ).val( myCRED.working );

			},
			success    : function( data ) {

				mycred_transfer_submit.removeAttr( 'disabled' ).val( buttonlabel );

				// Error
				if ( myCRED[ data ] !== undefined ) {

					alert( myCRED[ data ] );

				}

				// Completed
				else if ( data == 'ok' ) {

					alert( myCRED.completed );

				}

				if ( myCRED.reload == '1' ) location.reload();

			}

		});

		return false;

	});

})( jQuery );