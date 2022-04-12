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
//   el: '#traffic_nav',
//   data() {
//     return {
      
//     }
//   },

// })


new Vue({
  el: '#music1',
  data() {
    return {
    }
  },
  methods: {
    open() {
      let music = document.getElementById('music');
      let conch = document.querySelectorAll('.conch');
      let bb=document.querySelectorAll('.bb');
      console.log(conch);

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

