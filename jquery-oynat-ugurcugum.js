/**
 * Oynat Uğurcugum - Animated List Plug-In
 * Author: Erhan KARACA erhan@turuncuweb.net
 */
; (function ($) {
    var pluginName = 'oynat_ugurcugum';

    function Plugin(element, options) {
        var el = element;
        var $el = $(element);

        options = $.extend({}, $.fn[pluginName].defaults, options);

        function init() {
            hook('onInit');
        }

        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        function destroy() {
            $el.each(function () {
                var el = this;
                var $el = $(this);

                // Add code to restore the element to its original state...

                hook('onDestroy');
                $el.removeData('plugin_' + pluginName);
            });
        }

        function hook(hookName) {
            if (options[hookName] !== undefined) {
                options[hookName].call(el);
            }
        }

        function getBaseAnimation(){
            return {
                "-webkit-transform": "translate3d(30%,0,0)",
                "transform": "translate3d(30%,0,0)",
                "opacity": "0",
            }
        }

        function getAnimation(animName, duration){
            return {
                "-webkit-transform": "translate3d(0,0,0)",
                "transform": "translate3d(0,0,0)",
                "opacity": "1",
                "transition-delay": duration + "s",
            }
        }

        function setupList(){
            $el.find("li").each(function(index) {
                var li = this;
                var $li = $(this);
                $li.css(getAnimation(options.anim, options.duration * (index + 1)));
            });
        }


        init();
        setupList();

        return {
            option: option,
            destroy: destroy,
        };
    }

    $.fn[pluginName] = function (options) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function () {
                if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    };

    $.fn[pluginName].defaults = {
        onInit: function () { },
        onDestroy: function () { },
        anim: "fadeInLeft",
        duration: 0.05,
    };

})(jQuery);