$(function () {
    $("button.hamburger").on("click", function (e) {
        // 漢堡icon切換
        $(this).toggleClass("is-active");
        // 選單
        $(".ham-nav").slideToggle(600);
        // 黑背景
        $(".ham-bg").slideToggle();
    });

    // 點擊黑背景, 也可關閉
    $(".ham-bg").on("click", function (e) {
        $(".ham-nav").slideToggle(600);
        $(".ham-bg").slideToggle();
    })

    // 
    $(window).scroll(function (e) {
        // scrollTop() 獲取元素從最上方往下滑動的距離
        // 除以100 , 代表元素往下滑0px~100px,透明度由 0~1
        // 超過100px 之後,透明度就都是1
        var v = ($(this).scrollTop()) / 200;
        $("header").css('backgroundColor', `rgb(0, 189, 209,${v})`)

        if (v >= 0.35) {
            v = 0.35;
            $("header").css('boxShadow', `0 0 5px rgba(0, 0, 0, ${v})`)
        } else {
            $("header").css('boxShadow', `0 0 5px rgba(0, 0, 0, ${v})`)
        }
    })
})