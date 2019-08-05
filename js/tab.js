var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);

        this.tabadd = this.main.querySelector('.tabadd');
        //li的父元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        //section的父元素
        this.sectionFather = this.main.querySelector('.tabson');
        // 删除按钮
        this.init();
    }
    //
    init() {
        this.updateNode();//获取小li和section
        //init初始化操作相关元素绑定事件、
        this.tabadd.onclick = this.addTab

        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;//li点击切换/
            // 每个li里面都有一个删除按钮
            this.remove[i].onclick = this.removeTab;
            //给每个li中的span添加双击事件编辑
            this.spans[i].ondblclick = this.editTab;
            //给每个sections添加双击编辑事件
            this.sections[i].ondblclick = this.editTab;
        }
    }

    // 1.切换功能
    toggleTab() {
        that.clearClass();//先把所有类的样式清空
        console.log(this.index);
        this.className = 'liactive';
        that.sections[this.index].className = "contactive";
    }
    //清除所有的小li和section的类等类 获取动态元素需要重新获取元素
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = "";
            this.sections[i].className = "";
            // console.log(i);
        }

    }
    updateNode() {//获取li和section
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.el-icon-remove');
        this.spans = this.main.querySelectorAll('.firstnav ul span:first-child')
    }
    //2.添加功能
    addTab() {
        that.clearClass();
        // alert(11);
        // 出现的两个bug:
        //1，新增的类并没有把类清除掉，
        //2，新增的类没有点击切换功能
        //因为一开始的那些类是页面一打开就获取绑定了的，后来新添加的类没有绑定，
        //当新添加类之后我们需要重新获取所有的相同的类重新再进行绑定事件
        //创建li元素和section元素，把两个元素追加到相应的父元素
        var li = ` <li class="liactive"><span>新选项卡</span> <span class="el-icon-remove"></span></li>`
        that.ul.insertAdjacentHTML('beforeend', li);
        var section = `<section class="contactive">新测试项</section>`
        that.sectionFather.insertAdjacentHTML('beforeend', section);

        that.init();//再次初始化li
    }
    //3.删除功能
    removeTab(e) {//因为父亲li和儿子span都有点击事件会产生冒泡，需要取消冒泡
        e.stopPropagation()//阻止冒泡，防止除法li的切换点击事件
        //remove的索引没有定义，但是可以拿到父亲的索引
        var index = this.parentNode.index;
        console.log(index);
        //根据索引号删除li和section
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的li，原来的选中状态的li不变
        if (document.querySelector('.liactive')) return;
        //当我们删除了选中状态的这个lid的时候，让他的前一个li处于选中状态
        index--;
        //    if(index>=0){
        //     that.lis[index].click();//手动调用点击事件,不需要鼠标除法
        //    }


        //意思是如果前面执行为真，则后面调用，前面执行为假，则后面不调用
        //如果小li没有了就不再执行
        that.lis[index] && that.lis[index].click();//手动调用点击事件,不需要鼠标除法

    }
    //4.修改功能
    editTab() {
        //双击时禁止选中文字
        var str = this.innerHTML;//保存原先的文字

        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empyt();
        // alert("哈哈");
        this.innerHTML = `<input type="text"/>`
        //将原先的文字给input文本框
        var input = this.children[0];
        input.value = str;
        input.select();//文本框里面的文字处于选定状态

        //当我们离开文本框就把文本框里面的值给sapn
        input.onblur = function () {
            //    alert(this.parentNode);
            this.parentNode.innerHTML = this.value;
            //    this.remove();
        }
        //按下回车键也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {//为鼠标按下回车键
                //手动调用表单失去焦点事件
                this.blur();
            }
        }
    }
}
new Tab('#tab');