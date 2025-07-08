

// ナビボタンの開閉
document.querySelector('[data-nav="btn"]').addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.toggle("is-active");
  document.querySelector('[data-nav="content"]').classList.toggle("is-active");
  document.querySelector('[data-nav="bg"]').classList.toggle("is-active");

  if (this.classList.contains("is-active")) {
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "visible";
    document.documentElement.style.overflowY = "visible";
  }
});

// 外側クリックでメニューを閉じる
document.querySelectorAll('[data-nav="content"] a[href^="#"], [data-nav="close"]').forEach(el => {
  el.addEventListener("click", function () {
    document.querySelector('[data-nav="btn"]').classList.remove("is-active");
    document.querySelector('[data-nav="content"]').classList.remove("is-active");
    document.querySelector('[data-nav="bg"]').classList.remove("is-active");
    document.body.style.overflowY = "visible";
    document.documentElement.style.overflowY = "visible";
  });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    let offset = 0;
    if (window.innerWidth <= 750) {
      const header = document.querySelector("header");
      offset = header ? header.offsetHeight : 0;
    }

    const position = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  });
});

// トップに戻るボタン
const topBtn = document.querySelector('[data-btn="top"]');
topBtn.style.display = "none";

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    topBtn.style.display = "block";
    topBtn.style.opacity = "1";
  } else {
    topBtn.style.opacity = "0";
    setTimeout(() => {
      if (window.scrollY <= 100) {
        topBtn.style.display = "none";
      }
    }, 300);
  }
});

topBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// formボタンの調整
document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");
  const privacyCheck = document.getElementById("acceptForm");

  updateButtonState();
  privacyCheck.addEventListener("change", updateButtonState);

  function updateButtonState() {
    submitBtn.disabled = !privacyCheck.checked;
    submitBtn.title = privacyCheck.checked ? "" : "同意書にチェックがないと送信できません";
  }
});

//メール処理
const showMessage = (message, type = "success") => {
  const messageBox = document.getElementById("form-message");
  messageBox.textContent = message;
  messageBox.className = `form-message ${type}`;

  setTimeout(() => {
    messageBox.classList.add("is-hidden");
  }, 5000);
  messageBox.classList.remove("is-hidden");
};

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("sendmail.php", {
    method: "POST",
    body: formData,
  })
  .then(response => response.text())
  .then(result => {
    showMessage("送信が完了しました。ありがとうございました。", "success");
    form.reset();
    document.getElementById("submitBtn").disabled = true;
  })
  .catch(error => {
    showMessage("送信に失敗しました。時間をおいて再度お試しください。", "error");
    console.error("送信エラー:", error);
  });
});
