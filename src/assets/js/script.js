$(function() {
  //header-toggle
  $('#js-drawer').on('click', () => {
	  e.preventDefault();
	  $(this).toggleClass('is-active');
	  $('.c-drawer-content').toggleClass('is-active');
	  $('.c-drawer-background').toggleClass('is-active');
		if($(this).hasClass('is-active')) {
			$('body,html').css('overflow-y', 'hidden');
		} else {
			$('body,html').css('overflow-y', 'visible');
		}
	  return false;
	});
	new WOW().init();
})