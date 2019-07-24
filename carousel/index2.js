class Carousel {
    constructor(root) {
        this.root = root;
        this.dotsCt = root.querySelector('.dots');
        this.dots = Array.from(root.querySelectorAll('.dots > span'));
        this.panels = Array.from(root.querySelectorAll('.panels > a'));
        this.pre = root.querySelector('.action .pre');
        this.next = root.querySelector('.action .next');

        this.bind();
    }

    bind() {
        // 圆点点击事件
        this.dotsCt.onclick = e => {
            if (e.target.tagName !== 'SPAN') return;

            let index = this.dots.indexOf(e.target);

            this.setActiveDot(index);
            this.setShowImg(index);
        }

        // 前一页点击事件
        this.pre.onclick = e => {
            let index = this.dots.indexOf(this.root.querySelector('.active'));
            index = (index - 1 + this.dots.length) % this.dots.length;

            this.setActiveDot(index);
            this.setShowImg(index);
        }

        // 后一页点击时间
        this.next.onclick = e => {
            let index = this.dots.indexOf(this.root.querySelector('.active'));
            index = (index + 1) % this.dots.length;

            this.setActiveDot(index);
            this.setShowImg(index);
        }

    }
    // 设置下方活动圆点
    setActiveDot(index) {
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');
    }

    // 设置当前显示的图片
    setShowImg(index) {
        this.panels.forEach(panel => panel.style.zIndex = 1);
        this.panels[index].style.zIndex = 10;
    }

}

document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel));