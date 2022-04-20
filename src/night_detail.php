<?php

  // 傳來的變數
  $id = $_GET["id"];
  $year = $_GET["year"];
  $month = $_GET["month"];
  $date = $_GET["date"];

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
       $sql = " SELECT * FROM area WHERE area_id = '$id'";

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
          $img = $row["img"];
      }
?>



<!DOCTYPE html>
<html lang="en">

<head>
  @@include('layout/head.html', { "title": "夜宿區域詳細頁" })
</head>

<body>
  <div class="night-detail-wrapper">
  @@include('layout/nav.html',{ 'active4': 'active' })
    <main id="main" v-cloak>
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
            <img class="title_img" src="<?php echo $img; ?>" />
            <div class="content-text">
              <h3 class="ssr"><?php echo $area_name; ?></h3>
              <p>預訂日期: <span class="overnight_date"><?php echo $year; ?>/<?php echo $month +1; ?>/<?php echo $date; ?></span> 星期二</p>
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

  @@include('layout/footer.html')

  <!-- 引入JS -->
  <script src="js/night_detail.js"></script>
</body>

</html>