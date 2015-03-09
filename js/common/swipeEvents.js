/**
 *
 *  build by rwson @ 2015-02-13
 *
 *  移动端的一些触摸事件兼容，依赖于jQuery或者zepto
 *
 *  支持"swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "tap", "longTap", "drag" 8重手势事件
 *
 *  ex:
 *  $.swipe(function(ev){
 *      callback()
 *  });
 *
 */
(function ($) {
    var options, Events, Touch;
    options = {
        x: 20,
        y: 20
    };
    Events = ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "tap", "longTap", "drag"];
    //  存储手势名称到数组
    Events.forEach(function (eventName) {
        $.fn[eventName] = function () {
            var touch = new Touch($(this), eventName);
            touch.start();
            if (arguments[1]) {
                options = arguments[1];
            }
            return this.on(eventName, arguments[0]);
        }
    });
    //  循环事件名称数组，绑定相应事件和回调
    Touch = function () {
        var status, ts, tm, te;
        this.target = arguments[0];
        this.e = arguments[1];
    };
    //  建立Touch对象
    Touch.prototype.framework = function (e) {
        e.preventDefault();
        var events;
        if (e.changedTouches) events = e.changedTouches[0];
        else events = e.originalEvent.touches[0];
        return events;
    };
    Touch.prototype.start = function () {
        var self = this;
        self.target.on("touchstart",
            function (event) {
                event.preventDefault();
                var temp = self.framework(event);
                var d = new Date();
                self.ts = {
                    x: temp.pageX,
                    y: temp.pageY,
                    d: d.getTime()
                };
            });
        self.target.on("touchmove",
            function (event) {
                event.preventDefault();
                var temp = self.framework(event);
                var d = new Date();
                self.tm = {
                    x: temp.pageX,
                    y: temp.pageY
                };
                if (self.e == "drag") {
                    self.target.trigger(self.e, self.tm);
                    return;
                }
            });
        self.target.on("touchend",
            function (event) {
                event.preventDefault();
                var d = new Date();
                if (!self.tm) {
                    self.tm = self.ts;
                }
                self.te = {
                    x: self.tm.x - self.ts.x,
                    y: self.tm.y - self.ts.y,
                    d: (d - self.ts.d)
                };
                self.tm = undefined;
                self.factory();
            })
    };
    //  触摸开始，记录相关变量
    Touch.prototype.factory = function () {
        var x = Math.abs(this.te.x);
        var y = Math.abs(this.te.y);
        var t = this.te.d;
        var s = this.status;
        if (x < 5 && y < 5) {
            if (t < 300) {
                s = "tap";
            } else {
                s = "longTap";
            }
        } else if (x < options.x && y > options.y) {
            if (t < 100) {
                if (this.te.y > 0) {
                    s = "swipeDown";
                } else {
                    s = "swipeUp";
                }
            } else {
                s = "swipe";
            }
        } else if (y < options.y && x > options.x) {
            if (t < 100) {
                if (this.te.x > 0) {
                    s = "swipeLeft";
                } else {
                    s = "swipeRight";
                }
            } else {
                s = "swipe";
            }
        }
        if (s == this.e) {
            this.target.trigger(this.e);
            return;
        }
    };
    //  判断为具体某种事件
})(window.jQuery || window.Zepto);