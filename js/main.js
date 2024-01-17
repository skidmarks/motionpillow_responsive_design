
var prugioMain = (function(w,d,$){
	var $winWidth =$(window).width(), $winHeight =$(window).height();
	var $contianer = $("#container"), $intro = $(".intro"), $introMonthTxt = $intro.find(".month_txt");
	var $articleArea = $("#article_area"), $articleWrap = $("#article_wrap"), $articleSec = $articleArea.find(".sec"), $articleTab = $(".article_tab").find("a");
	var $footer = $("#footer");
	var $viewLayer = $("#view_layer"), $viewer = $("#viewer"), $prevArticle = $("#prev_article"), $nextArticle = $("#next_article");
	var $viewFacebook = $("#sns_facebook"), $viewTwitter = $("#sns_twitter"), $viewKakao = $("#sns_kakaostory");
	var time = "slow", easing = "easeInOutQuart";
	var articleHeight = [{},{},{}], articleHeight1, articleHeight2, articleHeight3;
	var stream = {mp3: "sound/healing_201703.mp3"}, ready = false;
	var articleLength = prugioArticle.length;
	var scrollEvent = function(y,p){
		var scrollT = y, p = mCustomScrollbar ? p : (y / (articleHeight1 + articleHeight2 + articleHeight3)) * 100;
		if(scrollT >= articleHeight[0].startOffsetY && scrollT <= articleHeight[0].endOffsetY){
			$articleTab.eq(0).addClass("on").siblings().removeClass("on");
			$introMonthTxt.removeClass("colorChange");
			!$intro.find(".cont1").is(".view") && $intro.find(".cont1").stop().addClass("view").animate({"opacity" : 1}, time, easing);
			$intro.find(".cont2").is(".view") && $intro.find(".cont2").stop().removeClass("view").animate({"opacity" : 0}, time, easing);
			$intro.find(".cont3").is(".view") && $intro.find(".cont3").stop().removeClass("view").animate({"opacity" : 0}, time, easing);
		};
		if(scrollT >= articleHeight[1].startOffsetY && scrollT <= articleHeight[1].endOffsetY){
			$articleTab.eq(1).addClass("on").siblings().removeClass("on");
			$introMonthTxt.removeClass("colorChange");
			$intro.find(".cont1").is(".view") && $intro.find(".cont1").stop().removeClass("view").animate({"opacity" : 0}, time, easing);
			!$intro.find(".cont2").is(".view") && $intro.find(".cont2").stop().addClass("view").animate({"opacity" : 1}, time, easing);
			$intro.find(".cont3").is(".view") && $intro.find(".cont3").stop().removeClass("view").animate({"opacity" : 0}, time, easing);
		};
		if((scrollT >= articleHeight[2].startOffsetY && scrollT <= articleHeight[2].endOffsetY) || p > 90){
			$articleTab.eq(2).addClass("on").siblings().removeClass("on");
			$introMonthTxt.addClass("colorChange");
			$intro.find(".cont1").is(".view") && $intro.find(".cont1").stop().removeClass("view").animate({"opacity" : 0}, time, easing);
			$intro.find(".cont2").is(".view") && $intro.find(".cont2").stop().removeClass("view").animate({"opacity" : 0}, time, easing);
			!$intro.find(".cont3").is(".view") && $intro.find(".cont3").stop().addClass("view").animate({"opacity" : 1}, time, easing);
		};
	};

	var articleOffset = function(){
		articleHeight1 = $articleSec.eq(0).innerHeight();
		articleHeight2 = $articleSec.eq(1).innerHeight();
		articleHeight3 = $articleSec.eq(2).innerHeight();
		articleHeight[0].startOffsetY = 0;
		articleHeight[0].endOffsetY = articleHeight1;
		articleHeight[1].startOffsetY = articleHeight1;
		articleHeight[1].endOffsetY = articleHeight1 + articleHeight2;
		articleHeight[2].startOffsetY = articleHeight1 + articleHeight2;
		articleHeight[2].endOffsetY = articleHeight1 + articleHeight2 + articleHeight3;
	};

	$intro.find(".txt1").delay(1000).animate({"top" : "30%"}, 1500, function(){
		$intro.find(".txt2").animate({"top" : "45%", "opacity" : 1}, 1000);
		$intro.find(".btn_healing_view").animate({"left" : "22%", "opacity" : 1}, 1000);
	});

	w.onload = function(){
		$(w).resize(function(){
			if($winWidth > 768){
				$intro.find(".cont2").animate({"opacity":0},0,function(){
					$(this).show();
				});
				$intro.find(".cont3").animate({"opacity":0},0,function(){
					$(this).show();
				});
				$intro.animate({"left" : 0});
				$(".main_healing").animate({"left" : "33.3%"});
				$articleArea.animate({"left" : "33.3%"});
			}
			$winHeight = $(this).height();
			articleOffset();
			$articleWrap.mCustomScrollbar("update");
		}).trigger("resize");
	};

	articleOffset();

	$articleWrap.on("scroll",function(){
		scrollEvent($(this).scrollTop());
	});

	$articleTab.each(function(index,item){
		$(item).click(function(e){
			e.preventDefault();
			if(!$(this).is(".on")){
				if(mCustomScrollbar){
					$articleWrap.mCustomScrollbar("scrollTo",articleHeight[index].startOffsetY);
				}else{
					$articleWrap.stop().animate({"scrollTop" : articleHeight[index].startOffsetY});
				};
			};
		});
	});

	$articleWrap.mCustomScrollbar({
		theme:"minimal-dark",
		scrollInertia : 500,
		callbacks : {
			onInit : function(){
				$articleWrap.off("scroll");
			},
			whileScrolling : function(e){
				scrollEvent(Math.abs(this.mcs.top),this.mcs.topPct);
			}
		}
	});

//	$viewLayer.scroll(function(){
//		var scrollT = $(this).scrollTop();
//		if($(".bot_banner").length){
//			if($(w).width() > 900){
//				var st = (scrollT / $viewer.height()) * 100;
//				if(st >= 65){
//					!$(".bot_banner").is(".on") && $(".bot_banner").css({"bottom":-500}).addClass("on").animate({"bottom":0},2000).find(".btn_banner_close").click(function(e){
//						e.preventDefault();
//						$(this).closest(".bot_banner").addClass("off");
//					});
//				};
//			};
//		};
//		if(scrollT >= 40){
//			$viewLayer.addClass("fixed");
//		}else{
//			$viewLayer.removeClass("fixed");
//		};
//	});
	
	return {
		setCookie : function(){
			var scrollTop = mCustomScrollbar ? Math.abs($articleWrap[0].mcs.top) : $articleWrap.scrollTop();
			var today = new Date();
			today.setDate(today.getDate() + 1);
			document.cookie = "PrugioScrollTop=" + escape(scrollTop) + "; path=/; expires=" + today.toGMTString() + ";";
			return true;
		},
		getCookie : function(){
			var cookieName = "PrugioScrollTop=";
			var cookieData = document.cookie;
			var start = cookieData.indexOf(cookieName);
			var cookieValue = '';
			if(start != -1){
				start += cookieName.length;
				var end = cookieData.indexOf(';', start);
				if(end == -1) end = cookieData.length;
				cookieValue = cookieData.substring(start, end);
			};
			return unescape(cookieValue);
		},
		deleteCookie : function(){
			var expireDate = new Date();
			expireDate.setDate( expireDate.getDate() - 1 );
			document.cookie = "PrugioScrollTop=" + "; expires=" + expireDate.toGMTString() + "; path=/";
		},
		articleSetting : function(pageName){
			$.each(prugioArticle,function(index,item){
				$.each(prugioArticle[index],function(i,t){
					if(t === pageName){
						if(index - 1 < 0) var prevIndex = articleLength - 1;
						else var prevIndex = index - 1;
						$prevArticle.attr("href",prugioArticle[prevIndex].article);
						if(index + 1 >= articleLength) var nextIndex = 0;
						else var nextIndex = index + 1;
						$nextArticle.attr("href",prugioArticle[nextIndex].article);
						var href = location.href;
						var splitHref = href.split("/");
						splitHref = splitHref.slice(0,splitHref.length-1).join("/") + "/";
						$("#article_event_link").click(function(e){
							if($.support.pjax){
								window.history.replaceState(null, "", splitHref + "main.asp");
								window.location.replace(splitHref + pageName + "#eventLink");
							}else{
								$(this).attr({"href":splitHref + pageName + "#eventLink"});
							};
						});
						$viewFacebook.attr("data-url",splitHref + pageName);
						$viewTwitter.attr("data-url",splitHref + pageName);
						$viewKakao.attr({"data-url":splitHref + pageName, "data-title":prugioArticle[index].title});
						return false;
					};
				});
			});
		},
		indexHash : function(pageName){
			var $self = this;
			if(pageName === ""){
				//ga('set', 'location', w.location.href);
				//ga('send', 'pageview');
				if(mCustomScrollbar){
					$articleWrap.mCustomScrollbar("scrollTo",$self.getCookie());
				}else{
					$articleWrap.scrollTop($self.getCookie());
				};
				$("body").removeClass("on");
				$viewLayer.removeClass("on");
				$viewer.html("");
				$self.deleteCookie();
			}else{
				$.ajax({
					url : pageName,
					dataType : "html",
					beforeSend : function(){
						prugioWebzine.blockUI();
					},
					success : function(data){
						var href = w.location.href;
						var splitHref = href.split("/");
						splitHref = splitHref.slice(0,splitHref.length-1).join("/");
						//ga('set', 'location', splitHref + "/" + pageName);
						//ga('send', 'pageview');
						var $obj = $(data);
						$viewer.html($obj.find("#container"));
						$self.articleSetting(pageName);
						var subTitleArea = $viewer.find(".sub_tit1").innerWidth();
						var subText = $viewer.find(".tit1_txt").innerWidth();
						$viewer.find(".visual_bar").css("width", (subTitleArea - subText)/2);
						$("body").addClass("on");
						$viewLayer.addClass("on").scrollTop(0);

						prugioWebzine.unblockUI();
					},
					error : function(jqXHR, textStatus, errorThrown){
						console.log(errorThrown);
					}
				});
			};
		},
		init : function(){
			var $self = this;
			if($.support.pjax){
				$(d).pjax(".layer_article", {
					container : "#viewer",
					fragment : "#container",
					dataType : "html",
					scrollTo : false,
				}).on("pjax:beforeSend",function(xhr, options){
					prugioWebzine.blockUI();
				}).on("pjax:popstate", function(e){
					var href = w.location.href;
					var pageName = href.split("/");
					pageName = pageName[pageName.length-1];
					//ga('set', 'location', href);
					//ga('send', 'pageview');
					if(pageName === "main.asp"){
						$("body").removeClass("on");
						$viewLayer.removeClass("on");
						$viewer.html("");
					};
				}).on("pjax:complete", function(e,r,t,y){
					var href = w.location.href;
					var pageName = href.split("/");
					pageName = pageName[pageName.length-1];
					//ga('set', 'location', href);
					//ga('send', 'pageview');
					$self.articleSetting(pageName);
					$("body").addClass("on");
					$viewLayer.addClass("on").scrollTop(0);
					var subTitleArea = $viewer.find(".sub_tit1").innerWidth();
					var subText = $viewer.find(".tit1_txt").innerWidth();
					$viewer.find(".visual_bar").css("width", (subTitleArea - subText)/2);
					prugioWebzine.unblockUI();
				}).on("pjax:error",function(xhr, textStatus, error, options){
					console.log(xhr);
					console.log(textStatus);
					console.log(error);
					console.log(options);
				}).on('click', '#view_close', function(e){
					e.preventDefault();
					history.replaceState({}, "main", "main.asp");
					$(d).trigger("pjax:popstate");
				});
				$("#view_logo").click(function(e){
					e.preventDefault();
					$("#view_close").trigger("click");
				});
			}else{
				$(w).on("hashchange",function(e){
					var _hash = window.location.hash;
					$self.indexHash(_hash.replace(/\#/,""));
				}).trigger("hashchange");
				$("#view_close").click(function(e){
					e.preventDefault();
					location.replace("#");
				});
				$("#view_logo").click(function(e){
					e.preventDefault();
					$("#view_close").trigger("click");
				});
				$(d).on("click",".layer_article",function(e){
					e.preventDefault();
					var href = $(this).attr("href");
					var pageName = href.split("/");
					pageName = pageName[pageName.length-1];
					location.href = "#" + pageName;
					if($(this).parent().is("li")){
						$self.setCookie();
					};
				});
			};
		}
	}
})(window,document,jQuery);
prugioMain.init();