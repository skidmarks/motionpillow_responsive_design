(function () {
	try {
		window.addEventListener('load', function () {
			setTimeout(scrollTo, 0, 0, 1);
		}, false);
	}
	catch (e) {}	
})();


//유튜브 자동재생 자동멈춤
var vId;
$(function(){
	
	var $btnOpenMclip = $('#btnOpenMclip');
	var $btnCloseMclip = $('#btnCloseMclip');
	var $mclipLayer = $('#mclipLayer');
	
	var btnOpenClipDiv = $('#btnPlaybClip');
	vId = btnOpenClipDiv.attr("data-id");
	var btnCloseClipDiv = $('.btn_close_mclip');

	btnOpenClipDiv.on("click", function (e) {
		
		e.preventDefault();
		$mclipLayer.show(500);
		
		player.playVideo();
	});
	btnCloseClipDiv.on("click", function (e) {
		stopVideo();
		
		e.preventDefault();
		$mclipLayer.hide(300);
	});
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

});
var player;
	function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
     height: '100%',
     width: '100%',
     videoId: vId,
     playerVars: { 'autoplay': 0, 'controls': 0, 'rel':0, 'showinfo': 0, 'ecver': 2 },
     events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange
     }
   });
 }

function onPlayerReady(event) {
	event.target.setVolume(50);
}

var done = false;
function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PLAYING && !done) {
     player.setVolume(50);
     setTimeout(stopVideo, 73000);
     done = true;
   }
}
function stopVideo() {
	player.stopVideo();
}

//유튜브 자동재생 자동멈춤 끝


						