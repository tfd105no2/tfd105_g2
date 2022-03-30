 // let scroll_to=document.querySelectorAll(".scroll_to");
    // // console.log(scroll_to);
    // scroll_to.forEach((item)=>{
    //   item.addEventListener("click", () =>{
    //     let alllink=document.getElementById(item.getAttribute("data-id"));

    //     let linkHeight=alllink.offsetHeight;
    //     console.log(linkHeight);
        
    //     alllink.scrollIntoView({behavior:"smooth", block:"start"})

        
    //   })


    // })

    let scroll_to=document.querySelectorAll(".scroll_to");
    // console.log(scroll_to);
    scroll_to.forEach((item)=>{
      item.addEventListener("click", () =>{
        let alllink=document.getElementById(item.getAttribute("data-id"));

        let linkHeight=alllink.offsetHeight;
        console.log(linkHeight);

      })
    })


    // let train_dom = document.getElementsByClassName('fa-train')
    // // console.log(train_dom[0])
    // train_dom[0].addEventListener('click', ()=>{
    //   let target_top = document.getElementById("link1")
    //   console.log(target_top);
    //   let linkHeight=document.body.offsetHeight;
    //   console.log(train_dom[0].offsetTop);
    //   let link = train_dom[0].offsetTop 


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