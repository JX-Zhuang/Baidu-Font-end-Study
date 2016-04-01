window.onload = function() {
    /**
     *数据
     *
     **/
    var data = [];
    var aqiInput = document.getElementById('aqi-input');
    var aqiDiv = document.getElementById('aqi-div');
    /**
     *左侧入
     *
     **/
    function leftAdd(value) {
        data.unshift(value);
    }
    /**
     *右侧入
     *
     **/
    function rightAdd(value) {
        data.push(value);
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
     *绑定事件
     *
     **/
    function event() {
        var leftAddBtn = document.getElementById('left-add');
        var rightAddBtn = document.getElementById('right-add');
        var leftDelBtn = document.getElementById('left-del');
        var rightDelBtn = document.getElementById('right-del');
        var value;
        window.addEventListener('click', function(event) {
            if (aqiInput.value.search(/[^0-9]/) != -1||aqiInput.value=='') {
                alert('请输入数字');
                return false;
            } else {
                value = aqiInput.value;
                switch (event.target.id) {
                    case 'left-add':
                        leftAdd(value);
                        render();
                        break;
                    case 'right-add':
                        rightAdd(value);
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
                }
            }
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
    }
    event();
}
