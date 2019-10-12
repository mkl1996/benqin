
class Mirror{

    constructor(boxDom,obj){
        this.boxDom = boxDom;
        this.mirrorDom = null;
        this.showDom = null;
        let defaultObj = {
            width:120,
            height:90,
            color:"pink",
            opacity:0.5,
            beiShu:3,
            isCircle:false,
            img:"img/2.jpg"
        }
        for(let key in defaultObj){
            this[key] = obj[key]==undefined?defaultObj[key]:obj[key];
        }
    }
    //创建所有的dom
    render(){
        this.boxDom.style.position = "relative";
        //1、创建放大镜
        this.mirrorDom = document.createElement("div");
        this.mirrorDom.style.cssText=`
            position: absolute;
			width: ${this.width}px;
			height: ${this.height}px;
			background-color: ${this.color};
            opacity: ${this.opacity};
            display:none;
        `;
        if(this.isCircle){
            this.mirrorDom.style.borderRadius = "50%";
        }
        this.boxDom.appendChild(this.mirrorDom);

        //2、放大效果
        this.showDom = document.createElement("div");
        this.showDom.style.cssText = `
            position: absolute;
            left:${this.boxDom.offsetWidth+50}px;
            width: ${this.width*this.beiShu}px;
            height: ${this.height*this.beiShu}px;
            background-image: url(${this.img});
            background-size: ${this.boxDom.offsetWidth*this.beiShu}px ${this.boxDom.offsetHeight*this.beiShu}px;
            display:none;
        `;
        this.boxDom.appendChild(this.showDom);
    }

    addEvent(){
        this.boxDom.onmouseenter = ()=>{
            this.mirrorDom.style.display = "block";
            this.showDom.style.display = "block";
        }
        this.boxDom.onmouseleave = ()=>{
            this.mirrorDom.style.display = "none";
            this.showDom.style.display = "none";
        }
        this.boxDom.onmousemove = (event)=>{
            let evt = event || window.event;
            //一、处理数据
            //1、
            let left1 = evt.pageX-this.boxDom.offsetLeft-(this.mirrorDom.offsetWidth)/2;
            let top1 =  evt.pageY-this.boxDom.offsetTop-(this.mirrorDom.offsetHeight)/2;
            //2、
            if(left1<0){
                left1=0;
            }else if(left1>this.boxDom.offsetWidth-this.width){
                left1=this.boxDom.offsetWidth-this.width;
            }
            
            if(top1<0){
                top1=0;
            }else if(top1>this.boxDom.offsetHeight-this.height){
                top1=this.boxDom.offsetHeight-this.height;
            }
        
            //二、改变外观
            this.mirrorDom.style.left = left1+"px";
            this.mirrorDom.style.top = top1+"px";
            this.showDom.style.backgroundPosition = `-${left1*this.beiShu}px -${top1*this.beiShu}px`;        
        }
    }
}