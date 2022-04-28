// ----天氣 -----
$.ajax({
  url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-16A11C7F-6E46-4EF1-8C1F-9DF233FE4835&format=JSON&locationName=%E8%87%BA%E5%8C%97%E5%B8%82",
  method: "GET",
  dataType: "json",
  success: function (re) {
    //   console.log(re); //先測試拿到了什麼
    // data 存撈回來的全部資料
    let data = re;
    // startTime存日期時間
    let startTime =
      data.records.location[0].weatherElement[0].time[0].startTime;
    // weather存天氣 例:多雲 晴天
    let weather =
      data.records.location[0].weatherElement[0].time[0].parameter
        .parameterName;
    // weatherValue 天氣的id 可以用switch做判斷決定天氣圖片
    let weatherValue =
      data.records.location[0].weatherElement[0].time[0].parameter
        .parameterValue;
    // lowTemp存最低氣溫
    let lowTemp =
      data.records.location[0].weatherElement[2].time[0].parameter
        .parameterName;
    // highTemp存最高氣溫
    let highTemp =
      data.records.location[0].weatherElement[4].time[0].parameter
        .parameterName;
    // rain存降雨機率
    let rain =
      data.records.location[0].weatherElement[1].time[0].parameter
        .parameterName;
    // location存地點:台北市
    let location = data.records.location[0].locationName;
    // ---------------bbbbbbb----------------------
    let startTimeb =
      data.records.location[0].weatherElement[0].time[1].startTime;
    let todayb = startTime.substr(0, 10);
    let weatherb =
      data.records.location[0].weatherElement[0].time[1].parameter
        .parameterName;
    let weatherValueb =
      data.records.location[0].weatherElement[0].time[1].parameter
        .parameterValue;
    let lowTempb =
      data.records.location[0].weatherElement[2].time[1].parameter
        .parameterName;
    let highTempb =
      data.records.location[0].weatherElement[4].time[1].parameter
        .parameterName;
    let rainb =
      data.records.location[0].weatherElement[1].time[1].parameter
        .parameterName;

    // 根據weatherValue判斷天氣圖片要用哪張
    // weatherValue是String,用+轉換成Number
    // switch (+weatherValue) {
    //   case 2:
    //     $(".w_img").attr("src", "img/weather_03.svg");
    //     break;
    //   case 3:
    //     $(".w_img").attr("src", "img/weather_03.svg");
    //     break;

    //   case 4:
    //     $(".w_img").attr("src", "img/weather_04.svg");
    //     break;

    //   case 5:
    //     $(".w-img").attr("src", "img/weather_05.svg");
    //     break;

    //   case 9:
    //     $(".w_img").attr("src", "img/weather_08.svg");
    //     break;

    //   default:
    //     break;
    // }
    if (+weatherValue > 0) {
      $(".w_img").attr("src", "img/weather_03.svg");
    }
    if (+weatherValueb > 0) {
      $(".w_imgb").attr("src", "img/weather_04.svg");
    }
    // switch (+weatherValueb) {
    //   case 2:
    //     $(".w_imgb").attr("src", "img/weather_03.svg");
    //     break;

    //   case 3:
    //     $(".w_imgb").attr("src", "img/weather_03.svg");
    //     break;

    //   case 4:
    //     $(".w_imgb").attr("src", "img/weather_04.svg");
    //     break;

    //   case 5:
    //     $(".w_imgb").attr("src", "img/weather_05.svg");
    //     break;

    //   case 9:
    //     $(".w_imgb").attr("src", "img/weather_08.svg");
    //     break;

    //   default:
    //     break;
    // }

    // 把資料塞進html
    $(".a .location").text(location);
    $(".a .time").text(startTime);
    $(".a .des").text(weather);
    $(".a .Temp").text(lowTemp + "℃ ~ " + highTemp + "℃");
    $(".a .rain").text("降雨機率:" + rain + "%");

    $(".b .location").text(location);
    $(".b .time").text(startTimeb);
    $(".b .des").text(weatherb);
    $(".b .Temp").text(lowTempb + "℃ ~ " + highTempb + "℃");
    $(".b .rain").text("降雨機率:" + rainb + "%");
  },
});

$('.scroll-box').on('click', function (e) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $(window).height()
  }, 1200);
});