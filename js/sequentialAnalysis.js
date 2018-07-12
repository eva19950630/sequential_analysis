// user input code
var code_id = 1;
var codes = [];
var behaviors = [];
var data = '';

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
        codes.push(element.value);
    });
    $('.behaviorinput').each(function(index, element) {
        behaviors.push(element.value);
    });
    console.log(codes);
    console.log(behaviors);

    var str = `<table border=1 class="codetable">
                    <tr>
                        <th class="codeitems-head">Code</th>
                        <th class="behavioritems-head">Behavior</th>
                    </tr>`; 
    for (var i = 0; i < codes.length; i++) {
        str += `<tr>
                    <td class="codeitems">${codes[i]}</td>
                    <td class="behavioritems">${behaviors[i]}</td>
                </tr>`;
    }
    str += `</table>`;
    $('.showCodeInfo').append(str);
});

$('#finishPreparingData').click(function() {
    data = $('.datainput').val();
    calculate_Z(data);

    var str = `<li>Data sample: ${data}</li>
                <li>Total codes: ${data.length}</li>`;
    $('.dataInfoList').append(str);

    // var freq = new Array(codes.length);
    // for (var i = 0; i < codes.length; i++) {
    //     freq[i] = new Array(codes.length);
    // }
    // for (var i = 0; i < codes.length; i++) {
    //     for (var j = 0; j < codes.length; j++) {
    //         freq[i][j] = i+j;
    //         console.log(freq[i][j]);
    //     }
    // }

});

function calculate_Z(data_N) {
    console.log(data_N);
    var data_Ns = [];
    for (var i = 0; i < data_N.length-1; i++)
        data_Ns[i] = data_N.substring(i, i+2);

    for (var i = 0; i < data_Ns.length; i++)
        console.log(data_Ns[i]);
}

var dataObj = [];
function load_Webdisk() {
    $.getJSON("webdisk_inputdata.json", function(data) {
        dataObj = data;
        // for (var i in dataObj) {
            // console.log(dataObj[i].account);
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


