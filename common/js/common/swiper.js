/*--------------------------------------------------------------------------*
 *
 *  swiper
 *
 *--------------------------------------------------------------------------*/
$(function() {
	const swiper = new Swiper('[data-swiper="list"]', {
    loop: true,
    slidesPerView: "auto",
    // slidesPerView: 1.3,
    spaceBetween: 24,
    speed: 800,
    effect: "fade",
    initialSlide: 0,
    freeMode: false,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
      el: '[data-swiper="bullet"]',
      type: 'bullets',
      clickable: 'true',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});