var dataObj = [];
function load_WebdiskData() {
    $('#timeList_webdisk').empty();
    $('#userList_webdisk').empty();
    $('.showDataInfo_webdisk').empty();
    $('.result_webdisk').empty();
    
    $.getJSON("webdisk_inputdata.json", function(data) {
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
        $('#timeList_webdisk').append(timelist);
        for (var i in users)
            userlist += "<option value = "+users[i]+">"+users[i]+"</option>";
        $('#userList_webdisk').append(userlist);
    });
}

$('#timeList_webdisk').on('change', function() {
    $('#userList_webdisk').empty();
    var chooseYear = $('#timeList_webdisk').val();
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
    $('#userList_webdisk').append(userlist);
});

function select_webdiskData(){
    $('.showDataInfo_webdisk').empty();
    $('.result_webdisk').empty();

    var time = $('#timeList_webdisk').val();
    var user = $('#userList_webdisk').val();
    // console.log(user);

    data = '';
    for (var i in dataObj) {
        if (dataObj[i].schoolYear == time && dataObj[i].account == user)
            data += dataObj[i].code;
    }
    console.log(data);

    codes = ['A', 'B', 'C', 'D'];
    behaviors = ['使用模擬器', '進行測驗', '看PPT', '看影片'];
    canvasId = "fsmCanvas_webdisk";
    calculate_Z(data);
    showResult();
    $('.showDataInfo_webdisk').append(`<div class="stepTitle">Results</div>`+dataInfoStr);
    $('.result_webdisk').append(resultStr);
}