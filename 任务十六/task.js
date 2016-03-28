/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var city = document.getElementById('aqi-city-input');
var air = document.getElementById('aqi-value-input');
var aqiTable = document.querySelector('#aqi-table tbody');
var addBtn = document.getElementById('add-btn');

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityValue = city.value;
    var airValue = air.value.trim();
    if (cityValue == '' || airValue == '') {
        alert('请输入内容');
        return false;
    } else if (cityValue.search(/[^a-zA-Z\u4E00-\u9FA5]/) != -1) {
        alert('请输入汉字或者英文');
        return false;
    } else if (airValue.search(/[^0-9]/) != -1) {
        alert('请输入整数');
        return false;
    }
    aqiData[cityValue] = airValue;
    return [cityValue, airValue];
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(aqiData) {
	var add='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for (var cityValue in aqiData) {
    	add+='<tr><td>'+cityValue+'</td><td>'+aqiData[cityValue]+'</td><td><button>删除</button></td></tr>';
    }
    aqiTable.innerHTML=add;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var value = addAqiData();
    if (value == false) {
        return false;
    }
    renderAqiList(aqiData);
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    console.log(this)
    var tr = this.parentNode.parentNode;
    var td = tr.querySelectorAll('td');
    var cityValue = td[0].innerText;
    var airValue = td[1].innerText;
    delete aqiData[cityValue];
    aqiTable.removeChild(tr);
    console.log(aqiData);
}
function test(){
	console.log(this)
}
function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var delBtn = document.querySelector('#aqi-table button');
    aqiTable.addEventListener("click", function(event) {
        test.call();
       // if (event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(event.target, event.target.dataset.cityValue);
    })
}
//window.onload = function() {
init();
//}
