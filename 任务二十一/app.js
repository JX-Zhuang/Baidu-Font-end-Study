//增加
function addData(condition, array, item) {
    item = item.trim();
    if (item.slice(item.length - 1) == ',' || item.slice(item.length - 1) == '，') {
        item = item.slice(0, item.length - 1);
    }
    if (item == '') return false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == item) {
            return false;
        }
    }
    if (condition) {
        array.push(item);
        return true;
    }
}
//渲染dom
function render(data, tagParent, tagSelf) {
    var i = '';
    data.forEach(function(item, index, array) {
        i += '<' + tagSelf + '>' + item + '</' + tagSelf + '>';
    });
    tagParent.innerHTML = i;
}
//事件
function addEvent(box, event, tag, fun) {
    box.addEventListener(event, function(event) {
        if (event.target.id == tag) {
            var input = document.getElementById(tag);
            if (input.value.slice(0, 1) == ',') {
                input.value = input.value.slice(1);
            }
            var value = input.value;
            var condition = event.keyCode == '13' || event.keyCode == '32' || event.keyCode == '188';
            fun(condition, value);
        } else if (event.target.nodeName.toLowerCase() == tag) {
            fun.call(event.target);
        }
    });
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
    var hobby = [];
    var tag = [];
    var tagInputId = 'tag-input';
    var tagInput = document.getElementById('tag-input');
    var tagParent = document.getElementById('show-tag');
    var tagBox = document.getElementById('tag-box');
    var hobbyBox = document.getElementById('hobby-box');

    function funKeyup(condition, item) {
        if (condition == false) return false;
        if (addData(condition, tag, item) == false) {
            tagInput.value = '';
            return false;
        } else {
            addData(condition, tag, item);
            render(tag, tagParent, 'span');
            tagInput.value = '';
        }
    }

    function funMouseover() {
        var text = this.innerText;
        this.innerText = '点击删除' + text;
    }

    function funMouseout() {
        var text = this.innerText;
        this.innerText = text.slice(4);
    }

    function funClick() {
        var text = this.innerText.slice(4);
        var index = tag.indexOf(text);
        console.log(index)
        tag.splice(index, 1);
        render(tag, tagParent, 'span');
        console.log(tag);
    }

    function funAddHobby() {
        var hobbyInput = document.getElementById('hobby-input');
        var showHobby = document.getElementById('show-hobby');
        var value = hobbyInput.value;
        value = valReg(value);
        var length = value.length;
        for (var i = 0; i < length; i++) {
            if (value[i] != '') {
                hobby.push(value[i]);
            }
        }
        hobby = removeRepeat(hobby);
        length = hobby.length;
        if (length > 10) {
            var more = length - 10;
            hobby = hobby.slice(more);
        }
        render(hobby, showHobby, 'span');
    }
    //绑定事件

    addEvent(tagBox, 'keyup', tagInputId, funKeyup);
    addEvent(tagBox, 'mouseover', 'span', funMouseover);
    addEvent(tagBox, 'mouseout', 'span', funMouseout);
    addEvent(tagBox, 'click', 'span', funClick);
    addEvent(hobbyBox, 'click', 'button', funAddHobby);

}
window.onload = init;
