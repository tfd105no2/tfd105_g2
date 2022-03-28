window.onload = function () {
    const speed = 5,
        fish = document.querySelector('.fish'),
        counter = document.querySelector('.fishgame_count'),
        fishgameWrapper = document.querySelector('.fishgame_wrapper'),
        fishgame_lose_pop = document.querySelector('.fishgame_lose_pop'),
        fishgame_win_pop = document.querySelector('.fishgame_win_pop'),
        fishgame_hide = document.querySelector('.fishgame_hide');


    let count = 0,
        vw = window.innerWidth * .97,
        vh = window.innerHeight * .97;

    function getAngle(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range [-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range [-180, 180]
        theta += 90; // set 0 as top, range [-90, 270]
        if (theta > 180) theta = theta - 360; // range [-180, 180]
        theta = Math.floor(theta);
        return theta;
    }

    function setPos(el, x, y) {
        // old coords
        // 魚移動的座標
        const a = window.scrollX + el.getBoundingClientRect().left;
        const b = window.scrollY + el.getBoundingClientRect().top;

        // distance
        const ax = Math.abs(a - x);
        const by = Math.abs(b - y);
        const dur = Math.floor(Math.sqrt((ax * ax) + (by * by))) * speed;
        // set new coords
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        // set duration
        el.style.transitionDuration = dur + 'ms';
        // set angle
        el.style.transform = 'rotate(' + getAngle(a, b, x, y) + 'deg)';
        setTimeout(function () {
            setRandomPos(el);
        }, dur);
    }

    function setRandomPos(el) {
        const randomX = Math.floor(Math.random() * vw);
        const randomY = Math.floor(Math.random() * vh);
        setPos(el, randomX, randomY);
    }

    function updateCount() {
        counter.textContent = count;
    }

    function createFish() {
        const fish = document.createElement('a');
        fish.setAttribute('href', '#');
        fish.className = 'fish';
        fish.textContent = '=';
        fish.style.filter = 'hue-rotate(' + Math.floor(Math.random() * 360) + 'deg)';
        fishgameWrapper.appendChild(fish);
        setRandomPos(fish);
        fish.addEventListener('click', createFish);
        count++;
        updateCount();

    }

    window.onresize = function () {
        vw = window.innerWidth * .97;
        vh = window.innerHeight * .97;
    }


    // 倒數計時
    function countdown() {
        let fishgame_countdown = document.getElementById("count-down-timer");
        let count = 10;
        fishgame_countdown.innerHTML = count;
        let timer = null;
        timer = setInterval(function () {
            if (count > 0) {
                count = count - 1;
                fishgame_countdown.innerHTML = count;
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    $(".fishgame_start_btn").on('click', function () {
        $(this).parent('.fishgame_start').hide();
        createFish();
        countdown();
        setTimeout(function () {

            if (count >= 5) {
                $('.fish').remove();
                fishgame_win_pop.style.display = 'flex';
                fishgame_hide.style.display = 'block';
            } else {
                $('.fish').remove();
                fishgame_lose_pop.style.display = 'flex';
                fishgame_hide.style.display = 'block';

            }
        }, 10100);
    });
    // 再試一次
    $('.fishgame_tryAgain_btn').on('click', function () {
        fishgame_end_pop.style.display = 'none';
        fishgame_hide.style.display = 'none';
        count = 0;
        createFish();
        countdown();
        setTimeout(function () {

            if (count >= 5) {
                alert('成功');
            } else {
                $('.fish').remove();
                fishgame_lose_pop.style.display = 'flex';
                fishgame_hide.style.display = 'block';

            }
        }, 10100);

    });

    // 儲存優惠碼
    $('.fishgame_savecoupon_btn').on('click', function () {
        $('.fishgame_savecoupon').css('display', 'flex');
    });

    // 儲存優惠碼--確定
    $('.fishgame_savecoupon_sure_btn').on('click', function () {
        location.href = 'f_member.html';
    });
    // 儲存優惠碼--取消
    $('.fishgame_savecoupon_cancel_btn').on('click', function () {
        $(this).parent().css('display', 'none');
    });

    // 返回首頁
    $('.fishgame_back_btn').on('click', function () {
        location.href = "../index.html";
    });
}