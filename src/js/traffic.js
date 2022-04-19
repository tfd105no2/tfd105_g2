let scroll_to = document.querySelectorAll(".scroll_to");
// console.log(scroll_to[0].offsetTop);
scroll_to.forEach((item) => {
  item.addEventListener("click", () => {
    let target_top = document.getElementById(item.getAttribute("data-id"));
    let offsetTop = target_top.getBoundingClientRect().top + window.scrollY - target_top.clientHeight - 10
    window.scroll({
      top: offsetTop,
      behavior: "smooth"
    });

  })
})

// new Vue({
//   el:'#app',
//   data() {
//     return {
      
//     }
//   },
//   methods:{
//     jump (index) {
//       let jump = document.querySelectorAll('.scroll_to')
//       // 獲取需要滾動的距離
//       let total = jump[index].offsetTop
//       // Chrome
//       document.body.scrollTop = total
//       // Firefox
//       document.documentElement.scrollTop = total
//       // Safari
//       window.pageYOffset = total
//       },
//   }    
// });


new Vue({
  el: '#traffic_time',
  data:{
    title:'營業時間',
    img:'img/fish.jpg',
    weekday:'週一~週五 10:00~20:30',
    holiday:'假日(國定假日) 09:00~22:00',
    narrative:'* 最終入場時間為閉館前1小時。',
    narrative2:'*本館全年無休，若遇任何天候或其它因素而休館將另行公告，敬請留意本館最新消息。',
  }
});


new Vue({
  el: '#music1',
  data() {
    return {
      img:('img/18-017.png'),
    }
  },
  methods: {
    open() {
      let music = document.getElementById('music');
      let conch = document.querySelectorAll('.conch');
      let bb = document.querySelectorAll('.bb');

      if (music.paused) {
        music.play();

        conch.forEach(element => {
          element.classList.remove('close');
        });

        bb.forEach(element => {
                            
          element.classList.remove('hide');
        });

      } else {
        music.pause();

        conch.forEach(element => {
          element.classList.add('close');
        });

        bb.forEach(element => {
          element.classList.add('hide');
        });

      }
    }
  },
});

