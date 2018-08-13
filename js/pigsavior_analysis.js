var dataObj = [];
// NPC
function load_pigSaviorNPCData() {
    $('.showDataInfo_pigsavior_npc').empty();
    $('.result_pigsavior_npc').empty();

    $.getJSON("pigSavior_NPC.json", function(data){
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
        for (var i in users)
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        for (var i in scenes)
            scenelist += "<option value = "+scenes[i]+">"+scenes[i]+"</option>";

        document.getElementById('userList_pigsavior_npc').innerHTML = userlist;
        document.getElementById('sceneList_pigsavior_npc').innerHTML = scenelist;
    });
}

function select_pigSaviorNPCData() {
    $('.showDataInfo_pigsavior_npc').empty();
    $('.result_pigsavior_npc').empty();

    var userSelect = document.getElementById("userList_pigsavior_npc");
    var user = userSelect.options[userSelect.selectedIndex].value;
    var sceneSelect = document.getElementById("sceneList_pigsavior_npc");
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

    canvasId = "fsmCanvas_pigsaviorNPC";
    calculate_Z(data);
    showResult();
    $('.showDataInfo_pigsavior_npc').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_pigsavior_npc').append(resultStr);
}

// MATH
function load_pigSaviorMathData() {
    $('.showDataInfo_pigsavior_mis').empty();
    $('.result_pigsavior_mis').empty();

    $.getJSON("pigSavior_MATH.json", function(data){
        dataObj = data;
        var users = [], scenes = [];
        for (var i in dataObj){
            if(!users.includes(dataObj[i].user_id)){
                users.push(dataObj[i].user_id);
            }
            // if(!scenes.includes("Stage"+dataObj[i].game_stage)){
            //     scenes.push("Stage"+dataObj[i].game_stage);
            // }
        }
        users.sort((a, b) => a - b);
        // scenes.sort((a, b) => a.slice(5)-b.slice(5));

        userlist = "", scenelist = "";
        for (var i in users)
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        // for (var i in scenes)
        //     scenelist += "<option value = "+scenes[i]+">"+scenes[i]+"</option>";

        // scenelist += "<option value = 'allStage'>All Stages</option>";

        document.getElementById('userList_pigsavior_math').innerHTML = userlist;
        // document.getElementById('sceneList_pigsavior_npc_math').innerHTML = scenelist;
    });
}

function select_pigSaviorMisResult () {
    $('.showDataInfo_pigsavior_mis').empty();
    $('.result_pigsavior_mis').empty();

    var userSelect = $('#userList_pigsavior_math').val();
    // var sceneSelect = $('#sceneList_pigsavior_npc_math').val().substr(5);
    // var conditionSelect = $('input[name=mathCondition]:checked').val();
    // console.log(userSelect + " " + sceneSelect + " " + conditionSelect);

    codes = [];
    behaviors = [];
    tmpMis = [];
    misName = ['運算規則：括號尚未優先處理', '運算規則：沒有先乘除後加減', '運算規則：沒有由左而右計算', '運算過程：答案對，但計算過程錯誤', '運算過程：計算錯誤', '運算符號：加減號互換', '運算符號：加乘號互換', '運算符號：乘除號互換', '運算符號：減除號互換'];
    data = '';
    for (var i in dataObj) {
        var filter = dataObj[i].misconception.substr(0, 1);
        if (dataObj[i].user_id == userSelect && dataObj[i].isCorrect == "False" && filter == "m") {
            // console.log(dataObj[i].misconception);
            if (dataObj[i].misconception.length == 5)
                tmpMis.push(dataObj[i].misconception);
            else {
                for (var j = 0; j < dataObj[i].misconception.length; j+=5)
                    tmpMis.push(dataObj[i].misconception.substr(j, j+5));
            }
        }
    }
    for (var i in tmpMis) {
        if(!behaviors.includes(tmpMis[i])){
            behaviors.push(tmpMis[i]);
            data += CODE[behaviors.length-1];
            codes.push(CODE[behaviors.length-1]);
        }else{
            for(j = 0; j < behaviors.length; j++){
                if(behaviors[j] == tmpMis[i]){
                    data += CODE[j];
                    break;
                }
            }
        }
    }

    for (var i in behaviors)
        behaviors[i] = misName[(behaviors[i].substr(-1))-1];

    // console.log(tmpMis);
    // console.log(data);
    // console.log(behaviors);

    canvasId = "fsmCanvas_pigsaviorMIS";
    calculate_Z(data);
    showResult();
    $('.showDataInfo_pigsavior_mis').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_pigsavior_mis').append(resultStr);
}

// var rankUsers = [];
// rankUsers[0] = {"userid": ['38', '33', '86', '7', '90', '81', '103', '59', '29', '13', '104', '37', '91', '25', '24', '107', '105', '88', '75', '68', '67', '49', '35', '23', '95', '43', '20', '8', '112', '110', '100']};
// rankUsers[1] = {"userid": ['83', '74', '61', '42', '115', '93', '65', '58', '39', '22', '11', '102', '92', '63', '28', '111', '84', '79', '73', '106', '66', '64', '56', '32', '78', '60', '51', '10', '3', '94', '55', '48', '40', '16', '69', '46', '30', '41', '9', '98', '82', '76', '47', '27', '21', '19', '109', '12', '101']};
// rankUsers[2] = {"userid": ['26', '15', '5', '108', '87', '70', '14', '44', '17', '6', '77', '62', '50', '97', '80', '54', '31', '57', '85', '71', '36', '113', '45', '34', '18', '99', '53', '96', '52', '114', '89']};