$(function() {
  //header-toggle
  $('[data-nav="btn"]').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('is-active');
    $('[data-nav="content"]').toggleClass('is-active');
    $('[data-nav="bg"]').toggleClass('is-active');
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
  $('[date-btn="top"]').hide();

  $(window).scroll(function(){
    if($(this).scrollTop() > 100){
      $('[date-btn="top"]').fadeIn();
    } else {
      $('[date-btn="top"]').fadeOut();
    }
  });

  $('[date-btn="top"]').on('click', ()=>{
    $('body,html').animate({ scrollTop: 0 }, 500);
    return false;
  })
});