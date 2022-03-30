//  let scroll_to=document.querySelectorAll(".scroll_to");
//     // console.log(scroll_to);
//     scroll_to.forEach((item)=>{
//       item.addEventListener("click", () =>{
//         let alllink=document.getElementById(item.getAttribute("data-id"));

//         let linkHeight=alllink.offsetHeight;
//         console.log(linkHeight);
        
//         alllink.scrollIntoView({behavior:"smooth", block:"start"})

        
//       })


//     })

    

    let scroll_to=document.querySelectorAll(".scroll_to");
    console.log(scroll_to[0].offsetTop);
    scroll_to.forEach((item)=>{
      item.addEventListener("click", () =>{
        let target_top=document.getElementById(item.getAttribute("data-id"));
        const offsetTop = target_top.getBoundingClientRect().top + window.scrollY - target_top.clientHeight - 10
        window.scroll({
          top: offsetTop,
          behavior: "smooth"
      });

      })
    })

    // let train_dom = document.getElementsByClassName('fa-train')
    // train_dom[0].addEventListener('click', ()=>{
    //   let target_top = document.getElementById("link1");
    //   const offsetTop = target_top.getBoundingClientRect().top + window.scrollY - target_top.clientHeight - 10
    //   window.scrollTo({
    //       top: offsetTop,
    //       behavior: "smooth"
    //   });


      
    // });

    // let train_dom2 = document.getElementsByClassName('fa-car')
    // train_dom2[0].addEventListener('click', ()=>{
    //   let target_top2 = document.getElementById("link2");
    //   const offsetTop = target_top2.getBoundingClientRect().top + window.scrollY - target_top2.clientHeight - 10
    //   window.scrollTo({
    //       top: offsetTop,
    //       behavior: "smooth"
    //   });
    // });

    // let train_dom3 = document.getElementsByClassName('fa-bus')
    // train_dom3[0].addEventListener('click', ()=>{
    //   let target_top3 = document.getElementById("link3");
    //   const offsetTop = target_top3.getBoundingClientRect().top + window.scrollY - target_top3.clientHeight - 10
    //   window.scrollTo({
    //       top: offsetTop,
    //       behavior: "smooth"
    //   });
    // });


    new Vue({
      el: '#app',
      data() {
        return{

        }
      },
      methods: {
        open(){
          let music=document.getElementById('music');
          let fishh=document.getElementsByClassName('fishh');

          if(music.paused){
            music.play();
          }else{
             music.pause();
            }
        }
      },
    });