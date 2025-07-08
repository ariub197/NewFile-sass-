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

  $(document).on("click", function (e) {
    if ($(e.target).closest('[data-nav="content"]')) {
      $('[data-nav="btn"]').removeClass("is-active");
      $('[data-nav="line"]').removeClass("is-active");
      $('[data-nav="content"]').removeClass("is-active");
      $('[data-nav="bg"]').removeClass("is-active");
      $('[data-nav="logo"]').removeClass("is-white");
      $("body,html").css("overflow-y", "visible");
    }
  });
});

$('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  let header = $(window).width() <= 768 ? 72 : 86;
  let id = $(this).attr("href");
  let position = 0;
  let targetElement = $(id);
  if (id === "#") {
    position = $(id).offset().top - header;
  } else if (targetElement.length) {
    position = targetElement.offset().top - header;
  } else {
    return;
  }
  $("html,body").animate(
    {
      scrollTop: position,
    },
    400
  );
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
  });

  new WOW().init();
});