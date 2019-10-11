//1、类（属性和方法）：轮播图
class Banner{
    //构造函数
    constructor(boxDom,obj){
        this.boxDom = boxDom;
        this.boxImg = null;//所有图片标签的容器
        this.ul = null;//所有li标签的容器
        let defaultObj = {
            imgs:["img/1.jpg","img/2.jpg"],
            width:400,
            height:300,
            timeSpace:1000,
            index:0,
            douSize : 10,
            douIsCircle:true,
            douColor:"pink",
            douHighColor:"red"
        };
        for(let key  in defaultObj){//key = imgs;
            if(obj[key]!=undefined){ //obj["imgs"]
                this[key] = obj[key];
            }else{
                this[key] = defaultObj[key]; 
            }
        }

        this.myTimer = null;
        this.render();
        this.autoPlay();
        this.addEvent();
    }

    //方法：
    //渲染（创建所有的dom元素）
    render(){
        //1、创建图片及其容器
        //1)、容器
        this.boxImg = document.createElement("div");
        this.boxImg.style.cssText = ` 
            position: absolute;
            width: 100%;
            height: 100%;`;
        this.boxDom.appendChild(this.boxImg);
        //2)、图片
        let num = this.imgs.length;
        for(let i=0;i<num;i++){
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
            `;
            if(i==0){
                imgDom.style.opacity = 1;
            }
            this.boxImg.appendChild(imgDom);
        }
        //2、创建豆豆及其容器
        //1)、容器
        this.ul = document.createElement("ul");
        this.ul.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 50px;
            list-style: none;
            z-index: 1;
        `;
        this.boxDom.appendChild(this.ul);
        //2)、li
        for(let i=0;i<num;i++){
            let li = document.createElement("li");
            li.style.cssText = `
                float: left;
                margin-left:10px;
                width:${this.douSize}px;
                height: ${this.douSize}px;
                background-color: ${this.douColor};
            `;
            if(this.douIsCircle){
                li.style.borderRadius = "50%";
            }
            if(i==0){
                li.style.backgroundColor = this.douHighColor;
            }
            this.ul.appendChild(li);
        }
    }

    //自动播放
    //1、自动播放（每隔一定时间换一张图片）
    autoPlay(){
        this.myTimer = setInterval(() => {
            //一、处理数据
            //1、
            let outIndex = this.index;
            this.index++;//1
            //2、
            if(this.index>this.imgs.length-1){
                this.index=0;
            }
            //二、改变外观
            let imgDoms = this.boxImg.children;
            fadeInOut(imgDoms[this.index],imgDoms[outIndex],this.timeSpace/3);
            let liDoms = this.ul.children;
            liDoms[this.index].style.backgroundColor = this.douHighColor;
            liDoms[outIndex].style.backgroundColor = this.douColor;
        }, this.timeSpace);
    }

    //2、停止播放
    stop(){
        window.clearInterval(this.myTimer);
    }

    //4、跳转到指定图片
    goImg(transOrd){
        //一、处理数据    
        let outIndex = this.index;
        this.index = transOrd;

        if(this.index>this.imgs.length-1){
            this.index=0;
        }

        //二、改变外观
        let imgDoms = this.boxImg.children;
        fadeInOut(imgDoms[this.index],imgDoms[outIndex],this.timeSpace/3);
        let liDoms = this.ul.children;
        liDoms[this.index].style.backgroundColor = this.douHighColor;
        liDoms[outIndex].style.backgroundColor = this.douColor;
    }

    addEvent(){
        //2、鼠标移入，停止播放
        this.boxDom.onmouseover = ()=>{
            this.stop();
        }
    
        //3、鼠标离开继续播放 
        this.boxDom.onmouseout = ()=>{
            this.autoPlay();
        }
        
        //4、点击豆豆跳转到对应的图片上。
        let liDoms = this.ul.children;
        for(let i=0;i<liDoms.length;i++){
            liDoms[i].onclick = ()=>{
                this.goImg(i);
            }
        }
    }
}

$(function () {

    $('.mainbanner').each(function () {
        var $_root = $(this);
        var $window_b = $_root.find('.mainbanner_window');
        var $list = $_root.find('.mainbanner_list');
        var $items = $list.children();
        var $window_ul = $window_b.find('#slideContainer');
        var count = $items.length;
        var item_size = 1920;
        var dur_ms = 960;
        var autoplay_interval = 2000;
        var cur_idx = 0;
        var fix_idx = function (_idx) {
            if (_idx < 0)
                return (count - 1);
            if (_idx >= count)
                return 0;
            return _idx;
        }

        var goto = function (_idx) {
            var idx = fix_idx(_idx);
            $items.eq(idx).addClass('active').siblings().removeClass('active');
            if (cur_idx != idx) {
                var offset_x = -idx * item_size;
                $window_ul.stop().animate({
                    'left': offset_x
                }, dur_ms);
                cur_idx = idx;
            }
        }

        $items.each(function (index, element) {
            var $cur_item = $(this);
            var $cur_a = $cur_item.find('a');
            $cur_a.data('index', index);
            $cur_a.click(function () {
                var index = $(this).data('index');
                goto(index);
                return false;
            });
        });

        var autoplay_flag = true;

        window.setInterval(function () {
            if (autoplay_flag) {
                goto(cur_idx + 1);
            }
        }, autoplay_interval);

        $_root.hover(function () {
            autoplay_flag = false;
        }, function () {
            autoplay_flag = true;
        });

        goto(0);
    });

})