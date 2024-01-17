(function () {
	try {
		window.addEventListener('load', function () {
			setTimeout(scrollTo, 0, 0, 1);
		}, false);
	}
	catch (e) {}	
})();


$(function(){
	var $mMenu = $('.m_menu').find(".hamburger");
	var $mMenuIn = $('.mmenu_in').find(".hamburger");
	var $m_navi = $('#m_navi');

	$mMenu.on("click", function () {
		$m_navi.show().animate({"left":0});
	});

	$mMenuIn.on("click", function () {
		$m_navi.animate({"left":"-60%"}, function () {
			$m_navi.hide();
		});
	});
});

//mobile header fixed.
//$(function(){
//	if(Modernizr.touch) {
//		
//		// mobile device check
//		console.log(Modernizr.touch);
//
//		var navOffset = $('.altFixed').offset().top;
//		$(window).scroll(function(){
//			var scrollPos = $(window).scrollTop();
//
//			if (scrollPos >= (navOffset + 2)) {
//				$('.m_header').addClass("fixed");
//			}else {
//				$('.m_header').removeClass("fixed");
//			}
//		});
//	}
//});				

						