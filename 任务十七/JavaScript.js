/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date('2016-01-01');
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
//用于渲染图表的数据
var chartData = {};

//记录当前页面的表单选项
var pageState = {
    nowSelectCity: '北京',
    nowGraTime: 'day'
}
var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap');
/**
 * 随机颜色
 */
function rgb() {
    var r = Math.floor(Math.random() * 200);
    var g = Math.floor(Math.random() * 200);
    var b = Math.floor(Math.random() * 200);
    var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return rgb;
}
/**
 * 渲染图表
 */
function renderChart() {
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    switch (time) {
        case 'day':
            chartData = aqiSourceData[city];
            break;
        case 'week':
            break;
        case 'month':
            (function() {
                var keys = Object.keys(aqiSourceData[city]);
                var dataMonth = {
                    Jan: 0,
                    Feb: 0,
                    Mar: 0
                };
                for (var i = 0; i < 31; i++) {
                    dataMonth.Jan += aqiSourceData[city][keys[i]];
                }
                dataMonth.Jan = dataMonth.Jan / 31;
                for (var i = 31; i < 60; i++) {
                    dataMonth.Feb += aqiSourceData[city][keys[i]];
                }
                dataMonth.Feb = dataMonth.Feb / 29;
                for (var i = 60; i < 91; i++) {
                    dataMonth.Mar += aqiSourceData[city][keys[i]];
                }
                dataMonth.Mar = dataMonth.Mar / 31;
                chartData = dataMonth;
            })();
            break;
        default:
            break;
    }
    var item = '';
    console.log(chartData);
    for (var time in chartData) {
        var data = chartData[time];
        var title = ' title=日期：' + time + ',空气质量：' + data + '>';
        var height = ' height:' + data + 'px';
        var bgColor = ';background:' + rgb();
        var style = height + bgColor;
        item += '<div style=' + style + title + '</div>';
    }
    aqiChartWrap[0].innerHTML = item;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    pageState.nowGraTime = time;
    // 调用图表渲染函数
    renderChart();
}
/**
 * select发生变化时的处理函数
 */
function citySelectCity(city) {
    // 确定是否选项发生了变化 
    // 设置对应数据
    pageState.nowSelectCity = city;
    // 调用图表渲染函数
    renderChart();
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var input = document.querySelectorAll('[name="gra-time"]');
    for (var i = input.length - 1; i >= 0; i--) {
        input[i].onchange = function() {
            var time = this.value;
            graTimeChange(time);
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById('city-select');
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange = function() {
        var city = this.value;
        citySelectCity(this.value);
    };
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式

    // 处理好的数据存到 chartData 中
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}


window.onload = init;
