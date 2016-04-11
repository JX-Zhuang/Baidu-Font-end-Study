//渲染dom
function render(data, tagParent, tagSelf) {
    var i = '';
    data.forEach(function(item, index, array) {
        i += '<' + tagSelf + '>' + item + '</' + tagSelf + '>';
    });
    tagParent.innerHTML = i;
}
//正则匹配
function valReg(val) {
    var newVal = val.split(/[^a-zA-Z0-9.\u4E00-\u9FA5]/);
    return newVal;
}
//数组去重
function removeRepeat(arr) {
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        for (var j = i + 1; j < length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                length = arr.length;
                j--;
            }
        }
    }
    return arr;
}
//初始化
function init() {
    var tagInputId = 'tag-input';
    var renderParent = document.getElementById('show-tag');
    var hobbyInput = document.getElementById('hobby-input');
    var showHobby = document.getElementById('show-hobby');
    var hobbyButton = document.getElementById('hobby-button');
    var tagFun = new Tag(tagInputId, renderParent);
    tagFun.init();
    var hobbyFun = new Hobby(hobbyInput, showHobby, hobbyButton);
    hobbyFun.init();
}
//tag
function Tag(inputId, renderParent) {
    this.tag = [];
    this.inputId = inputId;
    this.tagInput = document.getElementById(inputId);
    this.value = this.tagInput.value;
    this.renderParent = renderParent;
}
//初始化
Tag.prototype.init = function() {
    this.funKeyup();
    this.funMouseover();
    this.funMouseout();
    this.funClick();
};
//增加
Tag.prototype.funKeyup = function() {
    var me = this;
    me.tagInput.onkeyup = function() {
        this.value = this.value.trim();
        var value = this.value;
        var length = value.length;
        var array = me.tag;
        var condition = event.keyCode == '13' || event.keyCode == '32' || event.keyCode == '188';
        if (value.slice(0, 1) == ',') {
            value = value.slice(1);
            this.value = value;
        }
        if (condition) {
            if (value == '') return false;
            if (value.slice(length - 1) == ',' || value.slice(length - 1) == '，') {
                value = value.slice(0, length - 1);
            }
            for (var i = 0; i < array.length; i++) {
                if (array[i] == value) {
                    this.value = '';
                    return false;
                }
            }
            array.push(value);
            this.value = '';
            console.log(array);
            render(array, me.renderParent, 'span');
            return true;
        }
    }
};
Tag.prototype.funMouseover = function() {
    var me = this;
    me.renderParent.addEventListener('mouseover', function(event) {
        if (event.target.nodeName.toLowerCase() == 'span') {
            var me = event.target;
            var text = me.innerText;
            me.innerText = '点击删除' + text;
        }
    });
};
Tag.prototype.funMouseout = function() {
    var me = this;
    me.renderParent.addEventListener('mouseout', function(event) {
        if (event.target.nodeName.toLowerCase() == 'span') {
            var me = event.target;
            var text = me.innerText;
            me.innerText = text.slice(4);
        }
    });
};
Tag.prototype.funClick = function() {
    var me = this;
    me.renderParent.addEventListener('click', function(event) {
        if (event.target.nodeName.toLowerCase() == 'span') {
            var text = this.innerText.slice(4);
            var index = me.tag.indexOf(text);
            me.tag.splice(index, 1);
            render(me.tag, me.renderParent, 'span');
        }
    });
};
//爱好
function Hobby(hobbyInput, showHobby, button) {
    this.hobby = [];
    this.hobbyInput = hobbyInput;
    this.showHobby = showHobby;
    this.button = button;
}
Hobby.prototype.init = function() {
    this.funClick();
};
Hobby.prototype.funClick = function() {
    var me = this;
    me.button.onclick = function() {
        var value = me.hobbyInput.value;
        value = valReg(value);
        for (var i = 0; i < value.length; i++) {
            if (value[i] != '') {
                me.hobby.push(value[i]);
            }
        }
        me.hobby = removeRepeat(me.hobby);
        length = me.hobby.length;
        if (length > 10) {
            var more = length - 10;
            me.hobby = me.hobby.slice(more);
        }
        me.hobbyInput.value = '';
        render(me.hobby, me.showHobby, 'span');
        console.log(me.hobby);
    };
};

//拖拽功能
function Drag(obj){
    this.obj=obj;
}
Drag.prototype.Mousedown=function(){
    var me=this;
    me.onmousedown=function(event){
        x=event.clientX;
        y=event.clientY;
    }
}
Drag.prototype.Mouseup=function(){
    var me=this;
    me.onmouseup=function(){

    }
}
window.onload = init;
