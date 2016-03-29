window.onload = function() {
    var aqiInput = document.getElementById('aqi-input');

    var aqiDiv = document.getElementById('aqi-div');
    var aqiNum = document.getElementById('aqi-num');

    var leftAddBtn = document.getElementById('left-add');
    var rightAddBtn = document.getElementById('right-add');
    var leftDelBtn = document.getElementById('left-del');
    var rightDelBtn = document.getElementById('right-del');
    var sortBtn = document.getElementById('sort-btn');
    var value, data = [];
    //按钮
    var eventBtn = {
        searchValue: function(value) {
            if (value.search(/.[^0-9]/) != -1) {
                alert('请输入整数');
                return false;
            } else if (value < 10 || value > 100) {
                alert('请输入10-100的整数');
                return false;
            } else {
                return true;
            }
        },
        leftAdd: function(value) {
            if (this.searchValue(value) == true) {
                data.unshift(value);
                render();

            }
        }, //左侧入
        rightAdd: function(value) {
            if (this.searchValue(value) == true) {
                data.push(value);
                render();

            }
        }, //右侧入
        leftDel: function() {
            data.shift();
            render();

        }, //左侧出
        rightDel: function() {
            data.pop();
            render();

        }, //右侧出
        sort: function(arr) {
                var i = arr.length,
                    j;
                var num;
                for (i; i > 0; i--) {
                    for (j = 0; j < i - 1; j++) {
                        if (arr[j] > arr[j + 1]) {
                            num = arr[j + 1];
                            arr[j + 1] = arr[j];
                            arr[j] = num;
                        }
                    }
                }
                return arr;
            } //数组排序
    };
    /**
     *绑定事件
     *
     **/
    function event() {
        window.addEventListener('click', function(event) {
            value = aqiInput.value;
            switch (event.target.id) {
                case 'sort-btn':
                    data=eventBtn.sort(data);
                    break;
                case 'left-add':
                    eventBtn.leftAdd(value);
                    break;
                case 'right-add':
                    eventBtn.rightAdd(value);
                    break;
                case 'left-del':
                    eventBtn.leftDel();
                    break;
                case 'right-del':
                    eventBtn.rightDel();
                    break;
            }
        });
    }
    /**
     *初始化数字
     *
     **/
    function createArr() {
        for (var i = 0; i < 30; i++) {
            var num=Math.round(Math.random()*90+10);
            data.push(num);
        }
        render();
    }
    /**
     *渲染页面
     *
     **/
    function render() {
        var length = data.length;
        var item = '';
        var num='';
        for (var i = 0; i < length; i++) {
            item += '<div style="height:'+data[i]*5+'px">' + data[i] + '</div>';
            num += '<span>' + data[i] + '</span>';
        }
        aqiDiv.innerHTML = item;
        aqiNum.innerHTML = num;

    }
    function init(){
        event();
        createArr();
        data=eventBtn.sort(data);
    }
    init();
}
