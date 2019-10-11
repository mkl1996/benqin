//定义一个类（菜单类）

class Menu{
    constructor(title,clsname,url,subBoxCls){
        this.title = title;//菜单的文本
        this.clsname = clsname;//菜单的class。
        this.url = url;//菜单对应的页面
        this.subBoxCls = subBoxCls;//孩子容器的样式
        this.children = [];//子菜单。
    }

    //方法(添加孩子)
    appendChild(menuObj){
        this.children.push(menuObj);
    }

    //创建html标签
    render(ulDom){
        //1、创建li
        let  liDom  = document.createElement("li");
        liDom.className = this.clsname;
        ulDom.appendChild(liDom);
        //2、创建a
        let aDom = document.createElement("a");
        aDom.innerHTML = this.title;
        aDom.href= this.url;
        liDom.appendChild(aDom);

        //3、如果有孩子，创建ul
        if(this.children.length>0){
            let boxDom = document.createElement("ul");
            boxDom.className = this.subBoxCls;
            liDom.appendChild(boxDom);
            //循环每个孩子，让孩子创建自己
            for(let i=0;i<this.children.length;i++){
                this.children[i].render(boxDom);
            }
        }
    }
}

//菜单管理类（你可以认为是根菜单）
class MenuManager{
    constructor(boxDom){ //
        this.boxDom = boxDom;
        this.children=[];
    }

    appendChild(menuObj){
        this.children.push(menuObj);
    }

    render(){
        for(let i in this.children){
            this.children[i].render(this.boxDom);
        }
    }
}


var $j = jQuery.noConflict();
var brandArea = function () {
    $j(".brand_class li").each(function (i) {
        $j(this).mouseenter(function () {
            $j(this).find("div").stop().animate({
                "top": -50
            }, 300);
        })
        $j(this).mouseleave(function () {
            $j(this).find("div").stop().animate({
                "top": 0
            }, 300);
        })
    });
}

$j(function () {
    //搜索
    $j("#btnsch").click(function () {
        window.location = SiteUrl + '/product/search_jump.htm?key=' + encodeURIComponent($j("#sch").val());
    });

    //读取购物车数量
    var dd = new Date();
    $j("#head_cart_no").load("/ajax/head/shoppingcart.htm?act=getcount&d=" + escape(dd));

    //head 弹出菜单部分
    var cateMenu = function () {
        var cateLiNum = $j(".cateMenu li").length;
        $j(".cateMenu li").each(function (index, element) {
            if (index < cateLiNum - 1) {
                $j(this).mouseenter(function () {
                    var ty = $j(this).offset().top - 158;
                    var obj = $j(this).find(".list-item");
                    var sh = document.documentElement.scrollTop || document.body.scrollTop;
                    var oy = ty + (obj.height() + 30) + 158 - sh;
                    var dest = oy - $j(window).height()
                    if (oy > $j(window).height()) {
                        ty = ty - dest - 10;
                    }
                    if (ty < 0) ty = 0;
                    $j(this).addClass("on");
                    obj.show();
                    $j(".cateMenu li").find(".list-item").stop().animate({
                        "top": ty
                    });
                    obj.stop().animate({
                        "top": ty
                    });
                })
                $j(this).mouseleave(function () {
                    $j(this).removeClass("on");
                    $j(this).find(".list-item").hide();
                })
            }
        });

        $j(".navCon_on").hover(function () {
                $j(".cateMenu").show();
            },
            function () {
                $j(".cateMenu").hide();
            })

    }();

    var miniMenu = function () {
        /*购物列表*/
        $j(".miniMenu").find(".m1").hover(
            function () {
                $j(this).addClass("on");
                $j(this).find(".mini-cart").show();
                var dd = new Date();
                $j("#head_cart").load("/ajax/head/shoppingcart.htm?act=getitems&d=" + escape(dd));
            },
            function () {
                $j(this).removeClass("on");
                $j(this).find(".mini-cart").hide();
            }
        )
        /*用户中心*/
        $j(".miniMenu").find(".m3").hover(
            function () {
                $j(this).addClass("cur");
                $j(this).find(".miniMenu-child").show();
            },
            function () {
                $j(this).removeClass("cur");
                $j(this).find(".miniMenu-child").hide();
            }
        )
    }();

    /*topBar置顶*/
    var positionMenu = function (id) {
        var mc = document.getElementById(id);
        var minNumber = mc.offsetTop;
        var isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1;

        $j(window).scroll(function () {
            var sh = document.documentElement.scrollTop || document.body.scrollTop;
            var th = document.documentElement.clientHeight;
            if (sh > minNumber) {
                mc.style.position = !isIE6 ? "fixed" : "absolute";
                mc.style.top = !isIE6 ? "0px" : sh + "px";
            } else {
                mc.style.position = "static";
                mc.style.top = minNumber + "px"
            }
        })
    }("topBar")
})

/*搜索提示*/
var searchTips = {
    keyBoo: false,
    currentIndex: -1,
    currentArr: [],
    box: null,
    input: null,
    init: function (obj) {
        var that = this;
        this.input = document.getElementById(obj.inputID);
        this.createContent(obj.listID);
        this.onChange = obj.onChange || null;
        this.onSubmit = obj.onSubmit || null;

        this.addKeyBoardEvent();
        this.change();
        this.addEvent(that.input, "blur", function () {
            that.focusout();
        });

    },
    change: function () {
        var that = this;
        if (that.input.addEventListener) {
            that.input.addEventListener("input", function () {
                that.onChange();
                that.keyBoo = true;
            }, false);
        } else if (that.input.attachEvent) {
            that.input.attachEvent("onpropertychange", function () {
                that.onChange();
                that.keyBoo = true;
            });
        }
    },
    find: function (data) {
        this.box.parentNode.style.display = "block";
        //this.box.style.display = "block";
        var ul = this.box.getElementsByTagName("ul")[0];
        ul.innerHTML = "";
        this.currentArr = [];
        this.currentIndex = -1;
        for (var i = 0; i < data.length; i++) {
            var li = this.getLi();
            li.innerHTML = data[i].keyword;
            ul.appendChild(li);
            this.currentArr.push(li);
        }
    },
    createContent: function (sBox) {
        this.box = document.createElement("div");
        this.box.className = "searchTips";
        document.getElementById(sBox).appendChild(this.box);
        var ul = document.createElement("ul");
        this.box.appendChild(ul);
        //this.box.style.display = "none";
    },
    selectCurrent: function () {
        var len = this.currentArr.length;
        if (this.currentIndex < 0) this.currentIndex = len - 1;
        if (this.currentIndex > len) this.currentIndex = 0;
        for (var i = 0; i < len; i++) {
            this.currentArr[i].className = this.currentIndex == i ? "on" : "";
        }
    },
    addKeyBoardEvent: function () {
        var that = this;
        this.addEvent(document, "keydown", function (e) {
            if (that.keyBoo) {
                var e = e || window.event;
                switch (e.keyCode) {
                    case 40:
                        that.currentIndex++;
                        that.selectCurrent();
                        break;
                    case 38:
                        that.currentIndex--;
                        that.selectCurrent();
                        break;
                    case 13:
                        if (that.currentIndex != -1) {
                            that.input.value = that.currentArr[that.currentIndex].innerHTML;
                        }
                        that.onSubmit();
                        that.focusout();
                        break
                    default:
                        break;
                }

            }
        })
    },
    focusout: function () {
        var that = this;
        setTimeout(function () {
            //that.box.style.display = "none";
            that.box.parentNode.style.display = "none";
            that.keyBoo = false;
        }, 100)
    },
    getLi: function () {
        var that = this;
        var li = document.createElement("li");
        this.addEvent(li, "mouseover", function () {
            li.className = "on";
        });
        this.addEvent(li, "mouseout", function () {
            li.className = "";
        });
        this.addEvent(li, "click", function () {
            that.input.value = li.innerHTML;
            that.onSubmit();
        });
        return li;
    },
    addEvent: function (obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        }
    }

}