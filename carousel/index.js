

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// 圆点点击事件
$('.carousel .dots').onclick = e => {
    if (e.target.tagName !== 'SPAN') return;

    let index = Array.from($$('.carousel .dots span')).indexOf(e.target);

    setActiveDot(index);
    setShowImg(index);
}

// 前一页点击事件
$('.pre').onclick = e => {
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'));
    index = (index - 1 + $$('.carousel .dots span').length) % $$('.carousel .dots span').length;

    setActiveDot(index);
    setShowImg(index);
}

// 后一页点击时间
$('.next').onclick = e => {
    let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'));
    index = (index + 1) % $$('.carousel .dots span').length;

    setActiveDot(index);
    setShowImg(index);
}

// 设置下方活动圆点
function setActiveDot(index) {
    $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'));
    $$('.carousel .dots span')[index].classList.add('active');
}

// 设置当前显示的图片
function setShowImg(index) {
    $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1);
    $$('.carousel .panels a')[index].style.zIndex = 10;
}



