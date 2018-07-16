var dataObj = [];
function load_pigSaviorData(option){
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
        document.getElementById('userList_pigsavior').innerHTML = userlist;
        for (var i in scenes){
            scenelist += "<option value = "+scenes[i]+">"+scenes[i]+"</option>";
        }
        document.getElementById('sceneList_pigsavior').innerHTML = scenelist;
        
        // switch (option) {
        //     // single user
        //     case 0:
        //         userlist = "", scenelist = "";
        //         for (var i in users){
        //             // console.log(users[i]);
        //             userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        //         }
        //         document.getElementById('userList_pigsavior').innerHTML = userlist;
        //         for (var i in scenes){
        //             scenelist += "<option value = "+scenes[i]+">"+scenes[i]+"</option>";
        //         }
        //         document.getElementById('sceneList_pigsavior').innerHTML = scenelist;
        //         break;
        //     // group user
        //     case 1:
        //         scenelist = "";
        //         for (var i in scenes){
        //             scenelist += "<option value = "+scenes[i]+">"+scenes[i]+"</option>";
        //         }
        //         document.getElementById('sceneList_pigsavior_group').innerHTML = scenelist;
        //         break;
        // }
    });
}

function select_pigSaviorGroupScene () {
    var sceneSelect = $('#sceneList_pigsavior_group').val();

    var rankUsers = [];
    rankUsers[0] = {"userid": ['38', '33', '86', '7', '90', '81', '103', '59', '29', '13', '104', '37', '91', '25', '24', '107', '105', '88', '75', '68', '67', '49', '35', '23', '95', '43', '20', '8', '112', '110', '100']};
    rankUsers[1] = {"userid": ['83', '74', '61', '42', '115', '93', '65', '58', '39', '22', '11', '102', '92', '63', '28', '111', '84', '79', '73', '106', '66', '64', '56', '32', '78', '60', '51', '10', '3', '94', '55', '48', '40', '16', '69', '46', '30', '41', '9', '98', '82', '76', '47', '27', '21', '19', '109', '12', '101']};
    rankUsers[2] = {"userid": ['26', '15', '5', '108', '87', '70', '14', '44', '17', '6', '77', '62', '50', '97', '80', '54', '31', '57', '85', '71', '36', '113', '45', '34', '18', '99', '53', '96', '52', '114', '89']};
    var rankUsers_scoreZ = new Array(3);
    for (var i = 0; i < 3; i++)
        rankUsers_scoreZ[i] = new Array(rankUsers[i].userid.length);

    codes = [];
    behaviors = [];
    data = '';

    for (var rank in rankUsers) {
        for (var i in rankUsers[rank].userid) {
            for (var j in dataObj) {
                if (rankUsers[rank].userid[i] == dataObj[j].user_id && dataObj[j].game_scene == sceneSelect) {
                    if(!behaviors.includes(dataObj[j].target)){
                        behaviors.push(dataObj[j].target);
                        data += CODE[behaviors.length-1];
                        codes.push(CODE[behaviors.length-1]);
                    }else{
                        for(z = 0; z < behaviors.length; z++){
                            if(behaviors[z] == dataObj[j].target){
                                data += CODE[z];
                                break;
                            }
                        }
                    }
                }
            }
            rankUsers_scoreZ[rank][i] = calculate_Z(data);
        }
    }
    console.log(rankUsers_scoreZ);
    calGroupAverage(rankUsers_scoreZ, codes.length);
}

function select_pigSaviorData(){
    $('.showDataInfo_pigsavior').empty();
    $('.result_pigsavior').empty();

    var userSelect = document.getElementById("userList_pigsavior");
    var user = userSelect.options[userSelect.selectedIndex].value;
    var sceneSelect = document.getElementById("sceneList_pigsavior");
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

    canvasId = "fsmCanvas_pigsavior";
    calculate_Z(data);
    showResult();
    $('.showDataInfo_pigsavior').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_pigsavior').append(resultStr);
}