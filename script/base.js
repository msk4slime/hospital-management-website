// --------------------------------------------------

function get_date(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var vardate =  dd + '/' + mm + '/' + yyyy;
    return vardate;
}

function get_time(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    if (h < 10) {
        h = '0' + h
    }
    if (m < 10) {
        m = '0' + m
    }
    var vartime = h + 'h' + m;
    return vartime;
}