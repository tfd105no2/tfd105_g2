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


new Vue({
  el: '#app',
  data() {
    return {
    }
  },
  methods: {
    open() {
      let music = document.getElementById('music');
      let fishh = document.querySelectorAll('.fishh');
      console.log(fishh);

      if (music.paused) {
        music.play();

        fishh.forEach(element => {
          element.classList.remove('hide');
        });

      } else {
        music.pause();

        fishh.forEach(element => {
          element.classList.add('hide');
        });
      }
    }
  },
});