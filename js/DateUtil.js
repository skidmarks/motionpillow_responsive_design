/**
 * ContactOn Common Library
 */

var DateUtil = {};

//common initialize
$(function(){

    // all input text was trimmed.
    $(document).on('blur', "input[type='text']", function(){
        $(this).val( $.trim($(this).val()) );
    });

});


/**
 * 날짜간 차이를 계산
 * @param1 시작날짜
 * @param2 종료날짜
 * @return cnt
 */
DateUtil.getDateDiff = function(date1,date2) {
	
	console.log("date1 : ", date1 + ", date2 : ", date2);
	
    var arrDate1 = date1.split("-");
    var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
    var arrDate2 = date2.split("-");
    var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
    
    var getDiffTime = getDate1.getTime() - getDate2.getTime();
    
    return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}

DateUtil.getDateDiffWithDelimeter = function(date1,date2, delimeter) {
	
	console.log("date1 : ", date1 + ", date2 : ", date2);
	
    var arrDate1 = date1.split(delimeter);
    var getDate1 = new Date(parseInt(arrDate1[0]),parseInt(arrDate1[1])-1,parseInt(arrDate1[2]));
    var arrDate2 = date2.split(delimeter);
    var getDate2 = new Date(parseInt(arrDate2[0]),parseInt(arrDate2[1])-1,parseInt(arrDate2[2]));
    
    var getDiffTime = getDate1.getTime() - getDate2.getTime();
    
    return Math.floor(getDiffTime / (1000 * 60 * 60 * 24));
}

/**
 * 현재 월
 * @return string
 */
DateUtil.getMonth = function() {
	var now = new Date();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    
    return mon;
}

/**
 * 현재 년도
 * @return string
 */
DateUtil.getYear = function() {
	var now = new Date();
    var year= now.getFullYear();
    
    return year;
}

/**
 * 현재 날짜
 * @return string
 */
DateUtil.getDay = function() {
	var now = new Date();
	var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
	
	return day;
}

/**
 * 오늘 날짜 계산
 * @return string
 */
DateUtil.getToday = function() {
	var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
            
    var chan_val = year + '-' + mon + '-' + day;
    
    return chan_val;
}

/**
 * 오늘 날짜 계산
 * @return string
 */
DateUtil.getTodayWithDelimeter = function(delimeter) {
	var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
            
    var chan_val = year + delimeter + mon + delimeter + day;
    
    return chan_val;
}

/**
 * String 형태의 날짜를 Date형태로 변경
 * @param String 형태 날짜(yyyymmdd)
 * @return string
 */
DateUtil.toTimeObject = function(time) { //parseTime(time)
	time = time.split("-").join("");
    var year  = time.substr(0,4);
    var month = time.substr(4,2) - 1; // 1월=0,12월=11
    var day   = time.substr(6,2);

    return new Date(year,month,day);
}

/**
 * 날짜 연산
 * @param1 연산 할 날짜(date형태)
 * @param2 y - 연산 할 년도 수
 * @param3 m - 연산 할 월 수
 * @param4 d - 연산 할 일 수
 * @return string
 */
DateUtil.getDateAdd = function(time, y, m, d) {
    var date = toTimeObject(time);

    date.setFullYear(date.getFullYear() + y); //y년을 더함
    date.setMonth(date.getMonth() + m);       //m월을 더함
    date.setDate(date.getDate() + d);         //d일을 더함

    return toTimeString(date);
}

