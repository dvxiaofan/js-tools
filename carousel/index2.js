class Carousel {
    constructor(root, animation) {
        this.root = root;
        this.animation = animation || ((toNode, fromNode, callback) => callback());
        this.dotsCt = root.querySelector('.dots');
        this.dots = Array.from(root.querySelectorAll('.dots > span'));
        this.panels = Array.from(root.querySelectorAll('.panels > a'));
        this.pre = root.querySelector('.action .pre');
        this.next = root.querySelector('.action .next');

        this.bind();
    }

    get index() {
        return this.dots.indexOf(this.root.querySelector('.dots .active'));
    }

    get preIndex() {
        return (this.index - 1 + this.dots.length) % this.dots.length;
    }

    get nextIndex() {
        return (this.index + 1) % this.dots.length;
    }

    bind() {
        // 圆点点击事件
        this.dotsCt.onclick = e => {
            if (e.target.tagName !== 'SPAN') return;

            let fromIndex = this.index;
            let index = this.dots.indexOf(e.target);

            this.setActiveDot(index);
            this.setShowImg(index, fromIndex);
        }

        // 前一页点击事件
        this.pre.onclick = e => {
            let index = this.preIndex;
            this.setActiveDot(index);
            this.setShowImg(index, this.nextIndex);
        }

        // 后一页点击时间
        this.next.onclick = e => {
            let index = this.nextIndex;
            this.setActiveDot(index);
            this.setShowImg(index, this.preIndex);
        }

    }
    // 设置下方活动圆点
    setActiveDot(index) {
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');
    }

    // 设置当前显示的图片
    setShowImg(toIndex, fromIndex) {
        // 执行动画, 执行完成后最终效果
        // 如果没有传递动画, 则直接执行结果
        this.animation(this.panels[toIndex], this.panels[fromIndex], () => {
            this.panels.forEach(panel => panel.style.zIndex = 1);
            this.panels[toIndex].style.zIndex = 10;
        })
    }

    setAnimation(animation) {
        this.animation = animation;
    }
}

// // 处理动画方式
// function fade(fromNode, toNode, callback) {
//     console.log(fromNode, toNode);

//     callback();
// }

const Animation = (function() {
    const css = (node, styles) => Object.entries(styles)
        .forEach(([key, value]) => node.style[key] = value);
    const reset = node => node.style = '';

    return {
        // 参数使用了默认值
        fade(during = 400) {
            return function(to, from, onFinish) {
                console.log(during);
                css(from, {
                    opacity: 1,
                    zIndex: 10
                })
                css(to, {
                    opacity: 0,
                    zIndex: 9
                })

                setTimeout(() => {
                    css(from, {
                        opacity: 0,
                        transition: `all ${during/1000}s`
                    })
                    css(to, {
                        opacity: 1,
                        transition: `all ${during/1000}s`
                    })
                }, 100);

                setTimeout(() => {
                    reset(from);
                    reset(to);
                    onFinish && onFinish();
                }, during);
            }
        },

        // 参数使用了默认值
        zoom(scale = 5, during = 1000) {
            return function(to, from, onFinish) {
                css(from, {
                    opacity: 1,
                    transform: `scale(1)`,
                    transition: `all ${during/1000}s`,
                    zIndex: 10
                })

                css(to, {
                    zIndex: 9
                })

                setTimeout(() => {
                    css(from, {
                        opacity: 0,
                        transform: `scale(${scale})`
                    })
                }, 100);

                setTimeout(() => {
                    reset(from);
                    reset(to);
                    onFinish && onFinish();
                }, during);
            }
        }
    }
})()

const carousel = new Carousel(document.querySelector('.carousel'), Animation.zoom());
