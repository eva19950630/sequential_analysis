var code_id = 1;
var codes = [];
var behaviors = [];
var data = '';
var result = [];
var dataInfoStr = '';
var resultStr = '';
var CODE = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// user input code
$('#createCode').click(function() {
    code_id++;
    console.log("add: code" + code_id);
    if (code_id >= 2)
        $('#deleteCode').show();
    var str = `<div class="codeListItem" id="code${code_id}">
                    <div tooltip="Enter a single character. (e.g. 'A', '1')" class="codetip">
                        <span>Code:&ensp;
                            <input type="text" class="codeinput">
                        </span>
                    </div>
                    <div tooltip="Enter the corresponding behavior. (e.g. 'Read', 'Watch videos')" class="behaviortip">
                        <span>Behavior:&ensp;
                            <input type="text" class="behaviorinput">
                        </span>
                    </div>
                </div>`;
    $('.codeList').append(str);
});

$('#deleteCode').click(function() {
    console.log("delete: code" + code_id);
    $('#code'+code_id).remove();
    code_id--;
    if (code_id < 2)
        $('#deleteCode').hide();
});

$('#finishSettings').click(function() {
    $('.codeinput').each(function(index, element) {
        if (element.value != "")
            codes.push(element.value);
    });
    $('.behaviorinput').each(function(index, element) {
        if (element.value != "")
            behaviors.push(element.value);
    });
    console.log(codes.length);
    console.log(behaviors.length);

    var filter_result = codes.filter(function(element, index, arr) {
        return arr.indexOf(element) === index;
    });
    console.log(filter_result.length);
    if (codes.length >= 2 && behaviors.length >= 2) {
        if (filter_result.length == codes.length) {
            $('#stepOne').hide();
            $('#stepTwo').show();
            var str = `<table border=1 class="codetable">
                            <tr>
                                <th class="codeitems-head">Code</th>
                                <th class="behavioritems-head">Behavior</th>
                            </tr>`; 
            for (var i = 0; i < codes.length; i++) {
                str += `<tr>
                            <td class="codeitems text-center">${codes[i]}</td>
                            <td class="behavioritems">${behaviors[i]}</td>
                        </tr>`;
            }
            str += `</table>`;
        } else {
            alert("編碼不能重複");
            codes.length = 0;
            behaviors.length = 0;
        }
    } else {
        alert("編碼至少2個以上");
        codes.pop();
        behaviors.pop();
    }
    
    $('.showCodeInfo').append(str);
});

$('#finishPreparingData').click(function() {
    data = $('.datainput').val();
    calculate_Z(data, "fsmCanvas");
    showResult();
    $('.showDataInfo').append(dataInfoStr);
    $('.result').append(resultStr);
});

function calculate_Z(data, canvasId) {
    console.log(data);

    // change to data code num and calculate each code's count
    var data_N = '';
    var codeFreqSum = [];
    for (var i = 0; i < codes.length; i++)
        codeFreqSum[i] = 0;
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < codes.length; j++) {
            if (data[i] == codes[j]) {
                data_N += j;
                codeFreqSum[j]++;
            }
        }
    }
    console.log(data_N);

    // calculate Ns
    var data_Ns = [];
    for (var i = 0; i < data_N.length-1; i++)
        data_Ns[i] = data_N.substring(i, i+2);
    // for (var i = 0; i < data_Ns.length; i++)
    //     console.log(data_Ns[i]);
    console.log('Ns: ' + data_Ns.length);

    // create two dimension array freq[i][j] and calculate changing frequency
    var freq = new Array(codes.length);
    for (var i = 0; i < codes.length; i++)
        freq[i] = new Array(codes.length);
    var count = 0;
    var rowCountSum = [];
    for (var i = 0; i < codes.length; i++) {
        rowCountSum[i] = 0;
        for (var j = 0; j < codes.length; j++) {
            count = 0;
            for (var x = 0; x < data_Ns.length; x++) {
                if (data_Ns[x].substring(0, 1) == i && data_Ns[x].substring(1, 2) == j)
                    count++;
            }
            freq[i][j] = count;
            rowCountSum[i] += count;
        }
    }
    // for (var i = 0; i < codes.length; i++) {
    //     for (var j = 0; j < codes.length; j++)
    //         console.log('['+i+']'+'['+j+']'+freq[i][j]);
    // }
    // for (var i = 0; i < rowCountSum.length; i++)
    //     console.log(rowCountSum[i]);
    // show result[0]: frequency changing table
    result[0] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>`;
    for (var i = 0; i < codes.length; i++) {
        result[0] += `<td class="text-center">${codes[i]}</td>`;
    }
    result[0] += `</tr>`;
    for (var i = 0; i < codes.length; i++) {
        result[0] += `<tr>
                        <td class="text-center">${codes[i]}</td>`;
        for (var j = 0; j < codes.length; j++) {
            result[0] += `<td class="text-center">${freq[i][j]}</td>`;
        }
        result[0] += `</tr>`;
    }
    result[0] += `</table>`;

    // create two dimension array prob[i][j] and calculate changing probability
    var prob = new Array(codes.length);
    for (var i = 0; i < codes.length; i++)
        prob[i] = new Array(codes.length);
    for (var i = 0; i < codes.length; i++) {
        for (var j = 0; j < codes.length; j++)
            if (rowCountSum[i] == 0)
                prob[i][j] = 0;
            else
                prob[i][j] = freq[i][j]/rowCountSum[i];
    }
    // for (var i = 0; i < codes.length; i++) {
    //     for (var j = 0; j < codes.length; j++)
    //         console.log('['+i+']'+'['+j+']'+prob[i][j]);
    // }
    // show result[1]: probability changing table
    result[1] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>`;
    for (var i = 0; i < codes.length; i++) {
        result[1] += `<td class="text-center">${codes[i]}</td>`;
    }
    result[1] += `</tr>`;
    for (var i = 0; i < codes.length; i++) {
        result[1] += `<tr>
                        <td class="text-center">${codes[i]}</td>`;
        for (var j = 0; j < codes.length; j++) {
            result[1] += `<td class="text-center">${prob[i][j].toFixed(2)}</td>`;
        }
        result[1] += `</tr>`;
    }
    result[1] += `</table>`;

    // calculate code appear's frequency and probability
    var codeProb = [];
    for (var i = 0; i < codeFreqSum.length; i++)
        codeProb[i] = codeFreqSum[i]/data.length;
    // show result[2]: frequency and probability table
    result[2] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>
                        <td class="text-center" style="width: 100px">出現頻率</td>
                        <td class="text-center" style="width: 100px">出現機率</td>`;
    result[2] += `</tr>`;
    for (var i = 0; i < codes.length; i++) {
        result[2] += `<tr>
                        <td class="text-center">${codes[i]}</td>
                        <td class="text-center">${codeFreqSum[i]}</td>
                        <td class="text-center">${codeProb[i].toFixed(2)}</td>
                    </tr>`;
    }
    result[2] += `</table>`;

    // create two dimension array exp_prob[i][j] and calculate expected probability
    var exp_prob = new Array(codes.length);
    for (var i = 0; i < codes.length; i++)
        exp_prob[i] = new Array(codes.length);
    for (var i = 0; i < codes.length; i++) {
        for (var j = 0; j < codes.length; j++)
            exp_prob[i][j] = codeProb[i]*codeProb[j];
    }
    // show result[3]: expected probability table
    result[3] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>`;
    for (var i = 0; i < codes.length; i++) {
        result[3] += `<td class="text-center">${codes[i]}</td>`;
    }
    result[3] += `</tr>`;
    for (var i = 0; i < codes.length; i++) {
        result[3] += `<tr>
                        <td class="text-center">${codes[i]}</td>`;
        for (var j = 0; j < codes.length; j++) {
            result[3] += `<td class="text-center">${exp_prob[i][j].toFixed(2)}</td>`;
        }
        result[3] += `</tr>`;
    }
    result[3] += `</table>`;

    // create two dimension array exp_freq[i][j] and calculate expected frequency
    var exp_freq = new Array(codes.length);
    for (var i = 0; i < codes.length; i++)
        exp_freq[i] = new Array(codes.length);
    for (var i = 0; i < codes.length; i++) {
        for (var j = 0; j < codes.length; j++)
            exp_freq[i][j] = exp_prob[i][j]*data_Ns.length;
    }
    // show result[4]: expected frequency table
    result[4] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>`;
    for (var i = 0; i < codes.length; i++) {
        result[4] += `<td class="text-center">${codes[i]}</td>`;
    }
    result[4] += `</tr>`;
    for (var i = 0; i < codes.length; i++) {
        result[4] += `<tr>
                        <td class="text-center">${codes[i]}</td>`;
        for (var j = 0; j < codes.length; j++) {
            result[4] += `<td class="text-center">${exp_freq[i][j].toFixed(2)}</td>`;
        }
        result[4] += `</tr>`;
    }
    result[4] += `</table>`;

    // create two dimension array adjusted_Zscore[i][j] and calculate adjusted Z score
    var adjusted_Zscore = new Array(codes.length);
    for (var i = 0; i < codes.length; i++)
        adjusted_Zscore[i] = new Array(codes.length);
    for (var i = 0; i < codes.length; i++) {
        for (var j = 0; j < codes.length; j++)
            if (exp_prob[i][j] == 0)
                adjusted_Zscore[i][j] = 0;
            else
                adjusted_Zscore[i][j] = (freq[i][j]-exp_freq[i][j])/Math.sqrt(data_Ns.length*exp_prob[i][j]*(1-exp_prob[i][j]));
    }
    // show result[5]: adjusted Z score table
    result[5] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>`;
    for (var i = 0; i < codes.length; i++) {
        result[5] += `<td class="text-center">${codes[i]}</td>`;
    }
    result[5] += `</tr>`;
    for (var i = 0; i < codes.length; i++) {
        result[5] += `<tr>
                        <td class="text-center">${codes[i]}</td>`;
        for (var j = 0; j < codes.length; j++) {
            result[5] += `<td class="text-center">`;
            if (adjusted_Zscore[i][j] >= 2.58)
                result[5] += `<font style="color: red">${adjusted_Zscore[i][j].toFixed(2)}</font>`;
            else if (adjusted_Zscore[i][j] >= 1.96)
                result[5] += `<font style="color: black">${adjusted_Zscore[i][j].toFixed(2)}</font>`;
            else
                result[5] += `<font style="color: #999">${adjusted_Zscore[i][j].toFixed(2)}</font></td>`;
        }
        result[5] += `</tr>`;
    }
    result[5] += `</table>`;

    // show result[6]: draw canvas
    result[6] = `<canvas id="${canvasId}" width="400" height="400"></canvas>`;
    $(document).ready(function() {
        var c = document.getElementById(canvasId);
        var ctx = c.getContext("2d");
        var c_width = 400;

        // make canvas high resolution
        if(window.devicePixelRatio){
            let ratio = window.devicePixelRatio;
            c.setAttribute('width', c_width * ratio);
            c.setAttribute('height', c_width * ratio);
            c.style.width = c_width;
            c.style.height = c_width;
            ctx.scale(ratio, ratio);
        }
        // 校正 html canvas 線條模糊( 所有座標平移 0.5px，且線條盡量以整數座標繪製，所以大部分之座標皆以 Math.round 取整數 )
        ctx.translate(0.5, 0.5);

        var center_x = c_width/2;
        var center_y = c_width/2;
        var radius = 35;
        var x = [], y = [], font_x = [];
        var tmpAngle, font_y;
        ctx.save();
        ctx.translate(center_x, center_y);
        ctx.font = "35px Gentium Basic";
        for (var i = 0; i < codes.length; i++) {
            tmpAngle = i*(360/codes.length)*Math.PI/180;
            x.push(Math.round(150*Math.cos(tmpAngle)));
            y.push(Math.round(150*Math.sin(tmpAngle)));
            font_x.push(Math.round(ctx.measureText(codes[i]).width/2));
            font_y = 10;
        }
        console.log(x);
        console.log(y);
        for (var i = 0; i < codes.length; i++) {
            tmpAngle = (360/codes.length)*Math.PI/180;
            for (var j = 0; j < codes.length; j++) {
                // console.log(adjusted_Zscore[i][j]);
                if (adjusted_Zscore[i][j] != 0) {
                    if (adjusted_Zscore[i][j] >= 2.58)
                        paintArrow(x[i], y[i], x[j], y[j], radius, 5, "red");
                    else if (adjusted_Zscore[i][j] >= 1.96)
                        paintArrow(x[i], y[i], x[j], y[j], radius, 3, "black");
                    else
                        paintArrow(x[i], y[i], x[j], y[j], radius, 1, "gray");
                }
            }
        }
        function distance(x1, x2, y1, y2) {
            return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
        }
        function paintArrow (startX, startY, endX, endY, radius, width, color) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
            var ratio = radius/distance(startX, endX, startY, endY);
            var headend_x = endX-(endX-startX)*ratio;
            var headend_y = endY-(endY-startY)*ratio;
            paintArrowHead(startX, startY, headend_x, headend_y, 30, width, color);
        }
        function paintArrowHead(startX, startY, endX, endY, theta, width, color) {
            let angle = Math.atan2(startY - endY, startX - endX) * 180 / Math.PI;
            let angle1 = (angle + theta) * Math.PI / 180;
            let angle2 = (angle - theta) * Math.PI / 180;
            let topX = 15 * Math.cos(angle1);
            let topY = 15 * Math.sin(angle1);
            let botX = 15 * Math.cos(angle2);
            let botY = 15 * Math.sin(angle2);
            
            ctx.save();
            ctx.beginPath();
            // Reverse length on the other side 
            let arrowX = endX + topX;
            let arrowY = endY + topY;
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(endX, endY);
            arrowX = endX + botX;
            arrowY = endY + botY;
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(endX, endY);
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.restore();
        }
        for (var i = 0; i < codes.length; i++) {
            ctx.beginPath();
            ctx.save();
            ctx.translate(x[i], y[i]);
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.fillText(codes[i], -font_x[i], font_y);
            ctx.restore();
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    });
}

function showResult() {
    dataInfoStr = `<ul class="dataInfoList">
                        <li>Data sample: <div class="datasample"><font class="dataInfoText">${data}</font><div></li>
                        <li>Total codes: <font class="dataInfoText">${data.length}</font></li>
                        <li>Data codes -> behaviors:
                    <ul>`;
    for (var i = 0; i < codes.length; i++) {
        dataInfoStr += `<li><font class="dataInfoText">${codes[i]} -> ${behaviors[i]}</font></li>`;
    }
    dataInfoStr += `</ul></li></ul>`;

    var resultItem = ['編碼轉換頻率表', '編碼轉換機率表', '編碼出現頻率與機率表<br>(出現機率=出現頻率/'+data.length+')', '編碼轉換期望機率表<br>(First-order model)', '編碼轉換期望頻率表', '調整後Z分數表', '行為轉移關係圖'];
    resultStr = `<table border=1 class="resulttable">
                    <tr>
                        <th class="resultitem-head">Item</th>
                        <th class="">Result</th>
                    </tr>`;
    for (var i = 0; i < resultItem.length; i++) {
        resultStr += `<tr>
                    <td class="text-center">${resultItem[i]}</td>
                    <td class="text-center">${result[i]}</td>
                </tr>`;
    }
    resultStr += `</table>`;
}

var dataObj = [];
function load_WebdiskData() {
    $('.showDataInfo_webdisk').empty();
    $('.result_webdisk').empty();

    $.getJSON("webdisk_inputdata.json", function(data) {
        dataObj = data;
        var users = [];
        for (var i in dataObj) {
            if(!users.includes(dataObj[i].account)){
                users.push(dataObj[i].account);
            }
        }
        users.sort();

        var userlist = "";
        for (var i in users)
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        $('#userList_webdisk').append(userlist);
    });
}

function select_webdiskData(){
    $('.showDataInfo_webdisk').empty();
    $('.result_webdisk').empty();

    var user = $('#userList_webdisk').val();
    console.log(user);

    data = '';
    for (var i in dataObj) {
        if (dataObj[i].account == user)
            data += dataObj[i].code;
    }
    // console.log(data;

    codes = ['A', 'B', 'C', 'D'];
    behaviors = ['使用模擬器', '進行測驗', '看PPT', '看影片'];
    calculate_Z(data, "fsmCanvas_webdisk");
    showResult();
    $('.showDataInfo_webdisk').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_webdisk').append(resultStr);
}

function load_pigSaviorData(){
    $('.showDataInfo_pigsavior').empty();
    $('.result_pigsavior').empty();

    $.getJSON("pigSavior_inputdata.json", function(data){
        dataObj = data;
        var users = [], scenes = [];
        for (var i in dataObj){
            if(!users.includes(dataObj[i].user_id)){
                users.push(dataObj[i].user_id);
            }
            if(!scenes.includes(dataObj[i].game_scene)){
                scenes.push(dataObj[i].game_scene);
            }
        }

        users.sort((a, b) => a - b);
        scenes.sort((a, b) => a.slice(5)-b.slice(5));

        userlist = "", scenelist = "";
        for (var i in users){
            // console.log(users[i]);
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        }
        document.getElementById('userList').innerHTML = userlist;
        gamestage = "";
        for (var i in scenes){
            scenelist += "<option value = "+scenes[i]+">"+scenes[i]+"</option>";
        }
        document.getElementById('sceneList').innerHTML = scenelist;
    });
}

function select_pigSaviorData(){
    $('.showDataInfo_pigsavior').empty();
    $('.result_pigsavior').empty();

    var userSelect = document.getElementById("userList");
    var user = userSelect.options[userSelect.selectedIndex].value;
    var sceneSelect = document.getElementById("sceneList");
    var scene = sceneSelect.options[sceneSelect.selectedIndex].value;

    codes = [];
    behaviors = [];
    data = '';
    for (var i in dataObj){
        if (dataObj[i].user_id == user && dataObj[i].game_scene == scene){
            if(!behaviors.includes(dataObj[i].target)){
                behaviors.push(dataObj[i].target);
                data += CODE[behaviors.length-1];
                codes.push(CODE[behaviors.length-1]);
            }else{
                for(j = 0; j < behaviors.length; j++){
                    if(behaviors[j] == dataObj[i].target){
                        data += CODE[j];
                        break;
                    }
                }
            }
        }
    }
    // console.log(data);
    console.log(codes);
    console.log(behaviors);

    calculate_Z(data, "fsmCanvas_pigsavior");
    showResult();
    $('.showDataInfo_pigsavior').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_pigsavior').append(resultStr);
}