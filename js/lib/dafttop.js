/*
* Version 1.0.0
* Developed by DaftKU (http://thedaftlab.com/ , http://zmass.co.kr/)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/

(function($) {
    
     $.fn.dafttop = function(method) {
         return methods.init(method);
     };
    
     var methods = {},
     defaults = {
       objId : "daftTop",
       startY : 50,
       endY: 50
    },
     scroller = function() {
          topMove();
    },
    resizer = function() {
         topMove();
    },
    topMove = function() {
         var dh = $(document).height();
         var wh = $('body').height();
         var obj = $("#"+defaults.objId);
         var st = $(window).scrollTop();

         if (((dh-defaults.endY)-wh) > 0 ) {
              obj.show();
              if ((dh-defaults.endY+ defaults.startY)-(st+wh) < 0){
                   obj.css({"position":"fixed","bottom":defaults.endY+"px","top":"auto"});
              } else if ((st- defaults.startY - obj.height()) > 0 ) {
                   obj.css({"position":"fixed","bottom":defaults.startY+"px","top":"auto"});
              } else if ((st- defaults.startY- obj.height()) < 0 ){
                   obj.css({"position":"fixed","bottom":"auto","top":wh+"px"});
              }
         } else {
              obj.hide();
         }
    },
    methods = {
      init: function(options) {
           defaults = $.extend({}, defaults, options);
           var obj = $("#"+defaults.objId);
           var wh = $('body').height();
           //obj.css({"position":"fixed","top":wh+"px"});
      },
      update: function(options) {
           topMove();
      }
    };
     if (window.addEventListener) {
         window.addEventListener('scroll', scroller, false);
         window.addEventListener('resize', resizer, false);
     } else if (window.attachEvent) {
          window.attachEvent('onscroll', scroller);
          window.attachEvent('onresize', resizer);
     }
})(jQuery);