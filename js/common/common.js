/**
 *
 *  build by rwson @ 2015-01-10
 *
 *  完成微信端的一些自适应屏幕功能(css3中的缩放特性)
 */

$(function () {

    var phoneWidth = parseInt(window.screen.width),
        phoneScale = phoneWidth / 640,
        ua = navigator.userAgent;
    if (/Android/.test(ua)) {
        if (/Android (\d+\.\d+)/.test(ua)) {
            var version = parseFloat(RegExp.$1);
            $("head").append('<meta name="viewport" content="initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5, width=640, target-densitydpi=device-dpi">');
        } else {
            $("head").append('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
        }
    } else {
        $("head").append('<meta name="viewport" content="initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5, user-scalable=no">');
    }

    var w = $(window).width();
    var h = $(window).height();

    var scale = w / 640;

    var tw = Math.ceil(w / scale);
    var th = Math.ceil(h / scale);

    $(".zoomer").css({
        "-webkit-transform-origin": "0 0",
        "-moz-transform-origin": "0 0",
        "-ms-transform-origin": "0 0",
        "-o-transform-origin": "0 0",
        "transform-origin": "0 0"
    });
    $(".zoomer").css({
        "-webkit-transform": "scale(" + scale + "," + scale + ")",
        "-moz-transform": "scale(" + scale + "," + scale + ")",
        "-ms-transform": "scale(" + scale + "," + scale + ")",
        "-o-transform": "scale(" + scale + "," + scale + ")",
        "transform": "scale(" + scale + "," + scale + ")"
    });

    $("html").css({"width": w});
    $("html").css({"height": h});
    $("body").css({"width": w});
    $("body").css({"height": h});

    $(".zoomer").css({"width": tw});
    $(".zoomer").css({"height": th});

    $(".wrap").css({"height": th});

    var imgs = [
        "img/common/loading.gif",
        "img/common/pop_close.png",
        "http://h.hiphotos.baidu.com/image/pic/item/0823dd54564e9258e653d8e39e82d158ccbf4e53.jpg",
        "http://c.hiphotos.baidu.com/image/pic/item/a71ea8d3fd1f4134c5f15073271f95cad0c85efc.jpg",
        "http://f.hiphotos.baidu.com/image/pic/item/b219ebc4b74543a95f4ed0c41c178a82b9011464.jpg",
        "http://c.hiphotos.baidu.com/image/pic/item/730e0cf3d7ca7bcbc0ac8422bc096b63f724a8ec.jpg",
        "http://g.hiphotos.baidu.com/image/pic/item/9a504fc2d562853553a9290e93ef76c6a7ef6350.jpg"
    ];

    preloadImage(imgs, function () {
    });

});


