/**
 *
 *  build by bsawang @ 2013-11-20
 *
 * update
 *  rwson  @ 2015-01-10
 *  rwson  @ 2015-01-17 增加animationEnd/transitionEnd事件的兼容处理
 *
 *  一些工具方法
 */

//设置cookie
function SetCookie(name, value) {

    var Days = 180;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}

//读取cookie
function getCookie(name) {

    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;

}

//删除cookie
function delCookie(name) {

    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();

}

//获取网址参数
function getQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;

}

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

function Aj(json) {
    alert(JSON.stringify(json));
}

function showShareTip(type) {

    var pictype = type || "share";

    var tipdom = $('<div id="jxtip">' +
        '<img src="http://www.juxinbox.com/img/jxshare/jx' + pictype + '.png" />' +
        '<a class="jxtiplogo"></a>' +
        '</div>');

    tipdom.css({
        "width": "100%",
        "height": "100%",
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


function obj2query(data, encode) {

    var querystr = "";
    var objarr = [];

    if (encode) {
        $.each(data, function (i, p) {
            objarr.push(i + "=" + encodeURIComponent(encodeURIComponent(p)));
        });
    } else {
        $.each(data, function (i, p) {
            objarr.push(i + "=" + ((p)));
        });
    }

    querystr = objarr.join("&");
    return querystr;
}

function query2obj(query, encode) {

    var obj = {};
    var objarr = [];
    objarr = query.split("&");

    if (encode) {

        $.each(objarr, function (i, p) {
            obj[objarr[i].split("=")[0]] = decodeURIComponent(decodeURIComponent(objarr[i].split("=")[1]));
        });

    } else {

        $.each(objarr, function (i, p) {
            obj[objarr[i].split("=")[0]] = ((objarr[i].split("=")[1]));
        });

    }
    return obj;
}


function obj2array(object) {

    var objectArray = [];
    for (var o in object) {

        objectArray.push({"name": o, "value": object[o]});
    }
    return objectArray;
}


function array2obj(array) {
    var object = {};
    $.each(array, function (i, p) {
        object[p.name] = p.value;
    });
    return object;
}

/**
 *
 * @param show
 * @param text
 *
 * 将screenalert遮罩层加到all里面,修复断层的情况
 */

function screenalert(show, text) {
    if (show) {
        var alertdom = $('<div class="screenalert">' +
            '<div class="mask">' +
            '<div class="info">' +
            text +
            '</div></div></div>');

        if ($("div#all .screenalert")[0]) {
            $("div.screenalert").replaceWith(alertdom);
        } else {
            $("div#all").append(alertdom);
        }

    } else {
        $("div#all .screenalert").remove();
    }

    $("#loading").css({
        "height":$(document).height() > $("body").height() ? $(document).height() : $("body").height()
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

$.fn.animateEnd = function(callback){
    var names = {
        "Moz" : "animationend"
        ,"webkit" : "webkitAnimationEnd"
        ,"ms" : "MSAnimationEnd"
        ,"O" : "oAnimationEnd"
    };
    for(var i in names){
        if(names[i]){
            this.on(names[i],function(){
                callback && $.isFunction(callback) && callback();
            });
        }
    }
};


/**
 *
 * @param callback Function Required
 *
 * CSS3 中的transitionEnd事件兼容处理
 */
$.fn.transitionEnd = function(callback){
    var names = {
        "Moz" : "transitionend"
        ,"webkit" : "webkitTransitionEnd"
        ,"ms" : "MSTransitionEnd"
        ,"O" : "oTransitionEnd"
    };
    for(var i in names){
        if(names[i]){
            this.on(names[i],function(){
                callback && $.isFunction(callback) && callback();
            });
        }
    }
};