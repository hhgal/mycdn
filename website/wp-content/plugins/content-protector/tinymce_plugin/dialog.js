var contentProtectorDialog = {
    init : function() {
        jQuery('#use_captcha').click(
            function() {
                jQuery('#password').val(captcha_pw);
            }
        );
        jQuery('#set_pc_cookie').click(
            function() {
                if (jQuery(this).is(':checked'))  {
                    jQuery('input[id^="expiry_type_"]').removeAttr('disabled');
                }  else {
                    jQuery('input[id^="expiry_"]').prop('disabled', 'disabled');
                }
            }
        );
        jQuery('#expiry_type_duration').change(
            function() {
                if (jQuery(this).is(':checked'))  {
                    jQuery('#expiry_date').prop('disabled', 'disabled');
                    jQuery('#expiry_time').prop('disabled', 'disabled');
                    jQuery('#expiry_tz').prop('disabled', 'disabled');
                    jQuery('#expiry_duration_quantity').removeAttr('disabled');
                    jQuery('#expiry_duration_unit').removeAttr('disabled');
                }
            }
        );
        jQuery('#expiry_type_datetime').change(
            function() {
                if (jQuery(this).is(':checked'))  {
                    jQuery('#expiry_date').removeAttr('disabled');
                    jQuery('#expiry_time').removeAttr('disabled');
                    jQuery('#expiry_tz').removeAttr('disabled');
                    jQuery('#expiry_duration_quantity').prop('disabled', 'disabled');
                    jQuery('#expiry_duration_unit').prop('disabled', 'disabled');
                    jQuery('#expiry_date').datepicker(
                        {
                            changeMonth: true,
                            changeYear: true
                        }
                    );
                    jQuery('#expiry_time').timepicker(
                        {
                            defaultTime: 'now'
                        }
                    );
                }
            }
        );
        jQuery('#expiry_type_end_of_session').change(
            function() {
                if (jQuery(this).is(':checked'))  {
                    jQuery('#expiry_date').prop('disabled', 'disabled');
                    jQuery('#expiry_time').prop('disabled', 'disabled');
                    jQuery('#expiry_tz').prop('disabled', 'disabled');
                    jQuery('#expiry_duration_quantity').prop('disabled', 'disabled');
                    jQuery('#expiry_duration_unit').prop('disabled', 'disabled');
                }
            }
        );
    },

    action : function() {
        // Get settings from the dialog and build the arguments for the shortcode
        var password_args = "";
        var expiry_args = "";
        var identifier_args = "";
        var ajax_args = "";

        var exdq = Math.abs(parseInt(jQuery('#expiry_duration_quantity').val()));
        var exdu = jQuery('#expiry_duration_unit option:selected').val();
        var pw = jQuery('#password').val();
        var idt = jQuery('#identifier').val();

        if (jQuery('#set_pc_cookie').prop('checked')) {
            if (jQuery('#expiry_type_duration').prop('checked')) {
                if (isNaN(exdq)) {
                    tinyMCEPopup.alert(errorMessages.durationIsNaN);
                    return;
                }
                expiry_args = " cookie_expires=\"" + exdq + " " + exdu + "\"";
            }
            else if (jQuery('#expiry_type_datetime').prop('checked'))
                expiry_args = " cookie_expires=\"" + jQuery('#expiry_date').val() + " " +  jQuery('#expiry_time').val() + " " +  jQuery('#expiry_tz option:selected').val() + "\"";
            else if (jQuery('#expiry_type_end_of_session').prop('checked'))
                expiry_args = " cookie_expires=\"0\"";
            else {
                tinyMCEPopup.alert(errorMessages.noCookieExpires);
                return;
            }
        }

        if (pw.length > 0) {
            var re = /^[.A-Za-z0-9\/]+$/;
            if (re.test(pw))
                password_args = " password=\"" + pw + "\"";
            else {
                tinyMCEPopup.alert(errorMessages.badPassword);
                return;
            }
        }
        else {
            tinyMCEPopup.alert(errorMessages.noPassword);
            return;
        }

        if (idt.length > 0) {
            identifier_args = " identifier=\"" + idt + "\"";
        }

        if (jQuery('#ajax').prop('checked')) {
            if (idt.length > 0) {
                ajax_args = " ajax=\"true\"";
            } else {
                tinyMCEPopup.alert(errorMessages.noIdentifier);
                return;
            }
        }

        // Insert the contents from the input into the document
        tinyMCEPopup.editor.execCommand('mceReplaceContent', false, '[' + shortcode + ' ' + password_args + expiry_args + identifier_args + ajax_args + ']{$selection}[/' + shortcode + ']');
        tinyMCEPopup.close();
    }

};

tinyMCEPopup.onInit.add(contentProtectorDialog.init, contentProtectorDialog);
