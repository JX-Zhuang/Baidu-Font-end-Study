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
                value = Number(value);
                if (data.length == 60) return (alert('不能大于60个'));
                data.unshift(value);
                render();
                console.log(data)
            }
        }, //左侧入
        rightAdd: function(value) {
            if (this.searchValue(value) == true) {
                value = Number(value);
                if (data.length == 60) return (alert('不能大于60个'));
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
        sortRender: function() {
                var col = document.querySelectorAll('#aqi-div div');
                var block = document.querySelectorAll('#aqi-num span');
                var i = col.length,
                    j = 0;
                var num,
                    text;
                var a;
                var color;
                function forJ() {
                    if (a!=i) {
                        color=col[j].style.backgroundColor;
                    }
                    if (Number(col[j].innerHTML) > Number(col[j + 1].innerHTML)) {
                        col[j].style.backgroundColor = 'red';
                        //柱状图
                        text = col[j + 1].innerHTML;
                        col[j + 1].innerHTML = col[j].innerHTML;
                        col[j].innerHTML = text;
                        num = col[j + 1].style.cssText;
                        col[j + 1].style.cssText = col[j].style.cssText;
                        col[j].style.cssText = num;
                        //文字
                        text = block[j + 1].innerHTML;
                        block[j + 1].innerHTML = block[j].innerHTML;
                        block[j].innerHTML = text;
                        //style
                        num = block[j + 1].style.cssText;
                        block[j + 1].style.cssText = block[j].style.cssText;
                        block[j].style.cssText = num;

                        num = data[j + 1];
                        data[j + 1] = data[j];
                        data[j] = num;
                    } else {
                        col[j].style.backgroundColor = color;
                        color = col[j + 1].style.backgroundColor;
                        col[j + 1].style.backgroundColor = 'red';
                    }
                    a=i;
                    j++;
                    if (j < i - 1) {
                        var interval = setInterval(function() {
                            forJ();
                            clearInterval(interval);
                        }, 300);
                    } else {
                        col[j].style.backgroundColor = color;
                        j = 0;
                        i--;
                        if (i == 0) {
                            return true;
                        } else {
                            var interval = setInterval(function() {
                                forJ();
                                clearInterval(interval);
                            }, 300);
                        }
                    }
                    return data;
                }
                forJ();
            } //,
            // sort: function(arr) {
            //         var i = arr.length,
            //             j;
            //         var num;
            //         for (i; i > 0; i--) {
            //             for (j = 0; j < i - 1; j++) {
            //                 //arr[j]=Number(arr[j]);
            //                 if (arr[j] > arr[j + 1]) {
            //                     num = arr[j + 1];
            //                     arr[j + 1] = arr[j];
            //                     arr[j] = num;
            //                 }
            //             }
            //         }
            //         return arr;
            //     } //数组排序
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
                    //data=eventBtn.sort(data);
                    //render();
                    eventBtn.sortRender();
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
            var num = Math.round(Math.random() * 90 + 10);
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
        var num = '';
        var bgColor = '';
        var j;
        for (var i = 0; i < length; i++) {
            j = parseInt(data[i] / 10);
            switch (j) {
                case 1:
                    bgColor = '#082';
                    break;
                case 2:
                    bgColor = '#777';
                    break;
                case 3:
                    bgColor = '#840';
                    break;
                case 4:
                    bgColor = '#B1AE35';
                    break;
                case 5:
                    bgColor = '#1a8';
                    break;
                case 6:
                    bgColor = '#1DDADA';
                    break;
                case 7:
                    bgColor = '#D63B97';
                    break;
                case 8:
                    bgColor = '#ccc';
                    break;
                case 9:
                    bgColor = '#0ad';
                    break;
                default:
                    bgColor = '#E40505';
                    break;

            }
            item += '<div style="height:' + data[i] * 5 + 'px;background:' + bgColor + '">' + data[i] + '</div>';
            num += '<span style="background-color:' + bgColor + '">' + data[i] + '</span>';
        }
        aqiDiv.innerHTML = item;
        aqiNum.innerHTML = num;

    }

    function init() {
        event();
        createArr();
        //data = eventBtn.sort(data);
    }
    init();
}
