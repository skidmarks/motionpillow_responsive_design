document.addEventListener("DOMContentLoaded", () => {
            
    const bodyEl = document.querySelector('body');

    // intro active motion
    const introLayer = document.querySelector('.intro');
    introLayer.classList.add('active');


    // top menu
    const topUtil = document.querySelector('.top_utils');



    // down scroll topUtil hide
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            topUtil.classList.add("show");
        } else {
            topUtil.classList.remove("show");
        }
        prevScrollpos = currentScrollPos;
    }


    function waypoint_topmenu() {
        
        const waypoint = new Waypoint({
            element: document.getElementById('story'),
            handler: function(direction) {
                var prevScrollpos = window.pageYOffset;
                if(direction == "down") {
                    window.addEventListener('scroll', function() {
                        var currentScrollPos = window.pageYOffset;
                        if (prevScrollpos > currentScrollPos) {
                            topUtil.classList.add("show");
                        } else {
                            topUtil.classList.remove("show");
                        }
                        prevScrollpos = currentScrollPos;            
                    });                    
                }else {
                    window.removeEventListener('scroll', function() {
                        console.log('scroll event removed');
                    });
                }           
            }
        });

    }
    // waypoint_topmenu();

    // const waypoint = new Waypoint({
    //     element: document.getElementById('story'),
    //     handler: function(direction) {
    //         if(direction == "down") {
    //             console.log('TESTER DOWN');
    //         }else {
    //             console.log('TESTER UP');
    //         }           
    //     }
    // });

    // hamburger menu 
    const menu = document.querySelector('.icon');
    const menuCont = document.querySelector('.menu_cont');
    menu.addEventListener('click', (event) => {
        menu.classList.toggle("open");
        if(menu.classList.contains('open')) {
            menuCont.classList.add('show');
            bodyEl.classList.add('over_hide');
        }else{
            menuCont.classList.remove('show');
            bodyEl.classList.remove('over_hide');
        }
    });

    // links in the page
    const anchors = document.querySelectorAll('.anchors .anchor');
    for (const anchor of anchors) {
        anchor.addEventListener('click', function(e) {

            e.preventDefault();
            for (const anchor of anchors) {
                anchor.classList.remove('on');
            }
            
            document.querySelector(`#${anchor.href.split("#")[1]}`).scrollIntoView({behavior:'smooth'});
            // console.log($(anchor).prop('href'));

            this.classList.add('on');
            menu.classList.remove('open');
            menuCont.classList.remove('show');
            bodyEl.classList.remove('over_hide');
        });
    }     


    // voice slides
    const voiceSlide = new Swiper('.voice_slide', {
        slidesPerView: 1.3,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay:true,

        // autoplay:true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },                            
    });   

    // review slides
    const reviewSlide = new Swiper('.review_slide', {
        slidesPerView: 1.6,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay:true,

        // autoplay:true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },                                 
    }); 

    // apps slides
    const appsSlide = new Swiper('.apps_slide', {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        autoplay:true,
    });   

    // works slide
    const worksSlide = new Swiper('.works_slide', {
        slidesPerView: 1.15,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        // autoplay:true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    });   

    // story slide
    const storySlide = new Swiper('.story_slide', {
        slidesPerView: 1.15,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        // autoplay:true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    });   

    // awards slide
    const awardsSlide = new Swiper('.awards_slide', {
        slidesPerView: 1.4,
        centeredSlides: false,
        spaceBetween: 0,
        speed: 2000,
        loop: true,
        autoplay: {
            delay:1,
            disableOnInteraction: false
        },
        breakpoints: {
            768: {
                slidesPerView: 3.5,
                spaceBetween: 40,                
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 50,
            },            
        }
    });   

    // 색상 선택기

    function cololrSelection(wrapper, evt) {

        const selectionWrapper = document.querySelector(wrapper);
        const event = evt;

        const selectPanel = selectionWrapper.querySelector('.select_panel img');
        // console.log(selectPanel.src);

        const selectorList = selectionWrapper.querySelectorAll('.selector_list li');

        // 이미지 경로변경
        function getNewImgSrc(src, altImageName) {
            var source;
            var altSource;
            var altImage = [];

            source = src.split('/');
            altSource = source.slice(0, source.length-1);
            
            altImage[altImage.length] = altImageName.split(' ').join('');
            altImage[altImage.length] = source[source.length-1].split('.')[1];

            altSource[altSource.length] = altImage.join(".");;

            // 새 이미지 경로 return
            return altSource.join("/");
        }

        // className 초기화
        function clearClassName(ClassName, NodeList) {
            NodeList.forEach(function(item) {item.classList.remove(ClassName)});
        }

        selectorList.forEach(function(item, index, arr2) {

            item.addEventListener(event, function() {

                var imgAlt, imgName, imgSrc, newIgSrc;

                // className 초기화 + className 추가
                clearClassName('cur', selectorList);
                this.classList.add('cur');
                
                imgAlt = this.querySelector('.selector_txt span').textContent;
                imgName = this.querySelector('.selector_txt span').textContent;
                imgSrc = selectPanel.getAttribute('src');

                newImgSrc = getNewImgSrc(imgSrc, imgName);

                selectPanel.setAttribute('src', newImgSrc);
                selectPanel.setAttribute('alt', imgAlt);
            });
        });                            
    } // END colorSelection

    cololrSelection("#pillowSelection", 'click');
    cololrSelection("#deviceSelection", 'click');
        
});      