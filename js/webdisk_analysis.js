var dataObj = [];
// Learning Approach
function load_WebdiskLAData() {
    $('#timeList_webdisk_la').empty();
    $('#userList_webdisk_la').empty();
    $('.showDataInfo_webdisk_la').empty();
    $('.result_webdisk_la').empty();
    
    $.getJSON("webdisk_LA.json", function(data) {
        dataObj = data;
        var times = [], users = [];
        for (var i in dataObj) {
            var foundYear = times.find(result => result == dataObj[i].schoolYear)
            if (!foundYear)
                times.push(dataObj[i].schoolYear);
        }
        for (var i in dataObj) {
            if (times[0] == dataObj[i].schoolYear) {
                var foundUser = users.find(result => result == dataObj[i].account)
                if (!foundUser)
                    users.push(dataObj[i].account);
            }
        }
        users.sort();

        var timelist = "", userlist = "";
        for (var i in times)
            timelist += "<option value = "+times[i]+">"+times[i]+"學年度</option>";
        $('#timeList_webdisk_la').append(timelist);
        for (var i in users)
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        $('#userList_webdisk_la').append(userlist);
    });
}

$('#timeList_webdisk_la').on('change', function() {
    $('#userList_webdisk_la').empty();
    var chooseYear = $('#timeList_webdisk_la').val();
    var users = [];
    for (var i in dataObj) {
        if (chooseYear == dataObj[i].schoolYear) {
            var foundUser = users.find(result => result == dataObj[i].account)
            if (!foundUser)
                users.push(dataObj[i].account);
        }
    }
    users.sort();

    var userlist = "";
    for (var i in users)
        userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
    $('#userList_webdisk_la').append(userlist);
});

function select_webdiskLAData() {
    $('.showDataInfo_webdisk_la').empty();
    $('.result_webdisk_la').empty();

    var time = $('#timeList_webdisk_la').val();
    var user = $('#userList_webdisk_la').val();
    // console.log(user);

    data = '';
    for (var i in dataObj) {
        if (dataObj[i].schoolYear == time && dataObj[i].account == user)
            data += dataObj[i].code;
    }
    console.log(data);

    codes = ['A', 'B', 'C', 'D'];
    behaviors = ['使用模擬器', '進行測驗', '看PPT', '看影片'];
    canvasId = "fsmCanvas_webdiskLA";
    calculate_Z(data);
    showResult();
    $('.showDataInfo_webdisk_la').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_webdisk_la').append(resultStr);
}

// Simulator
function load_WebdiskSimuData() {
    $('#timeList_webdisk_simu').empty();
    $('#userList_webdisk_simu').empty();
    $('.showDataInfo_webdisk_simu').empty();
    $('.result_webdisk_simu').empty();
    
    $.getJSON("webdisk_SIMU.json", function(data) {
        dataObj = data;
        var times = [], users = [];
        for (var i in dataObj) {
            var foundYear = times.find(result => result == dataObj[i].schoolYear)
            if (!foundYear)
                times.push(dataObj[i].schoolYear);
        }
        for (var i in dataObj) {
            if (times[0] == dataObj[i].schoolYear) {
                var foundUser = users.find(result => result == dataObj[i].account)
                if (!foundUser)
                    users.push(dataObj[i].account);
            }
        }
        users.sort();

        var timelist = "", userlist = "";
        for (var i in times)
            timelist += "<option value = "+times[i]+">"+times[i]+"學年度</option>";
        $('#timeList_webdisk_simu').append(timelist);
        for (var i in users)
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        $('#userList_webdisk_simu').append(userlist);
    });
}

$('#timeList_webdisk_simu').on('change', function() {
    $('#userList_webdisk_simu').empty();
    var chooseYear = $('#timeList_webdisk_simu').val();
    var users = [];
    for (var i in dataObj) {
        if (chooseYear == dataObj[i].schoolYear) {
            var foundUser = users.find(result => result == dataObj[i].account)
            if (!foundUser)
                users.push(dataObj[i].account);
        }
    }
    users.sort();

    var userlist = "";
    for (var i in users)
        userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
    $('#userList_webdisk_simu').append(userlist);
});

function select_webdiskSimuData() {
    $('.showDataInfo_webdisk_simu').empty();
    $('.result_webdisk_simu').empty();

    var time = $('#timeList_webdisk_simu').val();
    var user = $('#userList_webdisk_simu').val();
    // console.log(user);

    data = '';
    for (var i in dataObj) {
        if (dataObj[i].schoolYear == time && dataObj[i].account == user)
            data += dataObj[i].modeCode;
    }
    console.log(data);

    codes = ['A', 'B', 'C'];
    behaviors = ['step', 'animation', 'run-all'];
    canvasId = "fsmCanvas_webdiskSIMU";
    calculate_Z(data);
    showResult();
    $('.showDataInfo_webdisk_simu').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_webdisk_simu').append(resultStr);
}

// Grade group
function load_WebdiskLADataforGroup() {
    $('#webdisk_userdata').val('');
    $('#webdisk_gradedata').val('');
    $('.chooseResultBtn_webdisk_grpGrade').empty();
    $('.showDataInfo_webdisk_grpGrade').empty();

    $.getJSON("webdisk_LA.json", function(data) {
        dataObj = data;
        var times = [], users = [];
        for (var i in dataObj) {
            var foundYear = times.find(result => result == dataObj[i].schoolYear)
            if (!foundYear)
                times.push(dataObj[i].schoolYear);
        }

        var timelist = "";
        for (var i in times)
            timelist += "<option value = "+times[i]+">"+times[i]+"學年度</option>";
        $('#timeList_webdisk_grpGrade').append(timelist);
    });
}

var chooseTime = "";
var gradeUser_A = []; var gradeUser_B = []; var gradeUser_C = [];
function get_webdiskUserGrade() {
    $('.chooseResultBtn_webdisk_grpGrade').empty();
    $('.showDataInfo_webdisk_grpGrade').empty();
    $('.result_webdisk_grpGrade').empty();

    chooseTime = $('#timeList_webdisk_grpGrade').val();
    gradeUser_A = []; gradeUser_B = []; gradeUser_C = [];
    var userArr = $('#webdisk_userdata').val().split('\n');
    var gradeArr = $('#webdisk_gradedata').val().split('\n');
    // console.log(userArr.length);
    if (userArr.length < 4) {
        alert("使用者數量需超過(含)4位以上");
    } else if (userArr.length != gradeArr.length) {
        alert("使用者學號數量與成績數量不符");
    } else {
        var totalUser = userArr.length;
        var gradeSortwithIndex = [];
        for (var i in gradeArr)
            gradeSortwithIndex.push([gradeArr[i], i]);
        gradeSortwithIndex.sort(function (left, right) {
            return left[0] > right[0] ? -1 : 1;
        });
        // console.log(gradeSortwithIndex);

        var boundVal = Math.round(totalUser*0.27);
        for (var i = 0; i < totalUser; i++) {
            if (i < boundVal)
                gradeUser_A.push([userArr[gradeSortwithIndex[i][1]], gradeSortwithIndex[i][0]]);
            else if (i >= boundVal && i < (totalUser-boundVal))
                gradeUser_B.push([userArr[gradeSortwithIndex[i][1]], gradeSortwithIndex[i][0]]);
            else
                gradeUser_C.push([userArr[gradeSortwithIndex[i][1]], gradeSortwithIndex[i][0]]);
        }
        // console.log(gradeUser_A);
        // console.log(gradeUser_B);
        // console.log(gradeUser_C);

        var str = `<div><input type="button" class="btn custombtn classification disOutline-btn" onclick="select_grade('A');" value="前27%"></div>
                    <div><input type="button" class="btn custombtn classification disOutline-btn" onclick="select_grade('B');" value="中46%"></div>
                    <div><input type="button" class="btn custombtn classification disOutline-btn" onclick="select_grade('C');" value="後27%"></div>`;
        $('.chooseResultBtn_webdisk_grpGrade').append(str);
    }
}

function select_grade(rank) {
    if (rank == 'A')
        calcuGradeGrpAverZ_score(gradeUser_A);
    else if (rank == 'B')
        calcuGradeGrpAverZ_score(gradeUser_B);
    else if (rank == 'C')
        calcuGradeGrpAverZ_score(gradeUser_C);
}

function calcuGradeGrpAverZ_score(grpArray) {
    // get member's code data
    var grpdata = [];
    var tmpdata = '';
    for (var j in grpArray) {
        tmpdata = '';
        for (var i in dataObj) {
            if (dataObj[i].schoolYear == chooseTime) {
                if (dataObj[i].account == grpArray[j][0].toUpperCase() || dataObj[i].account == grpArray[j][0].toLowerCase())
                    tmpdata += dataObj[i].code;
            }
        }
        grpdata.push([grpArray[j][0], grpArray[j][1], tmpdata]);
    }
    // console.log(grpdata);

    // setting
    codes = ['A', 'B', 'C', 'D'];
    behaviors = ['使用模擬器', '進行測驗', '看PPT', '看影片'];
    canvasId = "fsmCanvas_webdiskGrp";
    // show result info
    dataInfoStr = `<ul class="dataInfoList">
                        <li>Choose time: <font class="dataInfoText">${chooseTime}學年度</font></li>
                        <li>Total users: <font class="dataInfoText">${grpArray.length}</font></li>
                        <li>User data: <div class="datasample gradedata">`;
    for (var i in grpArray)
        dataInfoStr += `<font class="dataInfoText">${grpdata[i][0]}, ${grpdata[i][1]}<br></font>`;
    dataInfoStr += `</div></li>
                    <li>Data codes -> behaviors:
                        <ul>`;
        for (var i in codes)
            dataInfoStr += `<li><font class="dataInfoText">${codes[i]} -> ${behaviors[i]}</font></li>`;
        dataInfoStr += `</ul></li>
                    </ul>`;
    $('.showDataInfo_webdisk_grpGrade').empty();
    $('.showDataInfo_webdisk_grpGrade').append(`<div class="stepTitle">Results</div>`+dataInfoStr);

    // calculate z in group and its average
    var grpZscore = [];
    for (var i in grpdata)
        grpZscore.push(calculate_Z(grpdata[i][2]));
    // console.log(grpZscore);
    // console.log(grpZscore[1][0][0]);

    var grpAverZscore = new Array(codes.length);
    for (var i in codes)
        grpAverZscore[i] = new Array(codes.length);
    var tmpTotal = 0;
    for (var i in codes) {
        for (var j in codes) {
            tmpTotal = 0;
            for (var k in grpZscore) {
                if (isNaN(grpZscore[k][i][j]))
                    grpZscore[k][i][j] = 0;
                tmpTotal += grpZscore[k][i][j];
            }
            // console.log(tmpTotal);
            grpAverZscore[i][j] = tmpTotal/grpZscore.length;
        }
    }
    console.log(grpAverZscore);
    showGrpGradeResult_webdisk(grpAverZscore);
}

function showGrpGradeResult_webdisk(grpAverZscore) {
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
            if (Math.abs(grpAverZscore[i][j]) >= 2.58)
                result[5] += `<font style="color: red">${grpAverZscore[i][j].toFixed(2)}**</font>`;
            else if (Math.abs(grpAverZscore[i][j]) >= 1.96)
                result[5] += `<font style="color: black">${grpAverZscore[i][j].toFixed(2)}*</font>`;
            else
                result[5] += `<font style="color: #666">${grpAverZscore[i][j].toFixed(2)}</font></td>`;
        }
        result[5] += `</tr>`;
    }
    result[5] += `</table>`;

    // show result[6]: draw canvas
    result[6] = `<p><canvas id=${canvasId} width="500" height="500"></canvas></p>`;
    $(document).ready(function() {
        var c = document.getElementById(canvasId);
        var ctx = c.getContext("2d");
        var c_width = 500;

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

        var radius = 35;
        var x = [], y = [], font_x = [];
        var tmpAngle, font_y;
        ctx.save();
        ctx.translate(c_width/2, c_width/2);
        ctx.font = "35px Gentium Basic";
        for (var i = 0; i < codes.length; i++) {
            tmpAngle = i*(360/codes.length)*Math.PI/180;
            x.push(Math.round(180*Math.cos(tmpAngle)));
            y.push(Math.round(180*Math.sin(tmpAngle)));
            font_x.push(Math.round(ctx.measureText(codes[i]).width/2));
            font_y = 10;
        }
        // console.log(x);
        // console.log(y);
        for (var i = 0; i < codes.length; i++) {
            tmpAngle = (360/codes.length)*Math.PI/180;
            for (var j = 0; j < codes.length; j++) {
                // console.log(grpAverZscore[i][j]);
                if (grpAverZscore[i][j] != 0) {
                    if (i == j) {
                        if (Math.abs(grpAverZscore[i][j]) >= 2.58)
                            paintReverseArrow(x[i], y[i], radius, 5, "red");
                        else if (Math.abs(grpAverZscore[i][j]) >= 1.96)
                            paintReverseArrow(x[i], y[i], radius, 3, "black");
                        else
                            paintReverseArrow(x[i], y[i], radius, 1, "#666");
                    } else {
                        if (Math.abs(grpAverZscore[i][j]) >= 2.58)
                            paintArrow(x[i], y[i], x[j], y[j], radius, 5, "red");
                        else if (Math.abs(grpAverZscore[i][j]) >= 1.96)
                            paintArrow(x[i], y[i], x[j], y[j], radius, 3, "black");
                        else
                            paintArrow(x[i], y[i], x[j], y[j], radius, 1, "#666");
                    }
                }
            }
        }
        function paintReverseArrow(centerX, centerY, radius, width, color) {
            ctx.save();
            ctx.beginPath();
            var dis = Math.sqrt(Math.pow(centerX, 2)+Math.pow(centerY, 2));
            var ratio = (dis+radius)/dis;
            var newX = ratio*centerX;
            var newY = ratio*centerY;
            // console.log(centerX+' '+centerY+' '+newX+' '+newY);
            ctx.arc(newX, newY, 25, 0, 2 * Math.PI);
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
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
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
        // paint circle state and fill text
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
        function distance(x1, x2, y1, y2) {
            return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
        }
        ctx.restore();
    });
    for (var i = 0; i < codes.length; i++) {
        for (var j = 0; j < codes.length; j++) {
            if (j == 0)
                result[6] += `<div class="resultZ">`;
            if (Math.abs(grpAverZscore[i][j]) >= 2.58)
                result[6] += `<font style="color: red">${codes[i]}->${codes[j]}: ${grpAverZscore[i][j].toFixed(2)}**</font>`;
            else if (Math.abs(grpAverZscore[i][j]) >= 1.96)
                result[6] += `<font style="color: black">${codes[i]}->${codes[j]}: ${grpAverZscore[i][j].toFixed(2)}*</font>`;
            else
                result[6] += `<font style="color: #666">${codes[i]}->${codes[j]}: ${grpAverZscore[i][j].toFixed(2)}</font>`;
            result[6] += `<br>`;
            if (j % codes.length == codes.length-1)
                result[6] += `</div>`;
        }
    }

    // show result
    resultStr = `<table border=1 class="resulttable">
                    <tr>
                        <th class="resultitem-head">Item</th>
                        <th class="">Result</th>
                    </tr>`;
    for (var i = 5; i < resultItem.length; i++) {
        resultStr += `<tr>
                    <td class="text-center">${resultItem[i]}</td>
                    <td class="text-center">${result[i]}</td>
                </tr>`;
    }
    resultStr += `</table>`;
    $('.result_webdisk_grpGrade').empty();
    $('.result_webdisk_grpGrade').append(resultStr);
}
