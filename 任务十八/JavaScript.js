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
    function leftAdd() {
        var value = aqiInput.value;
        data.unshift(value);
        render();
    }
    /**
     *右侧入
     *
     **/
    function rightAdd() {
        var value = aqiInput.value;
        data.push(value);
        render();
    }
    /**
     *左侧出
     *
     **/
    function leftDel() {
        data.shift();
        render();
    }
    /**
     *右侧出
     *
     **/
    function rightDel() {
        data.pop();
        render();
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
        window.addEventListener('click', function(event) {
            switch (event.target.id) {
                case 'left-add':
                    leftAdd();
                    break;
                case 'right-add':
                    rightAdd();
                    break;
                case 'left-del':
                    leftDel();
                    break;
                case 'right-del':
                    rightDel();
                    break;
            }
        });
    }
    /**
     *渲染页面
     *
     **/
    function render() {
        aqiDiv.innerHTML=data;
        var length=data.length;
    }
    event();
}
