$(function () {
    $("button.hamburger").on("click", function (e) {
        // 漢堡icon切換
        $(this).toggleClass("is-active");
        // 選單
        $(".ham-nav").slideToggle(600);
        // 黑背景
        $(".ham-bg").slideToggle();
    });

    $(".ham-bg").on("click", function (e) {
        $(".ham-nav").slideToggle(600);
        $(".ham-bg").slideToggle();
    })
})