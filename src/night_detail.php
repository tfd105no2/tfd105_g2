<?php

  // 傳來的變數
  $a = $_GET["id"];
  // echo $a;

  //MySQL相關資訊
  $db_host = "127.0.0.1";
  $db_user = "root";
  $db_pass = "password";
  $db_select = "team2_db";

  //建立資料庫連線物件
  $dsn = "mysql:host=".$db_host.";dbname=".$db_select;

  //建立PDO物件，並放入指定的相關資料
  $pdo = new PDO($dsn, $db_user, $db_pass);

  //建立SQL
       // 檢驗帳號 是否存在資料庫內
       $sql = " SELECT * FROM area WHERE area_id = '$a'";

       //執行並查詢，會回傳查詢結果的物件(即statement)，必須使用fetch、fetchAll...等方式取得資料
       $statement = $pdo->query($sql);

       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();
      //  print_r( $data);
      //  echo "<br>";

        // 將二維陣列取出 顯示其值
        $b="";
        $c="";
        foreach($data as $index => $row){
          $area_name = $row["names"];
          $bed_count = $row["bed_count"];
      }
?>




<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>夜宿體驗</title>
<!-- 引入外部文件 -->
<!-- 通用的css -->
<link rel="stylesheet" href="css/style.css" />
<!-- fontawesome v5.15.4 -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
    integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css"
    integrity="sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
<!-- --------------------CSS與JS分隔線---------------------------------- -->
<!-- 引入Jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<!-- 引入 vue -->
<script src="js/vue.js"></script>
</head>

<body>
  <div class="night-detail-wrapper">
    <header>
  <div class="nav-wrapper container">
    <!-- logo -->
    <div class="logo">
      <a href="index.html">
        <img src="img/logo.svg" alt="" />
      </a>
    </div>
    <!-- menu -->
    <ul class="menu-wrapper">
      <li class="menu-item">
        <a class="@@active1" href="news.html">最新消息</a>
      </li>
      <li class="menu-item">
        <a class="@@active2" href="information.html">園區資訊</a>
      </li>
      <li class="menu-item">
        <a class="@@active3" href="traffic.html">交通方式</a>
      </li>
      <li class="menu-item">
        <a class="active" href="ticket.html">夜宿體驗</a>
      </li>
      <li class="menu-item">
        <a class="@@active5" href="fishgame.html">探索海洋</a>
      </li>
      <li class="user-item">
        <a class="@@active6" href="f_signin.html">
          <i class="fas fa-user"></i>
        </a>
      </li>
      <li class="user-item">
        <a class="@@active7" href="checkout_cart.html">
          <i class="fas fa-shopping-cart"></i>
        </a>
      </li>
    </ul>
    <!-- 漢堡選單 -->
    <button class="hamburger hamburger--squeeze" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    <!--漢堡 nav-->
    <div class="ham-bg"></div>
    <div class="ham-nav">
      <div class="container">
        <ul>
          <li><a href="news.html">最新消息</a></li>
          <li><a href="information.html">園區資訊</a></li>
          <li><a href="traffic.html">交通方式</a></li>
          <li><a href="ticket.html">夜宿體驗</a></li>
          <li><a href="fishgame.html">探索海洋</a></li>
          <li><a href="f_signin.html">會員中心</a></li>
          <li><a href="checkout_cart.html">購物車</a></li>
        </ul>
      </div>
    </div>
  </div>
</header>

    <main id="main">
      <div class="title">
        <h2>夜宿體驗</h2>
      </div>
      <!-- tab按鈕 -->
      <ul class="tab">
        <li class="tab-ticket">
          <a href="ticket.html">
            <i class="fa-solid fa-ticket"></i>
            <p>預約訂票</p>
          </a>
        </li>
        <li class="tab-bed active">
          <a href="night.html">
            <i class="fa-solid fa-bed"></i>
            <p>預訂夜宿</p>
          </a>
        </li>
      </ul>
      <section class="content-wrapper">
        <div class="container">
          <h2>預訂詳情</h2>
          <!-- 圖片詳情 -->
          <div class="content-top">
            <img src="img/intro-pic-01.png" />
            <div class="content-text">
              <h3 class="ssr"><?php echo $area_name; ?></h3>
              <p>預定日期: 2022/4/5 星期二</p>
              <div class="bed-left">剩餘<?php echo $bed_count; ?>名</div>
              <span>注意事項</span>
              <ul class="notice">
                <li>
                  未滿1歲之幼童與70歲以上之老年人與孕婦，基於安全考量，恕不接受預約。
                </li>
                <li>
                  滿1歲~未滿3歲夜宿免費，不佔床，不含個人餐點及課程物品(與大人共食)，但會提供報到名牌，故請點選人數。
                </li>
                <li>
                  本館提供沐浴乳、洗髮精、吹風機，為響應環保，請自備浴巾
                  、牙刷等個人用品
                </li>
              </ul>
            </div>
          </div>
          <!-- 分隔線 -->
          <hr />
          <!-- 票種選擇 -->
          <div class="content-bottom" id="content-bottom">
            <ul class="type-list">
              <li class="bed-type" v-for="item in bedType">
                <p>{{item.ticket_role_name}}</p>
                <div class="type-right">
                  <p class="price"> TWD{{item.price}}</p>
                  <button @click="addcart(item)" type="button" class="button" >加入購物車</button>
                  <div class="quantityInfo">
                    <span>
                      <button class="minus" @click="minus(item)">-</button>
                    </span>
                    <input type="number" class="quantity" v-model="item.quantity">
                    <span>
                      <button class="plus" @click="plus(item)">+</button>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 裝飾 -->
        <div class="deco">
          <img class="nig-fish" src="img/nig_fish.png" alt="" />
          <img class="nig-grass" src="img/nig_grass.png" alt="" />
          <img class="nig-deco" src="img/nig_deco.png" alt="" />
        </div>
      </section>

      <!-- modal 加入購物車 -->
      <div class="modal modal-add" v-if="modal">
        <div class="modal-content">
          <div class="add">
            <i class="fas fa-check"></i>
          </div>
          <h4>已加入購物車</h4>
          <button type="button" class="button button-close" @click="modal = !modal">確定</button>
        </div>
      </div>
    </main>

  </div>
  <footer>
    <div class="footer_wrapper">
        <!-- wave -->
        <div class="ocean">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>

        <div class="follow_icon">
            <a href="#" target="_blank">
                <i class="fab fa-facebook-square"></i>
            </a>
            <a href="#" target="_blank">
                <i class="fab fa-youtube"></i>
            </a>
            <a href="#" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
        </div>
        <div class="content">
            <h5>電話：(02)-2712-0589</h5>
            <h5>地址：台北市中山區南京東路三段219號</h5>
            <p>本網站為緯育TibaMe前端設計工程師班第70期學員專題作品，本平台僅供學習、展示之用</p>
        </div>
    </div>
</footer>
<script src="js/nav.js"></script>


  <!-- 引入Vue -->
  <script src="js/vue.js"></script>

  <!-- 引入JS -->
  <script src="js/night_detail.js"></script>
</body>

</html>