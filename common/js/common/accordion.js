/*--------------------------------------------------------------------------*
 *
 *  accordion
 *
 *--------------------------------------------------------------------------*/
$(function () {
  $('[data-toggle="btn"]').on("click", function (e) {
    e.preventDefault();// デフォルトの挙動を無効化
    let speed = 300;
    const box = $(this).parent('[data-toggle="box"]');
    const content = $(this).next('[data-toggle="content"]');

    $(this).toggleClass("is-active");
    $(box).find('[data-toggle="icon"]').toggleClass("is-active");

    if ($(box).attr("open")) {
      // アコーディオンを閉じるときの処理
      $(this).nextAll($(content)).slideUp(speed, function() {
        $(box).removeAttr("open");
      });
    } else {
      $(box).attr("open", "true");
      $(this).nextAll($(content)).hide().slideDown(speed);
    }
  })
})
