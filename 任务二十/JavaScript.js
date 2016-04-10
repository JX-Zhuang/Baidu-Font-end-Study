window.onload = function() {
    /**
     *数据
     *
     **/
    var data = [];
    var aqiTextarea = document.getElementById('aqi-textarea');
    var aqiDiv = document.getElementById('aqi-div');
    var searchInput = document.getElementById('search-input');
    /**
     *左侧入
     *
     **/
    function leftAdd(value) {
        console.log(value)
        if (value instanceof Array) {
            var length = value.length;
            for (var i = length - 1; i >= 0; i--) {
                if (value[i] != '') {
                    data.unshift(value[i]);
                }
            }
        } else {
            data.unshift(value);
        }
    }
    /**
     *右侧入
     *
     **/
    function rightAdd(value) {
        if (value instanceof Array) {
            var length = value.length;
            for (var i = 0; i < length; i++) {
                if (value[i] != '') {
                    data.push(value[i]);
                }
            }
        } else {
            data.push(value);
        }
    }
    /**
     *左侧出
     *
     **/
    function leftDel() {
        data.shift();
    }
    /**
     *右侧出
     *
     **/
    function rightDel() {
        data.pop();
    }
    /**
     *提示信息
     *
     **/
    function promptMsg(val1, val2, msg) {
        if (val1 == val2) {
            alert(msg);
            return false;
        }else{
         	return true;
        }
    }

    /**
     *搜索
     *
     **/
    function searchStr(val, arr) {
        var newArr = [];
        var block = document.querySelectorAll('#aqi-div span');
        if (!promptMsg(val, '', '请输入要搜索的内容')) return false;
        arr.forEach(function(item, index, array) {
            if (item.search(val) != -1) {
                newArr.push(index);
                block[index].setAttribute('class', 'change-color');
                setTimeout(function(){
                	block[index].setAttribute('class', '');
                },6000);
            }
        });
        if (!promptMsg(newArr.length, 0, '没有你想要的内容')) return false;
    }
    /**
     *正则匹配
     *
     **/
    function valReg(val) {
        var newVal = val.split(/[^a-zA-Z0-9.\u4E00-\u9FA5]/);
        return newVal;
    }
    /**
     *绑定事件
     *
     **/
    function event() {
        var leftAddBtn = document.getElementById('left-add');
        var rightAddBtn = document.getElementById('right-add');
        var leftDelBtn = document.getElementById('left-del');
        var rightDelBtn = document.getElementById('right-del');
        var searchBtn = document.getElementById('search-btn');
        var value;
        var searchVal;
        window.addEventListener('click', function(event) {
            console.log(0)
            value = aqiTextarea.value.trim();
            value = valReg(value);
            searchVal = searchInput.value;
            switch (event.target.id) {
                case 'left-add':
                console.log(value)
                    if (!promptMsg(value, '', '请输入要增加的内容')) {
                        return false;
                    }
                    leftAdd(value);
                    aqiTextarea.value = '';
                    render();
                    break;
                case 'right-add':
                    if (!promptMsg(value, '', '请输入要增加的内容')) {
                    	return false;
                    }
                    rightAdd(value);
                    aqiTextarea.value = '';
                    render();
                    break;
                case 'left-del':
                    leftDel();
                    render();
                    break;
                case 'right-del':
                    rightDel();
                    render();
                    break;
                case 'search-btn':
                    searchStr(searchVal, data);
                    searchInput.value = '';
                    break;
            }
            // }
        });
    }
    /**
     *渲染页面
     *
     **/
    function render() {
        var length = data.length;
        var item = '';
        for (var i = 0; i < length; i++) {
            item += '<span>' + data[i] + '</span>';
        }
        aqiDiv.innerHTML = item;
        console.log(data)

    }
    event();
}
