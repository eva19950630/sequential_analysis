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
