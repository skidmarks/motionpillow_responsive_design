/**
 * 패스워드 체크
 *
 */
var PwdCheck = {};

PwdCheck.isShift = false;
PwdCheck.isCapslock = false;
PwdCheck.isError = false;

PwdCheck.checkCapslock = function ($target, e) {
    var myKeyCode = 0;
    var myShiftKey = false;
    if (window.event) { // IE
        myKeyCode = e.keyCode;
        myShiftKey = e.shiftKey;
    } else if (e.which) { // netscape ff opera
        myKeyCode = e.which;
        myShiftKey = isShift;
    }

    if ((myKeyCode >= 65 && myKeyCode <= 90) && !myShiftKey) {

        showMessage($target, "Caps Lock이 켜져있습니다. Caps Lock을 해제해 주세요.");
        return true;

    } else if ((myKeyCode >= 97 && myKeyCode <= 122) && myShiftKey) {
        showMessage($target, "Caps Lock이 켜져있습니다. Caps Lock을 해제해 주세요.");
        return true;
    } else {

        return false;
    }
};

PwdCheck.showMessage = function($target, msg) {

    $target.removeClass('ok').addClass('err');

    if($target.parent().find('.errmsg').length >= 1){
        $target.parent().find('.errmsg').text(msg);
    } else {
        $target.parent().append('<span class="errmsg">'+msg+'</span>');
    }
    $target.focus();
};

PwdCheck.clearMessage = function() {
    $("fieldset .errmsg").remove();
    $("input.err").removeClass('err').addClass('ok');
};


PwdCheck.checkSpace = function(str) {
    if (str.search(/\s/) != -1) {
        return true;
    } else {
        return false;
    }
};

PwdCheck.isValidPasswd = function(str) {

    var cnt = 0;
    if (str == "") {
        return false;
    }

    /* check whether input value is included space or not */
    var retVal = PwdCheck.checkSpace(str);
    if (retVal) {
        return false;
    }
    for (var i = 0; i < str.length; ++i) {
        if (str.charAt(0) == str.substring(i, i + 1))
            ++cnt;
    }
    if (cnt == str.length) {
        return false;
    }

    var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{1,15}$/;
    if (!isPW.test(str)) {
        return false;
    }

    return true;
};

