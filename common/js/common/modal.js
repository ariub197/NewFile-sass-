/*--------------------------------------------------------------------------*
 *
 *  modal
 *
 *--------------------------------------------------------------------------*/
(function($) {

  $('[data-modal="button"]').on('click', function(event){
    event.preventDefault();
    $('[data-modal="bg"], [data-modal="inner"]').fadeIn().css("display","flex");
    $('[data-modal="box"]').show();
    $('[data-modal="box"]').addClass("is-active");

    // subwindowを閉じる
    $('[data-subwindow="inner"]').fadeOut();
    $('[data-subwindow="box"]').fadeOut();
    $('[data-subwindow="box"]').removeClass("is-active");
  });

  $('[data-modal="close"]').on('click', function(event){
    event.preventDefault();
    $('[data-modal="bg"], [data-modal="inner"]').fadeOut();
    $('[data-modal="box"]').fadeOut();
    $('[data-modal="box"]').removeClass("is-active");
  });

})(jQuery);

/*--------------------------------------------------------------------------*
 *
 *  subwindow
 *
 *--------------------------------------------------------------------------*/

(function($) {

  $('[data-subwindow="button"]').on('click', function(event){
    event.preventDefault();
    $('[data-subwindow="inner"]').fadeIn().css("display","flex");
    $('[data-subwindow="box"]').show();
    $('[data-subwindow="box"]').addClass("is-active");
  });

  $('[data-subwindow="close"]').on('click', function(event){
    event.preventDefault();
    $('[data-subwindow="inner"]').fadeOut();
    $('[data-subwindow="box"]').fadeOut();
    $('[data-subwindow="box"]').removeClass("is-active");
  });

})(jQuery);

/*--------------------------------------------------------------------------*
 *
 *  Message Onboard
 *
 *--------------------------------------------------------------------------*/

(function($) {
  $('[data-msg="close"]').on('click', function(event){
    event.preventDefault();
    $('.c-block-msg-onboard').fadeOut().removeClass('is-view');
    $('[data-msg="inner"]').addClass('is-close');
  });
})(jQuery);

$(window).on('load', function() {
  setTimeout(function () { // 4秒で非表示
    $('.c-block-msg-onboard').fadeOut().removeClass('is-view');
    $('[data-msg="inner"]').addClass('is-close');
  }, 4000);
});
