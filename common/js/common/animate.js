/*--------------------------------------------------------------------------*
 *
 *  animate
 *
 *--------------------------------------------------------------------------*/
function initAnimation() {
  const elements = document.querySelectorAll(".animated");

  const handleScroll = () => {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top >= windowHeight / 2) {
        const delay = element.getAttribute("data-delay") || "0s"; // data-delay 属性を取得
        element.style.animationDelay = delay;
        element.style.webkitAnimationDelay = delay;
      }
    });
  };

  // スクロール時とページ読み込み時に実行
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 初期表示時の処理
}

// DOMが読み込まれたら初期化
document.addEventListener("DOMContentLoaded", initAnimation);