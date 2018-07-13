// user input code
var code_id = 1;
var codes = [];
var behaviors = [];
var data = '';
var result = [];

$('#createCode').click(function() {
    code_id++;
    var str = `<div class="codeListItem" data-id="${code_id}">
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
    calculate_Z(data);
    var str = `<li>Data sample: <font class="dataInfoText">${data}</font></li>
                <li>Total codes: <font class="dataInfoText">${data.length}</font></li>
                <li>Data codes -> behaviors:<ul>`;
    for (var i = 0; i < codes.length; i++) {
        str += `<li><font class="dataInfoText">${codes[i]} -> ${behaviors[i]}</font></li>`
    }
    str += `</ul></li>`;
    $('.dataInfoList').append(str);
    showResult();
});

function calculate_Z(data) {
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
            prob[i][j] = Math.round((freq[i][j]/rowCountSum[i])*100)/100;
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
        codeProb[i] = Math.round((codeFreqSum[i]/data.length)*100)/100;
    // show result[2]: frequency and probability table
    result[2] = `<table border=1 class="resulttable-content">
                    <tr>
                        <td></td>
                        <td class="text-center" style="width: 100px">出現頻率</td>
                        <td class="text-center" style="width: 130px">出現機率<br>(出現頻率/${data.length})</td>`;
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
            exp_prob[i][j] = Math.round((codeProb[i]*codeProb[j])*100)/100;
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
            exp_freq[i][j] = Math.round((exp_prob[i][j]*data_Ns.length)*100)/100;
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
            adjusted_Zscore[i][j] = Math.round(((freq[i][j]-exp_freq[i][j])/Math.sqrt(data_Ns.length*exp_prob[i][j]*(1-exp_prob[i][j])))*100)/100;
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
            if (Math.abs(adjusted_Zscore[i][j]) >= 1.96)
                result[5] += `<font style="color: red">${adjusted_Zscore[i][j].toFixed(2)}</font>`;
            else
                result[5] += `${adjusted_Zscore[i][j].toFixed(2)}</td>`;
        }
        result[5] += `</tr>`;
    }
    result[5] += `</table>`;
}

function showResult() {
    var resultItem = ['編碼轉換頻率表', '編碼轉換機率表', '編碼出現頻率與機率表', '編碼轉換期望機率表<br>(First-order model)', '編碼轉換期望頻率表', '調整後Z分數表', '行為轉移關係圖'];
    var str = `<table border=1 class="resulttable">
                    <tr>
                        <th class="resultitem-head">Item</th>
                        <th class="">Result</th>
                    </tr>`;
    for (var i = 0; i < resultItem.length; i++) {
        str += `<tr>
                    <td class="text-center">${resultItem[i]}</td>
                    <td class="text-center">${result[i]}</td>
                </tr>`;
    }
    str += `</table>`;
    $('.result').append(str);
}

var dataObj = [];
function load_Webdisk() {
    $.getJSON("webdisk_inputdata.json", function(data) {
        dataObj = data;
        // for (var i in dataObj) {
        //     console.log(dataObj[i].account);
        // }
    });
}

function load_pigSaviorData(){
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

function selectDatas(){
    var userSelect = document.getElementById("userList");
    var user = userSelect.options[userSelect.selectedIndex].value;
    var sceneSelect = document.getElementById("sceneList");
    var scene = sceneSelect.options[sceneSelect.selectedIndex].value;

    activeData = [];
    for (var i in dataObj){
        if (dataObj[i].user_id == user && dataObj[i].game_scene == scene){
            activeData.push(dataObj[i]);
        }
    }
    // console.log(dataObj);
    console.log(activeData);

    // $.ajax({
    //     type: "POST",
    //     url: "http://163.21.245.192/PigSaviorApp/sequential_analysis/python/selectData.py",
    //     data: { param: "123"}
    // }).done(function(output){
    //     console.log(output);
    // });



}


