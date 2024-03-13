$(function() {
  //header-toggle
  $('#js-drawer').on('click', function(e){
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
});

$(function() {
  //to-top
  $("#c-pagetop").hide();

  $(window).scroll(function(){
    if($(this).scrollTop() > 100){
      $("#c-pagetop").fadeIn();
    } else {
      $("#c-pagetop").fadeOut();
    }
  });

  $('#c-pagetop').on('click', ()=>{
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
  })
});