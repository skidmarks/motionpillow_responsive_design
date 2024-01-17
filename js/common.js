/**
 * ContactOn Common Library
 */

var Common = {};

//common initialize
$(function(){
	
	/**
	 * //숫자만 입력 
	 * 사용방법 input tag에 numberOnly 만 추가
	 * <input type="text" numberOnly>
	 */
	 $("input:text[numberOnly]").on("keyup", function() {
		 $(this).val($(this).val().replace(/[^0-9]/g,""));
	 });
	 
	 /**
	 * ,(콤마) 입력 
	 * 사용방법 input tag에 inputComma 만 추가
	 * <input type="text" inputComma>
	 */
	 $("input:text[inputComma]").on("keyup", function() {
		 $(this).val($(this).val().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	 });
	 
    // all input text was trimmed.
    $(document).on('blur', "input[type='text']", function(){
        $(this).val( $.trim($(this).val()) );
    });

	// all input date class was added keyup event
	$(document).on('keypress', "input[type=text].input.date", function(evt){
		var $this = $(this);
		var val = $(this).val();

		if (evt.which != 46) { // if not delete
			if (val.length == 4 || val.length == 7) {
				$this.val( val + ".");
			}
		}
	});

	$.ajaxSetup({
		beforeSend: function(xhr) {
			xhr.setRequestHeader("AJAX", true);
		},
		error: function(xhr, status, err) {
			if (xhr.status == 401) {
				alert("접근 권한이 없습니다. 로그인후 다시 시도해 주세요.");
				location.href = "/";
			} else if (xhr.status == 403) {
				alert("접근 오류가 발생했습니다. 로그인후 다시 시도해 주세요.");
				location.href = "/";
			} else {
				alert("처리중 오류가 발생하였습니다. 잠시후 다시 시도해 주세요.");
			}
		}
	});
	
});

//전 페이지 공통: useragent 구분스크립트
//var device;
Common.UserAgent = navigator.userAgent;
if (Common.UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || Common.UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
	Common.device = "m";
} else {
	Common.device = "pc";
}
$(function(){
	//모바일 기기에서 접속시 별도 처리
	$('body').addClass(Common.device);
});

Common.isArrayDupCheck = function(root, sub) {

	var rootSubConcat = [];
	var el = {};
	var idx = 0;

	// nvl root
	for (idx=0; idx<root.length; idx++) {
		// root 존재시만 concat object array 에 push
		if (!_.isEmpty(root[idx])) {
			el = [ root[idx], sub[idx] ];
			rootSubConcat.push(el);
		}
	}
	
	root = _.map(rootSubConcat, _.first);
	sub = _.compact(_.map(rootSubConcat, _.last)); // nvl sub

	if (root.length == sub.length) {
		//sub 까지 다 입력 된 상태
		var uniq = sub.reduce(function(a,b){
			if (a.indexOf(b) < 0 || b == "") a.push(b);
			return a;
		},[]);
		if (sub.length != uniq.length) {
			// sub 중복
			return false;
		}
	} else {
		var dup = [];
		var uniq = root.reduce(function(a,b){
			if (a.indexOf(b) < 0 ) {
				a.push(b);
			} else {
				dup.push(b);
			}
			return a;
		},[]);

		if (sub.length != _.uniq(sub).length ) {
			// sub 중복
			return false;
		} else if (root.length != uniq.length) {

			var isSingle = true;
			var dupArray = [];

			_.each(dup, function(dupRootval){

				// root 중복 AND 해당 sub가 전체 아닌 존재값이면 중복아님
				dupArray = _.filter(rootSubConcat, function (arr) {
					// 중복인 전체가 들어간 값을 뽑아온다.
					if (arr[0] == dupRootval && (_.isEmpty(arr[1]))) {
						return arr;	 	// 이값이 존재하면 중복이다.
					}
				});

				if (dupArray.length > 0) {
					isSingle = false; //중복됨
				}
			});

			// 중복인 경우 false;
			//root 중복
			return isSingle;
		}
	}
	return true;
};

Common.isIncludePrivate = function (text) {
	//email
	/*console.debug('email ', text.match(/[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/gi),
			!text.match(/[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/gi));

	console.debug('phone ', text.match(/\d{3,4}.\d{4}/gi), !text.match(/\d{3,4}.\d{4}/gi))
*/
	return (!text.match(/[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/gi)
		&& !text.match(/\d{3,4}.\d{4}/gi)
	);
}


/**
 * 공통 콤보생성
 * @param url
 * @param $targetSelect
 * @param valueName
 * @param textName
 * @param firstRow 첫번째 로우
 * @param defaultValue 기본값
 */
Common.loadCombo = function(url, $targetSelect, valueName, textName, firstRow, defaultValue) {

    var dataArr = [];
    var inx = 0;

    textName = textName || "name";
    valueName = valueName || "id";
    defaultValue = defaultValue || "";
    firstRow = firstRow || "";

    $.get(url, function(data){

        $targetSelect.empty();

        if (firstRow !== "") {
            dataArr[inx++] = "<option value=''>" + firstRow + "</option> ";
        }

        $(data).each( function() {
            if (defaultValue === this[valueName]) {
                dataArr[inx++] = "<option value=" + this[valueName] + " selected>" + this[textName] + "</option> ";
            } else {
                dataArr[inx++] = "<option value=" + this[valueName] + ">" + this[textName] + "</option> ";

            }
        });

        $targetSelect.append(dataArr);
        $targetSelect.val(defaultValue);
        $targetSelect.trigger('render');
    });

}


/**
 * input 입력 글자수 제한
 * @param obj (this)
 * @see input type='number'로 선언된 경우 maxlength가 안먹어서 생성, 반드시 maxlength와 같이 사용해야 함
 * @see <input type="number" maxlength="3" oninput="Common.maxLengthCheck(this)"/>
 */
Common.maxLengthCheck = function(obj) {
	if (obj.value.length > obj.maxLength){
		obj.value = obj.value.slice(0, obj.maxLength);
	}
}

/**
 * email check 정규식
 * @param email
 * @see false - 이메일이 아님
 */
Common.checkValidEmail = function(email) {
//var regExp = /^[0-9a-zA-Z]([-_\.+]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[0-9a-zA-Z]$/i;
var regExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	
	if ( !regExp.test(email) ) {
		return false;
	}
	
	return true;
}

/**
 * 에러 메시지 출력
 * @param obj - 에러메시지 출력할 객체
 * @param msg - 출력할 에러 메시지
 */
Common.errorMsg = function(frm, obj, msg) {
	$(frm).find('.err').removeClass('err');
	$(frm).find('.errmsg').remove();
	
	$(obj).removeClass('ok').addClass('err');
	if($(obj).parent().find('.errmsg').length >= 1){
		$(obj).parent().find('.errmsg').text(msg);					
	} else {
		$(obj).parent().append('<span class="errmsg">' + msg + '</span>');
	}
	$(obj).focus();
	return;
}

Common.errorMsg2 = function(frm, obj, msg) {
	$(frm).find('.err').removeClass('err');
	$(frm).find('.errmsg').remove();
	
	$(obj).removeClass('ok').addClass('err');
	if($(obj).parent().find('.errmsg').length >= 1){
		$(obj).parent().find('.errmsg').text(msg);					
	} else {
		$(obj).parent().parent().append('<span class="errmsg">' + msg + '</span>');
	}
	$(obj).focus();
	return;
}

Common.errorMsgAfter = function(frm, obj, focusId, msg) {
	$(frm).find('.err').removeClass('err');
	$(frm).find('.errmsg').remove();
	
	$(obj).removeClass('ok').addClass('err');
	if($(obj).parent().find('.errmsg').length >= 1){
		$(obj).parent().find('.errmsg').text(msg);					
	} else {
		$(obj).after('<span class="errmsg">' + msg + '</span>');
	}
	
	if(focusId != "") {
		$(focusId).focus();
	}
	
	return;
}

Common.errorMsgAfter1 = function(frm, obj, focusId, msg) {
	$(frm).find('.err').removeClass('err');
	$(frm).find('.errmsg').remove();
	
	$(obj).removeClass('ok').addClass('err');
	if($(obj).parent().find('.errmsg').length >= 1){
		$(obj).parent().find('.errmsg').text(msg);					
	} else {
		$(obj).after('<span class="errmsg">' + msg + '</span>');
	}
	
	if(focusId != "") {
		$(focusId).focus();
	}
	
	return;
}

Common.errorMsgHolder = function(frm, obj, holder, msg) {
	$(frm).find('.err').removeClass('err');
	$(frm).find('.errmsg').remove();

	$(holder).removeClass('ok').addClass('err');
	if($(holder).find('.errmsg').length >= 1){
		$(holder).find('.errmsg').text(msg);
	} else {
		$(holder).append('<span class="errmsg">' + msg + '</span>');
	}
	if (obj != null) {
		$(obj).focus();
	}
	return;
}

/**
 * text가 null 일 경우 대체 text 리턴
 * @param text - null check할 text
 * @return 대체 객체
 */
Common.replaceNull = function(text, returnVal) {
	if(text == null) {
		return returnVal;
	}
	
	return text;
}

/**
 * 금액을 한글로 변경
 * @param amt
 * @return 한글 String
 */
Common.amtKorean = function (num) {	
    var hanA = new Array("","1","2","3","4","5","6","7","8","9","10");
    var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
    var result = "";
	for(i=4; i<num.length; i++) {		
		str = "";
		han = hanA[num.charAt(num.length-(i+1))];
		if(han != "")
			str += han+danA[i];
		if(i == 4) str += "만";
		if(i == 8) str += "억";
		if(i == 12) str += "조";
		result = str + result;
	}
	if(num != 0)
		result = result + "원";
    return result ;
}

/**
 * 날짜를 한글로 변경
 * @param 날짜
 * @return 한글 String
 */
Common.dayKorean = function (val) {
	var year = 0;
	var yearStr = "";
	var month = 0;
	var monthStr = "";
	var day = 0;
	var dayStr = "";
	
	if(val / 360 > 1) {
		year = Math.floor(val / 365);
		yearStr = year + "년 ";
		val = val - year * 365;
	}
	
	if(val / 30 >= 1) {
		if(val % 30 > 0) {
			month = (val / 30).toFixed(1);
		} else {
			month = (val / 30);
		}
		val = val - month * 30; 
		
		monthStr = month + "개월";
	}
	
	if(month == 0 && val < 30) {
		day = val;
		dayStr = val + "일";
	}
	
	//return yearStr != '' ? yearStr : '' + monthStr != '' ? monthStr : '' + dayStr != '' ? dayStr : '';
	return yearStr + monthStr + dayStr;
}

/**
 * 숫자 3자리마다 콤마 추가
 * @param 숫자
 * @return 콤마 추가한 string 형태
 */
Common.numberWithCommas = function(x) {
	x = x + "";
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * D-day 계산
 * @param date
 * @return D - xx일
 */
Common.dDay = function(date, str) {
	var closeDt = date.replace(/-/gi, "");

	var chgDt = closeDt.substring(0, 4) + '-' + closeDt.substring(4, 6) + '-' + closeDt.substring(6, 8);
	var cnt = DateUtil.getDateDiff(chgDt, DateUtil.getToday());
	var text = "";
	if(cnt == 0) {
		text = "당일 마감";
	} else if(cnt > 0) {
		text = "마감 " + cnt + str;
	} else {
		text = "모집 마감";
	}
	
	return text;
}

Common.formatPhone = function(phoneNo) {
	return phoneNo.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
};

Common.number_chk = function(obj){
	var val = obj.value.replace(/,/g, "").replace(/-/g, "");
	var val2 = val.substr(0, 1);
	var val3 = val.length;
	if(val2 == 0){
		val = val.substr(1, val3);
	}
	obj.value = Common.num_format(val);
}
Common.num_format = function(n){
	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n = String(n);    //숫자 -> 문자변환
	while(reg.test(n)){
		n = n.replace(reg, "$1" + "," + "$2");
	}
	return n;
}

Common.randomVal = function() {
	return Math.floor(Math.random() * 10000000) + 1;
}

Common.setDateFormat = function(dt, delimeter) {
	var formattedDt = dt.replace(/,/g, "").replace(/-/g, "");
	if (dt == null || dt == "") {
		return;
	}
	return formattedDt.substring(0, 4) + delimeter + formattedDt.substring(4, 6) + delimeter + formattedDt.substring(6, 8);
}

Common.replaceAll = function(str, org, dest) {
	return str.split(org).join(dest);
}

Common.dateFormat = function(x, y) {
	var z = {
		M: x.getMonth() + 1,
		d: x.getDate(),
		h: x.getHours(),
		m: x.getMinutes(),
		s: x.getSeconds()
	};
	y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
		return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
	});

	return y.replace(/(y+)/g, function(v) {
		return x.getFullYear().toString().slice(-v.length)
	});
}

Common.phone_format = function(num){
	return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

Common.setDateValidation = function(obj) {
	var thisId = $(obj).prop("id");
	var startVal = $(obj).val();
	
	$(obj).parent().parent().find(".date").each(function() {
		if($(this).prop("id") != thisId) {
			$(this).datepicker( "option", "minDate", startVal );
		}
	})
}

Common.setDateValidation3Depth = function(obj) {
	var thisId = $(obj).prop("id");
	var startVal = $(obj).val();
	
	$(obj).parent().parent().parent().find(".date").each(function() {
		if($(this).prop("id") != thisId) {
			$(this).datepicker( "option", "minDate", startVal );
		}
	})
}

/**
 * file download
 */
Common.fileDownload = function(keyFileName, orgFileName) {
	// Remove for android
	// var $form = $("<form method='post' action='/user/download.do'></form>");
	// $form.append('<input type="hidden" name="keyFileName" value="'+keyFileName+'">');
	// $form.append('<input type="hidden" name="orgFileName" value="'+orgFileName+'">');
	// $form.appendTo('body').submit().remove();

	var actionString = "/user/download.do?keyFileName=" + encodeURIComponent(keyFileName) + "&orgFileName=" + encodeURIComponent(orgFileName);
	location.href = actionString;

};

Common.toggleCheckBox = function(obj, checkboxName) {
	//클릭되었으면
    if($(obj).prop("checked")){
        //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
        $("input[name=" + checkboxName + "]").prop("checked",true);
        //클릭이 안되있으면
    }else{
        //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
        $("input[name=" + checkboxName + "]").prop("checked",false);
    }
}

Common.setCheckAll = function(checkAllName, checkboxName) {
	var checkCnt = 0;
	
	$("input[name=" + checkboxName + "]").each(function() {
		if(!$(this).is(":checked")) {
			$("input[name=" + checkAllName + "]").prop("checked", false);
			return;
		} else {
			checkCnt++;
		}
	});
	
	if($("input[name=" + checkboxName + "]").length == checkCnt) {
		$("input[name=" + checkAllName + "]").prop("checked", true);
	}
}

Common.htmlEntityEnc = function(str){
    if(str == "" || str == null){
        return str;
    }
    else{
        /*return str.replace("&", "&amp;").replace("#", "&#35;").replace("<", "&lt;").replace(">", "&gt;").replace(/"/g, "&quot;").replace('\\', "&#39;").replace('%', "&#37;").replace('(', "&#40;").replace(')', "&#41;").replace('+', "&#43;").replace('/', "&#47;").replace('.', "&#46;");*/
    	return String(str).replace("/&/g", "&amp;").replace("/</g", "&lt;").replace("/>/g", "&gt;").replace("/”/g", "&quot;"); 
    }
}

Common.htmlEntityDec = function(str){
    if(str == "" || str == null){
        return str;
    }
    else{
        /*return str.replace("&", "&amp;").replace("#", "&#35;").replace("<", "&lt;").replace(">", "&gt;").replace(/"/g, "&quot;").replace('\\', "&#39;").replace('%', "&#37;").replace('(', "&#40;").replace(')', "&#41;").replace('+', "&#43;").replace('/', "&#47;").replace('.', "&#46;");*/
    	//return String(str).replace("/&/g", "&amp;").replace("/</g", "&lt;").replace("/>/g", "&gt;").replace("/”/g", "&quot;");
    	
    	str = Common.replaceAll(str, "&amp;", "&");
    	str = Common.replaceAll(str, "&lt;", "<");
    	str = Common.replaceAll(str, "&gt;", ">");
    	str = Common.replaceAll(str, "&quot;", "\"");
    	//str = Common.replaceAll(str, "\n\r", "<br/>");
    	
    	return str;
    }
}

/**
 * add onkeyPress="Common.inputOnlyNumber(this);"
 * @param obj
 * @returns {boolean}
 */
Common.inputOnlyNumber = function(obj) {
	if (event.keyCode >= 48 && event.keyCode <= 57) { //숫자키만 입력
		return true;
	} else {
		event.returnValue = false;
	}
};

Common.setAmt = function(amt) {
	console.log("amt : ", amt + ", replace : ", amt.substring(0, amt.length - 4));
	var amt = amt.substring(0, amt.length - 4);
	
	return Common.numberWithCommas(amt + "") + " 만원";
}