// xử lý hiện/ẩn và thay đổi ngôn ngữ

let langCurrent = document.querySelector('.lang .lang__current');
let langList = document.querySelector('.lang .lang__list');
let langs = document.querySelectorAll('.lang .lang__list li');

langCurrent.addEventListener('click', function(e) {
    e.stopPropagation();
    langList.classList.toggle('active')
    langCurrent.firstElementChild.classList.toggle('active')
})

window.addEventListener('click', function() {
    langList.classList.remove('active')
})
langs.forEach(function(lang) {
    lang.onclick = function() {

        langCurrent.firstElementChild.classList.remove('active');

        let langText = lang.textContent;
        let langCurrentName = langCurrent.firstElementChild.textContent;

        langCurrent.firstElementChild.innerHTML = langText;
        lang.innerHTML = langCurrentName;

    }
})


// xử lý đổi backgroundColor header khi scroll
let header = document.querySelector('.header')

document.addEventListener('scroll', (function() {
    // console.log(window.scrollY)
    // window.innerHeight :chiều cao của cửa sổ trình duyệt
    if (window.pageYOffset > 200) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }
}))

// xử lý  Gototop
let totop = document.querySelector('.totop');
let backtotop = document.querySelector('.gototop')
let footer = document.querySelector('.footer')

document.addEventListener('scroll', (function() {
    if (window.pageYOffset > 200 && window.pageYOffset < document.querySelector('body').clientHeight - window.innerHeight) {
        totop.classList.add('active')
    } else {
        totop.classList.remove('active')
    }
}))

backtotop.addEventListener('click', function() {
    window.scrollTo({ // vị trí của window
        top: 0,
        behavior: "smooth"
    });
})
totop.addEventListener('click', function() {
    window.scrollTo({ // vị trí của window
        top: 0,
        behavior: "smooth"
    });
})

// xử lý menu mobile
let btnmenu = document.querySelector('.btnmenu');
let nav = document.querySelector('.nav');

btnmenu.addEventListener('click', function() {
    nav.classList.toggle('active')
    btnmenu.classList.toggle('active')
})
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        nav.classList.remove('active')
        btnmenu.classList.remove('active')
    }
})


// Xử lý tags news
let newsTags = document.querySelectorAll('.news .news__tags .tag');
newsTags.forEach(function(tag, index) {
    tag.addEventListener('click', function() {
        let newsTag = document.querySelector('.news .news__tags .tag.active');
        newsTag.classList.remove('active')
        tag.classList.add('active')

        let newsList = document.querySelector('.news__item-wrap-' + (index + 1))
        document.querySelector('.news__item-wrap.active').classList.remove('active')
        newsList.classList.add('active')

    })
})


// Xử lý FAQ Accordion
let faqs = document.querySelectorAll('.faq__question-title');
let faqsContent = document.querySelectorAll('.faq__question-content')

faqs.forEach(function(faq, index) {
    faq.addEventListener('click', function() {

        if (faqsContent[index].style.maxHeight) {
            faqsContent[index].style.maxHeight = null;
            faq.classList.remove('active')
        } else {
            //scrollHeight : kích thước của nội dung trong khối, kể cả phần bị ẩn 

            faqs.forEach(function(item, index) {
                faqsContent[index].style.maxHeight = null;
                item.classList.remove('active')

            })

            faq.classList.add('active')
            faqsContent[index].style.maxHeight = faqsContent[index].scrollHeight + "px";
        }

    })
})


// Xử lý progressbar

function handleProgress() {

    let hPage = document.querySelector('body').clientHeight; // chiều cao của cả page
    let scrollY = window.pageYOffset;
    let vh = window.innerHeight; // chiều cao cửa sổ trình duyệt 

    let progess = document.querySelector('.progressbar')

    let percent = Number(scrollY / (hPage - vh) * 100);
    progess.style.width = percent + "%"
}
document.addEventListener('scroll', function() {
    handleProgress()
})

// Xử lý Scroll To Section
let menu = document.querySelectorAll('.menu li a');
let sectionArray = [];
menu.forEach(function(item) {
    let href = (item.getAttribute('href')) // lấy ra tên của thuộc tính href: #...
    let sectionClassName = href.replace('#', '')
    let sectionClass = document.querySelector(`.${sectionClassName}`) // seclector đến section có class:...

    sectionArray.push(sectionClass);

    // Click menu item -> scroll và active menu item
    item.addEventListener('click', function(e) {
        e.preventDefault();
        menu.forEach(function(menuItem) {
            menuItem.classList.remove('active')
        })
        item.classList.add('active')

        window.scrollTo({
            top: sectionClass.offsetTop - 60 + 1, //Khoảng cách từ top đến section
            behavior: "smooth"
        })
    })

    // Srcoll đến section -> active menu item tương ứng
    window.addEventListener('scroll', function() {
        let scrollY = window.pageYOffset;
        sectionArray.forEach(function(item, index) {
            if (scrollY > item.offsetTop - 60 && scrollY < item.offsetTop + item.offsetHeight) {
                menu.forEach(function(menuItem) {
                    menuItem.classList.remove('active')
                })
                menu[index].classList.add('active')

            } else {
                menu[index].classList.remove('active')

            }
        })
    })


})


// On mobile
let menuNav = document.querySelectorAll('.nav li a');
menuNav.forEach(function(item) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        menuNav.forEach(function(menuItem) {
            menuItem.classList.remove('active')
        })
        item.classList.add('active')

        let href = (item.getAttribute('href')) // lấy ra tên của thuộc tính href: #...
        let sectionClassName = href.replace('#', '')
        let sectionClass = document.querySelector(`.${sectionClassName}`) // seclector đến section có class:...

        window.scrollTo({
            top: sectionClass.offsetTop - 60, //Khoảng cách từ top đến section
            behavior: "smooth"
        })

        nav.classList.remove('active')
        btnmenu.classList.remove('active')

        window.addEventListener('scroll', function() {
            let scrollY = window.pageYOffset;
            sectionArray.forEach(function(item, index) {
                if (scrollY > item.offsetTop - 60 && scrollY < item.offsetTop + item.offsetHeight) {
                    menuNav.forEach(function(menuItem) {
                        menuItem.classList.remove('active')
                    })
                    menuNav[index].classList.add('active')

                } else {
                    menuNav[index].classList.remove('active')

                }
            })
        })

    })
})


// Xử lý Popup videos

let btnVideos = document.querySelectorAll('.quality__video-img');
let popupVideo = document.querySelector('.popup__video');
let closePopup = document.querySelector('.popup__video-close')
let iframeVideo = document.querySelector('.popup__video iframe')
btnVideos.forEach(function(btnVideo) {
    btnVideo.addEventListener('click', function() {
        popupVideo.classList.add('active')
        let videoId = btnVideo.getAttribute('data-video-id')
        iframeVideo.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`)
    })

})
closePopup.addEventListener('click', function() {
    popupVideo.classList.remove('active')
    iframeVideo.setAttribute('src', '')

})

popupVideo.addEventListener('click', function() {
    popupVideo.classList.remove('active')
    iframeVideo.setAttribute('src', '')


})

// Xử lý Slider 
// let sliderList = document.querySelectorAll('.slider__item')
// let next = document.querySelector('.--next');
// let prev = document.querySelector('.--prev');
// let dotted = document.querySelectorAll('.dotted span')
// let number = document.querySelector('.number')

// let slideIndex = 0;
// for (let i = 0; i < sliderList.length; i++) {
//     if (sliderList[i].classList.contains('active')) {
//         slideIndex = i;
//     }

// }

// function showSlide(index) {
//     sliderList[slideIndex].classList.remove('active');
//     sliderList[index].classList.add('active');
//     dotted[slideIndex].classList.remove('active');
//     dotted[index].classList.add('active');
//     slideIndex = index;
//     number.innerHTML = (slideIndex + 1).toString().padStart(2, '0');

// }

// next.addEventListener('click', function() {
//     if (slideIndex < sliderList.length - 1) {
//         showSlide(slideIndex + 1)
//     } else {
//         showSlide(0)
//     }

// })
// prev.addEventListener('click', function() {
//     if (slideIndex > 0) {
//         showSlide(slideIndex - 1)
//     } else {
//         showSlide(sliderList.length - 1)
//     }

// })


// dotted.forEach(function(item, index) {
//     item.addEventListener('click', function() {
//         showSlide(index);
//     })
// })

//Sử dụng thư viện Flickity

let slider = document.querySelector('.slider__item-wrap');
let flktySlider = new Flickity(slider, {
    cellAlign: 'left', //vị trí
    contain: true,
    wrapAround: true, //lặp lại
    prevNextButtons: false, // prev,next
    setGallerySize: false,
    draggable: true, // kéo thả
    on: {
        ready: function() {
            let dots = document.querySelector('.flickity-page-dots');
            dotted = document.querySelector('.slider__bottom-paging .dotted');
            dotted.appendChild(dots)

        },
        change: function(index) {
            let number = document.querySelector('.slider__bottom-paging .number');
            let indexPage = index + 1;
            number.innerHTML = indexPage.toString().padStart(2, 0);
        }
    }
})

document.querySelector('.slider__bottom-control .--prev').addEventListener('click', function() {
    flktySlider.previous();
})
document.querySelector('.slider__bottom-control .--next').addEventListener('click', function() {
    flktySlider.next();
})


// Xử lý sliderDrag

window.addEventListener('DOMContentLoaded', (event) => {

    let sliderDrag = document.querySelector('.slider__drag-wrap')
    let flktyDrag = new Flickity(sliderDrag, {
        contain: true,
        freeScroll: true,
        prevNextButtons: false,
        pageDots: false,
        on: {
            scroll: function(progess) {
                let progressSliderDrag = document.querySelector('.slider__drag-progressbar .timeline .process');
                progess = Math.max(0, Math.min(1, progess));
                progressSliderDrag.style.width = progess * 100 + '%';
            }
        },

    })

});



// Xử lý gallery
Fancybox.bind("[data-fancybox]", {
    infinite: true,
    keyboard: {
        Escape: "close",
        Delete: "close",
        Backspace: "close",
        PageUp: "next",
        PageDown: "prev",
        ArrowUp: "next",
        ArrowDown: "prev",
        ArrowRight: "next",
        ArrowLeft: "prev",
    },
});