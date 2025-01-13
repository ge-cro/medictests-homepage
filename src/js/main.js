$(document).ready(function () {

    const emssoftwareAccordion = document.getElementById("emssoftware-accordion");
    emssoftwareAccordion.addEventListener('show.bs.collapse', (e) => {
      const { target } = e;
      target.parentElement.classList.add('active');
      const id = target.id;
      const navbarItem = document.querySelector(`.emssoftware-navbar-item[data-bs-target='#${id}']`);
      navbarItem.classList.add('active');
    });
    emssoftwareAccordion.addEventListener('hide.bs.collapse', (e) => {
      const { target } = e;
      target.parentElement.classList.remove('active');
      const id = target.id;
      const navbarItem = document.querySelector(`.emssoftware-navbar-item[data-bs-target='#${id}']`);
      navbarItem.classList.remove('active');
    });

    const emssoftwareNavbarBtns = document.querySelectorAll(".emssoftware-navbar-item");
    for(let i = 0; i < emssoftwareNavbarBtns.length; i++) {
      const navbarBtn = emssoftwareNavbarBtns[i];
      navbarBtn.addEventListener("click", (e) => {
        if (!e.target.classList.contains('active')) {
          document.querySelector('.emssoftware-navbar-item.active').classList.remove('active');
          const prevActiveItem = document.querySelector("#emssoftware-accordion .accordion-item.active");
          prevActiveItem.classList.remove('active');
          prevActiveItem.querySelector("button").classList.remove("collapsed");
          prevActiveItem.querySelector(".accordion-collapse").classList.remove("show");
          e.target.classList.add('active');
          const dataBsTarget = e.target.dataset.bsTarget;
          const bsTarget = document.querySelector(dataBsTarget); 
          bsTarget.classList.add('collapse');
          bsTarget.classList.add('show');
          bsTarget.parentElement.classList.add('active');
        }
      })
    }
    
    const accordionFAQ = document.getElementById("accordionFAQ");
    accordionFAQ.addEventListener('show.bs.collapse', (e) => {
      const { target } = e;
      target.parentElement.classList.add('active');
    });
    accordionFAQ.addEventListener('hide.bs.collapse', (e) => {
      const { target } = e;
      target.parentElement.classList.remove('active');
    });
    
    $('.testimonial-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 3, 
      dots: true,
      arrows: false,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false
          }
        }
      ] 

   });


  jQuery(window).scroll(function() {
    var wScrollTop = jQuery(this).scrollTop();  // Correctly use jQuery(this) to get the window's scroll position
    var fromOffset = jQuery(".section.section-statistics").offset().top;
    var toOffset = jQuery(".section.section-joinmedictests").offset().top;

    if (wScrollTop > fromOffset && wScrollTop <= toOffset) { 
        jQuery('.header').addClass('sticky');
        jQuery('.section-footer').addClass('sticky');
    } else { 
        jQuery('.header').removeClass('sticky');
        jQuery('.section-footer').removeClass('sticky');
    } 
  });

});
 