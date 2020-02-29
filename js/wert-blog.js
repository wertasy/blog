/*!
 * Wertasy's Blog v0.9.1 (http://canhui.wang)
 * Copyright 2020 Wertasy <wertasy@qq.com>
 */

/**
* 缓冲函数
* @param {Number} position 当前滚动位置
* @param {Number} destination 目标位置
* @param {Number} rate 缓动率
* @param {Function} callback 缓动结束回调函数 两个参数分别是当前位置和是否结束
*/
var easeout = function (position, destination, rate, callback) {
    if (position === destination || typeof destination !== 'number') {
        return false;
    }
    destination = destination || 0;
    rate = rate || 2;

    // 不存在原生`requestAnimationFrame`，用`setTimeout`模拟替代
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (fn) {
            return setTimeout(fn, 17);
        }
    }

    var step = function () {
        position = position + (destination - position) / rate;
        if (Math.abs(destination - position) < 1) {
            callback(destination, true);
            return;
        }
        callback(position, false);
        requestAnimationFrame(step);
    };
    step();
}

var scrollTopSmooth = function (position) {
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    easeout(scrollTop, position, 0, function (val) {
        window.scrollTo(0, val);
    });
}

$backToTop = document.querySelector('.back-to-top')
$backToTop.addEventListener('click', function () {
    if (typeof window.getComputedStyle(document.body).scrollBehavior === 'undefined') {
        scrollTopSmooth(200);
    } else {
        $header = document.querySelector('header')
        $header.scrollIntoView();
    }
}, false);

var prev = 0;
$(window).scroll(function () {
    var curr = $(this).scrollTop();
    if (curr > 460 && (prev > curr && !$(".appreciate-button").hasClass("active") || document.body.clientWidth > 768)) {
        $('.back-to-top').fadeIn("fast");
    } else {
        $('.back-to-top').fadeOut("fast");
    }
    prev = curr;
});



$(".appreciate-button").click(function (e) {
    console.log(".appreciate-button clicked");

    $(this).addClass("active");
    if (document.body.clientWidth < 768) {
        $('.back-to-top').fadeOut("fast");
    }
    $(".appreciate-popup").focus();
    $(".appreciate-popup").animatescroll({ scrollSpeed: 250, easing: 'easeInQuad', padding: Math.abs(window.screen.availHeight - $(this).height()) / 4 });
});

$(".appreciate-popup").click(function (e) {
    e.stopPropagation();
});

$(".qrcode-img").click(function (e) {
    $(this).animatescroll({ scrollSpeed: 250, easing: 'easeInQuad', padding: Math.abs(window.screen.availHeight - $(this).height()) / 4 })
});

$(".appreciate-popup").blur(function () {
    $(".appreciate-button").removeClass("active");
});