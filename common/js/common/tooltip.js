/*--------------------------------------------------------------------------*
 *
 *  tippyjs
 *
 *--------------------------------------------------------------------------*/
$(function() {
  // tippyGeneral
  tippy('.tippy', {
    theme: 'blue',
    zIndex: '19999'
  });

  if (window.matchMedia('(min-width: 1080px)').matches) {
      tippy('.tippy-pc', {
        theme: 'blue',
        zIndex: '19999',
        placement: 'top',
        allowHTML: true
      });
    }

  // tippyClick
  const instance = tippy('.tippy-click', {
    theme: 'blue',
    trigger: 'click',
    zIndex: '19999'
  });
});
