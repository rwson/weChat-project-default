/**
 *
 *  build by bsawang @ 2013-11-20
 *
 * history
 *  rwson  @ 2015-01-10 二次封装，修复bug
 *  rwson  @ 2015-01-17 增加animationEnd/transitionEnd事件的兼容处理
 *  rwson  @ 2015-02-04 修复bug，增加百度touch.js插件，单体模式创建jxTool对象，并提供属性方法
 *  rwson  @ 2015-02-06 修复bug，增加各类型浏览器判断、音乐播放器，并提供属性方法，简化调用
 *
 *  一些工具方法
 *
 */

if (!window.jxTool) {
    jxTool = {};
    window.jxTool = top.jxTool = jxTool;
}

var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                "trident": u.indexOf("Trident") > -1, //IE内核
                "presto": u.indexOf("Presto") > -1, //opera内核
                "webKit": u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                "gecko": u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                "mobile": !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                "ios": !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                "android": u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
                "iPhone": u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
                "iPad": u.indexOf("iPad") > -1, //是否iPad
                "webApp": u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },

    jxTool = {
        /**
         *
         * @param key required
         * @param val required
         * @param time optional
         * 设置cookie，并可以自定义保存时间
         *
         */
        "setCookie": function (key, val, time) {
            var days = time || 30,
                date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = key + "=" + escape(val) + ";expires=" + data.toGMTString();
        },

        /**
         *
         * @param key
         * @returns {*}
         * 根据当前传入的值获取相应的cookie
         *
         */
        "getCookie": function (key) {
            var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },

        /**
         *
         * @param key
         * 根据当前传入的key值删除相应的
         *
         */
        "deleteCookie": function (key) {
            var date = new Date();
            date.setTime(date.getTime() - 1);
            var cval = this.getCookie(key);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为空
         *
         */
        "isNull": function (obj) {
            return (typeof obj == "undefined") || (obj == null) || (obj.length == 0);
        },

        /**
         *
         * @param obj required
         * @returns {boolean}
         * 根据传入参数的构造器判断是否为一个日期对象
         *
         */
        "isDate": function (obj) {
            return (obj.constructor == Date);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为数字,最少一位
         *
         */
        "isNumber": function (string) {
            return (/[\d]{1,}/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为浮点数
         *
         */
        "isFloat": function (string) {
            return (/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为整数,最少一位
         *
         */
        "isInt": function (string) {
            return (/^-?\d+$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为小写字母,最少一位
         *
         */
        "isLowerCase": function (string) {
            return (/^[a-z]+$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为大写字母,最少一位
         *
         */
        "isUpperCase": function (string) {
            return (/^[A-Z]+$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为字母,最少一位
         *
         */
        "isLetter": function (string) {
            return (/^[a-zA-Z]+$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为中文,最少一位
         *
         */
        "isChinese": function (string) {
            return (/^[\u4e00-\u9fa5]+$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 根据传入参数验证是否为ip地址
         *
         */
        "isIp": function (string) {
            if ((/^([0-9]{1,3}\.){3}[0-9]{1,3}$/).test(string)) {
                var stringArr = string.split("."),
                    res = true;
                $.each(stringArr, function (i, j) {
                    if (jxTool.isNumber(j) && parseInt(j) > 0 && j < 255) {
                    } else {
                        res = false;
                    }
                });
                return res;
            } else {
                return false;
            }
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为字符串
         *
         */
        "isWord": function (string) {
            return /^[a-zA-Z0-9_]+$/.test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为邮箱
         *
         */
        "isEmail": function (string) {
            return (/^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为手机号
         *
         */
        "isMobile": function (string) {
            return (/^1\d{10}$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为网址
         *
         */
        "isUrl": function (string) {
            return (/^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为身份证号
         *
         */
        "isIdNumber": function (string) {
            return (/^[\d]{15}$/).test(string) || (/[^\d]{17}[\d|X|x]{1}$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为QQ号
         *
         */
        "isQQ": function (string) {
            return (/^[1-9]{1}[\d]{4,11}$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为电话号
         *
         */
        "isTelephone": function (string) {
            return (/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {boolean}
         * 判断是否为邮编
         *
         */
        "isPostalCode": function (string) {
            return (/^[0-9]{6}$/).test(string);
        },

        /**
         *
         * @param string required
         * @returns {number}
         * 返回字符串长度，中文算2个字符
         *
         */
        "stringLength": function (string) {
            var length = 0;
            for (var i = 0; i < string.length; i++) {
                if (string.charCodeAt(i) > 255) {
                    length += 2;
                } else {
                    length++;
                }
            }
            return length;
        },

        /**
         *
         * @param min required
         * @param max required
         * @returns {number}
         * 根据传入的最值区间返回区间内任意值
         *
         */
        "getRangeRandom": function (min, max) {
            return (Math.floor(Math.random() * (max - min)) + min);
        },

        /**
         *
         * @param opt required
         * 创建音乐播放器
         *
         */
        "musicPlayer": function (opt) {
            var defaults = {
                    "music": "music/small-apple.mp3",
                    "autoPlay": true,
                    "controller": true
                },
                opts = $.extend({}, defaults, opt || {}),
                music = $("<audio id='mp3Player' style='display:none;width:0;height:0;opacity:0;'> + <source src='" + opts["music"] + "' type='audio/mpeg'>"),
                controller = $("<div class='mp3controller wait absolute'></div>");
            $("div.zoomer").append(music);
            if (opts["autoPlay"]) {
                document.addEventListener("WeixinJSBridgeReady", function () {
                    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                        $(music).get(0).play();
                    });
                }, false);
            }
            if (opts["controller"]) {
                $("div.zoomer").append(controller);
                $("div.mp3controller").bind("touchend",function () {
                    if (document.getElementById("mp3Player").paused) {
                        $(this).removeClass("pause");
                        document.getElementById("mp3Player").play();
                    } else {
                        $(this).addClass("pause");
                        document.getElementById("mp3Player").pause();
                    }
                });
            }
        }
    };

//异步菊花
function loading(state, callback) {
    if (state == "start") {
        $("body").prepend('<div id="loading"><div id="loading_bg"></div><div id="loading_div"><div id="loading_pic"></div></div></div>');
    } else if (state == "stop") {
        $("#loading").remove();
    }
}

//jquery ajax 异步调用
function gA(url, type, data, useLoading, callbackFunction) {
    $.ajax({
        type: type,
        dataType: "json",
        url: url,
        data: data,
        beforeSend: function () {
            if (useLoading) {
                loading("start");
            }
        },
        complete: function (XMLHttpRequest) {
            if (useLoading) {
                loading("stop");
            }
        },
        success: function (json) {
            if (json.code == 1) {
                callbackFunction(json);
            } else {
                alerw(json.mess);
            }
        },
        error: function (XMLHttpRequest, textStatus, thrownError) {
            alerw("访问出错，请刷新或重新登录");
        }
    });
}

function gAcode(url, type, data, useLoading, callbackFunction) {
    $.ajax({
        type: type,
        dataType: "json",
        url: url,
        data: data,
        beforeSend: function () {
            if (useLoading) {
                loading("start");
            }
        },
        complete: function (XMLHttpRequest) {
            if (useLoading) {
                loading("stop");
            }
        },
        success: function (json) {
            //if (json.code == code) {
            callbackFunction(json);
            //} else {
            //alerw(json.mess);
            //}
        },
        error: function (XMLHttpRequest, textStatus, thrownError) {
            alerw("访问出错，请刷新或重新登录");
        }
    });
}


function showShareTip(type) {
    var pictype = type || "share";

    var tipdom = $('<div id="jxtip">' +
    '<img src="http://www.juxinbox.com/img/jxshare/jx' + pictype + '.png" />' +
    '<a class="jxtiplogo"></a>' +
    '</div>');

    tipdom.css({
        "width": "100%",
        "height": $(document).outerHeight() + 390,
        "backgroundColor": "rgba(102,102,102,0.98)",
        "position": "absolute",
        "left": "0",
        "top": "0",
        "zIndex": "99999"
    });

    $("img", tipdom).css({
        "width": "100%",
        "position": "absolute"
    });

    $(".jxtiplogo", tipdom).css({
        "display": "block",
        "width": "188px",
        "height": "20px",
        "backgroundImage": "url('http://www.juxinbox.com/img/jxshare/jxlogo.png')",
        "backgroundSize": "contain",
        "position": "absolute",
        "marginLeft": "-94px",
        "left": "50%",
        "bottom": "40px"
    });

    tipdom.click(function () {
        $(this).remove();
    });

    $("body").append(tipdom);
}

//自定义警告框
function alerw(content, titletext, btext, okFunction) {

    with (window.top.document) {

        if ($("#alerw")[0]) {
            $("#alerw").remove();
        }

        if (content == null || String(content) == "") {
            content = "发生错误，请重试";
        }
        if (titletext == null || String(titletext) == "") {
            titletext = "注意";
        }
        if (btext == null || String(btext) == "") {
            btext = "确定";
        }

        $("body").append("<div id='alerw'></div>");
        $("#alerw").hide();
        $("#alerw").append("<div id='alerw_bg'></div>");
        $("#alerw").append("<div id='alerw_div'></div>");
        $("#alerw_div").append("<div class='title'>" + titletext + "</div>");
        $("#alerw_div").append("<div class='content'>" + content + "</div>");
        $("#alerw_div").append("<a class='ab ab_one ab_ok' href='javascript:;'>" + btext + "</a>");

        $("#alerw").animate({opacity: 'show'}, 100, "", function () {
            $("#alerw").focus();
        });

        $("#alerw_div .wx_close").click(function () {
            $("#alerw").animate({opacity: 'hide'}, 100);
        });

        $("#alerw_div .ab_ok").click(function () {
            $("#alerw").animate({ opacity: 'hide'}, 100, "", function () {
                if (okFunction) {
                    okFunction();
                }
            });
        });

        $("#alerw").bind("keypress", function (e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                $("#alerw_div .ab_ok").addClass("active");
                $("#alerw_div .ab_ok").click();
            }
        });

    }

}

//自定义确认框
function confirw(content, titletext, btext, bctext, okFunction, cancelFunction) {

    with (window.top.document) {

        if ($("#alerw")[0]) {
            $("#alerw").remove();
        }
        if (content == null || String(content) == "") {
            content = "发生错误，请重试";
        }
        if (titletext == null || String(titletext) == "") {
            titletext = "请确认";
        }
        if (btext == null || String(btext) == "") {
            btext = "确定";
        }
        if (bctext == null || String(bctext) == "") {
            bctext = "取消";
        }

        $("body").append("<div id='alerw'></div>");
        $("#alerw").hide();
        $("#alerw").append("<div id='alerw_bg'></div>");
        $("#alerw").append("<div id='alerw_div'></div>");
        $("#alerw_div").append("<div class='title'>" + titletext + "</div>");
        $("#alerw_div").append("<div class='content'>" + content + "</div>");

        $("#alerw_div").append("<a class='ab ab_two ab_c' href='javascript:;'>" + bctext + "</a>");
        $("#alerw_div").append("<a class='ab ab_two ab_ok' href='javascript:;'>" + btext + "</a>");

        $("#alerw").animate({opacity: 'show'}, 100, "", function () {
            $("#alerw").focus();
        });

        $("#alerw_div .ab_ok").click(function () {
            $("#alerw").animate({ opacity: 'hide'}, 100, "", function () {
                if (okFunction) {
                    okFunction();
                }
            });
        });

        $("#alerw_div .ab_c").click(function () {
            $("#alerw").animate({opacity: 'hide'}, 100, "", function () {
                if (cancelFunction) {
                    cancelFunction();
                }
            });
        });

        $("#alerw").bind("keypress", function (e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                $("#alerw_div .ab_ok").addClass("active");
                $("#alerw_div .ab_ok").click();
            } else if (ev.keyCode == 27) {
                $("#alerw_div .ab_c").addClass("active");
                $("#alerw_div .ab_c").click();
            }
        })

    }

}

//检测网址合法
function checkurl(url) {

    if (url != null && url != "") {
        url = url.toLocaleLowerCase();
        var strRegex = "(https?|ftp|mms):\/\/([_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?";
        var re = new RegExp(strRegex);
        if (!re.test(url)) {
            alerw("网址格式不合法");
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

//检测邮箱合法性
function checkemail(email) {

    var strRegex = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
    var re = new RegExp(strRegex);
    if (!re.test(email)) {
        alerw("请输入正确的邮箱格式");
        return false;
    } else {
        return true;
    }
}

//缩减字符串长度
function sss(str, sl) {

    var str1 = $('<div>' + str + '</div>').text();
    return str1.length > sl ? str1.substr(0, sl) + ".." : str;

}

//保留两位小数
function ff(money) {
    return parseFloat(Math.floor(money * 10000) / 10000).toFixed(2);
}

//时间字符串转换为时间对象
function ttime(str) {
    var s = str.split(" ");
    var s1 = s[0].split("-");
    var s2 = s[1].split(":");
    return new Date(s1[0], s1[1] - 1, s1[2], s2[0], s2[1], s2[2]);
}

function ttime2(mms) {
    return new Date(mms);
}

function ftime(time) {
    return time.format("yyyy-MM-dd hh:mm:ss");
}

//时间输出格式化
Date.prototype.format = function (format) {

    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return format;
};

/**
 *
 * @param show
 * @param text
 *
 * 给层做一个高度的自适应
 */

function screenalert(show, text) {
    if (show) {
        var alertdom = $('<div class="screenalert">' +
        '<div class="mask">' +
        '<div class="info">' +
        text +
        '</div></div></div>');

        if ($("body .screenalert")[0]) {
            $("div .screenalert").replaceWith(alertdom);
        } else {
            $("body").append(alertdom);
        }

    } else {
        $("div.screenalert").remove();
    }

    $("#loading").css({
        "height": $(document).height() > $("body").height() ? $(document).height() : $("body").height()
    });
}

/**
 *
 * @param imgurls   [String/Array]
 * @param callback  [Function]
 *
 * 用于预加载页面静态图片，在图片未加载完全时，显示一个遮罩，优化用户体验
 */

function preloadImage(imgurls, callback) {
    if (imgurls.length > 0) {
        loading("start");
        screenalert(true, "正在加载图片，请稍候 ( 0 / " + imgurls.length + " )");
        var loadedimgs = [];
        $.each(imgurls, function (i, imgurl) {
            var img = new Image();
            img.src = imgurl;
            img.onload = function () {
                loadedimgs.push(imgurl);
                $(".info").text("正在加载图片，请稍候 （ " + loadedimgs.length + " / " + imgurls.length + " ）");
                if (loadedimgs.length == imgurls.length) {
                    $(".info").text("加载完成");
                    loading("stop");
                    screenalert(false);
                    callback && $.isFunction(callback) && callback();
                }
            };
        })
    } else {
        callback && $.isFunction(callback) && callback();
    }
}

/**
 *
 * @param callback Function Required
 *
 * CSS3 中的animationEnd事件兼容处理
 */

$.fn.animateEnd = function (callback) {
    var names = {
        "Moz": "animationend", "webkit": "webkitAnimationEnd", "ms": "MSAnimationEnd", "O": "oAnimationEnd"
    };
    for (var i in names) {
        if (names[i]) {
            this.on(names[i], function () {
                callback && $.isFunction(callback) && callback();
            });
        }
    }
}


/**
 *
 * @param callback Function Required
 *
 * CSS3 中的transitionEnd事件兼容处理
 */
$.fn.transitionEnd = function (callback) {
    var names = {
        "Moz": "transitionend", "webkit": "webkitTransitionEnd", "ms": "MSTransitionEnd", "O": "oTransitionEnd"
    };
    for (var i in names) {
        if (names[i]) {
            this.on(names[i], function () {
                callback && $.isFunction(callback) && callback();
            });
        }
    }
}

/**
 *
 * 阻止页面滚动
 */
function preventScroll() {
    $(document).bind("touchmove", function (ev) {
        var oEv = ev || event;
        if (oEv.preventDefault) {
            oEv.preventDefault();
        } else {
            return false;
        }
    });
}
