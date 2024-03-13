/*--------------------------------------------------------------------------*
 *
 *  swiper
 *
 *--------------------------------------------------------------------------*/
$(function() {
	const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: 800,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: 'true',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
});