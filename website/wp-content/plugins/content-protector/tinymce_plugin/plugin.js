/**
 * editor_plugin.js
 *
 */

(function() {
	tinymce.create('tinymce.plugins.contentProtectorPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished its initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
            var buttonOpts = {};
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceContentProtector', function() {
				ed.windowManager.open({
					file : ajaxurl + '?action=contentProtectorPluginGetTinyMCEDialog',
					width : 520,
					height : 400,
					inline : 1
				}, {
					plugin_url : url, // Plugin absolute URL
				});
			});

			// Register example button
            if (contentProtectorAdminTinyMCEOptions.image.length > 0) {
                buttonOpts.title = contentProtectorAdminTinyMCEOptions.desc;
                buttonOpts.cmd = 'mceContentProtector';
                buttonOpts.image = url + contentProtectorAdminTinyMCEOptions.image;
            } else {
                buttonOpts.title = contentProtectorAdminTinyMCEOptions.desc;
                buttonOpts.cmd = 'mceContentProtector';
            }
            buttonOpts.stateSelector = "img";

            // Register example button
            ed.addButton(contentProtectorAdminTinyMCEOptions.handle, buttonOpts);
		},

		/**
		 * Creates control instances based in the incoming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like list-boxes, split buttons, etc. then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use in order to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : contentProtectorAdminTinyMCEOptions.desc,
				author : 'K. Tough',
				authorurl : 'http://wordpress.org/plugins/content-protector/',
				infourl : 'http://wordpress.org/plugins/content-protector/',
				version : contentProtectorTinyMCEOptions.version
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add(contentProtectorAdminTinyMCEOptions.handle, tinymce.plugins.contentProtectorPlugin);
})();