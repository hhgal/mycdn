/*
 WPFront Notification Bar Plugin
 Copyright (C) 2013, WPFront.com
 Website: wpfront.com
 Contact: syam@wpfront.com
 
 WPFront Notification Bar Plugin is distributed under the GNU General Public License, Version 3,
 June 2007. Copyright (C) 2007 Free Software Foundation, Inc., 51 Franklin
 St, Fifth Floor, Boston, MA 02110, USA
 
 */

(function() {
    var $ = jQuery;

    //displays the notification bar
    window.wpfront_notification_bar = function(data) {
        var keep_closed_cookie = "wpfront-notification-bar-keep-closed";

        var spacer = $("#wpfront-notification-bar-spacer").show();
        var bar = $("#wpfront-notification-bar");
        var open_button = $("#wpfront-notification-bar-open-button");

        //set the position
        if (data.position == 1) {
            var top = 0;
            if (data.fixed_position && data.is_admin_bar_showing) {
                top = $("html").css("margin-top");
                if (top == "0px")
                    top = $("html").css("padding-top");
                top = parseInt(top);
            }
            if (data.fixed_position) {
                top += data.position_offset;
            }
            bar.css("top", top + "px");
            open_button.css("top", top + "px");
            $("body").prepend(spacer);
            spacer.css("top", data.position_offset + "px");
        }
        else {
            $("body").append(spacer);
            bar.css("bottom", "0px");
        }

        var height = bar.height();
        if (data.height > 0) {
            height = data.height;
            bar.find("table, tbody, tr").css("height", "100%");
        }

        bar.height(0).css({"position": (data.fixed_position ? "fixed" : "relative"), "visibility": "visible"});
        open_button.css({"position": (data.fixed_position ? "fixed" : "absolute")});

        //function to set bar height based on options
        var closed = false;
        var user_closed = false;
        function setHeight(height, callback, userclosed) {
            callback = callback || $.noop;

            if (userclosed)
                user_closed = true;

            if (height == 0) {
                if (closed)
                    return;
                closed = true;
            }
            else {
                if (!closed)
                    return;
                closed = false;
            }

            var fn = callback;
            callback = function() {
                fn();
                if (height > 0) {
                    //set height to auto if in case content wraps on resize
                    if (data.height == 0)
                        bar.height("auto");
                    open_button.hide();
                    closed = false;
                }
                if (height == 0 && data.display_open_button) {
                    open_button.show();
                }
                if (height == 0 && data.keep_closed && userclosed) {
                    if (data.keep_closed_for > 0)
                        $.cookie(keep_closed_cookie, 1, {path: "/", expires: data.keep_closed_for});
                    else
                        $.cookie(keep_closed_cookie, 1, {path: "/"});
                }
            };

            //set animation
            if (data.animate_delay > 0) {
                bar.stop().animate({"height": height + "px"}, data.animate_delay * 1000, "swing", callback);
                if (data.fixed_position)
                    spacer.stop().animate({"height": height + "px"}, data.animate_delay * 1000);
            }
            else {
                bar.height(height);
                if (data.fixed_position)
                    spacer.height(height);
                callback();
            }

        }

        if (data.close_button) {
            bar.find(".wpfront-close").click(function() {
                setHeight(0, null, true);
            });
        }

        //close button action
        if (data.button_action_close_bar) {
            bar.find(".wpfront-button").click(function() {
                setHeight(0, null, true);
            });
        }

        if (data.display_open_button) {
            open_button.click(function() {
                setHeight(height);
            });
        }

        if (data.keep_closed) {
            if ($.cookie(keep_closed_cookie)) {
                setHeight(0);
                return;
            }
        }

        closed = true;

        if (data.display_scroll) {
            setHeight(0);

            $(window).scroll(function() {
                if (user_closed)
                    return;

                if ($(this).scrollTop() > data.display_scroll_offset) {
                    setHeight(height);
                }
                else {
                    setHeight(0);
                }
            });
        }
        else {
            //set open after seconds and auto close seconds.
            setTimeout(function() {
                setHeight(height, function() {
                    if (data.auto_close_after > 0) {
                        setTimeout(function() {
                            setHeight(0, null, true);
                        }, data.auto_close_after * 1000);
                    }
                });
            }, data.display_after * 1000);
        }
    };
})();