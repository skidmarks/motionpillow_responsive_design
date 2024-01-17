(function () {
	try {
		window.addEventListener('load', function () {
			setTimeout(scrollTo, 0, 0, 1);
		}, false);
	}
	catch (e) {}	
})();


// 모바일 메뉴
$(function(){
	var $m_menu = $('.hamburger');
	var $m_navi = $('#m_navi');
	$m_menu.on("click", function () {
		var $this = $(this);
		if (!$this.hasClass("is-active")) {
			$this.addClass("is-active");
			$m_navi.show(500);
		}else {
			$this.removeClass("is-active");
			$m_navi.hide(500);
		}
		
	})
});


// 메인 페이지 스크롤 애니메이션
$(function(){
	var $mvisuals = $('.mvisual');

	$mvisuals.first().addClass("mv_animate");

	var $mCnt01 = $('#mCnt01');
	$mCnt01.waypoint(function (direction) {
		if (direction == 'down') {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_01').addClass("mv_animate");
		}else {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_01').addClass("mv_animate");					
		}
	}, {offset:'50%'});

	var $mCnt02 = $('#mCnt02');
	$mCnt02.waypoint(function (direction) {
		if (direction == 'down') {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_02').addClass("mv_animate");
		}else {					
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_01').addClass("mv_animate");
		}
	}, {offset:'50%'});

	var $mCnt03 = $('#mCnt03');
	$mCnt03.waypoint(function (direction) {
		if (direction == 'down') {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_03').addClass("mv_animate");				
		}else {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_02').addClass("mv_animate");					
		}
	}, {offset:'50%'});

	var $mCnt04 = $('#mCnt04');
	$mCnt04.waypoint(function (direction) {
		if (direction == 'down') {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_04').addClass("mv_animate");
		
		}else {					
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_03').addClass("mv_animate");
		}
	}, {offset:'50%'});

	var $mCnt05 = $('#mCnt05');
	$mCnt05.waypoint(function (direction) {
		if (direction == 'down') {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_05').addClass("mv_animate");				
		}else {
			$mvisuals.removeClass("mv_animate");
			$('#mvisual_04').addClass("mv_animate");					
		}
	}, {offset:'50%'});

	// main-visual animation in the mobile device
//	if(Modernizr.touch) {
//		var $mCnt02 = $('#mCnt02');
//		$mCnt02.waypoint(function (direction) {
//			if (direction == 'down') {
//				$('.main_visual').animate({height:"35%"});
//			}else {
//				$('.main_visual').animate({height:"50%"});
//			}
//		}, {offset:'50%'});		
//	}

});

$(function(){
	var $btnOpenMclip = $('#btnOpenMclip');
	var $btnCloseMclip = $('#btnCloseMclip');
	var $mclipLayer = $('#mclipLayer');

	$btnOpenMclip.on('click', function (e) {
		e.preventDefault();
		$mclipLayer.show(500);
	});

	$btnCloseMclip.on('click', function (e) {
		e.preventDefault();
		$mclipLayer.hide(300);
	});
});


