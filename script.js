/* スクロール演出・スマホのヘッダー自動格納（2026年9月25日追加） */
(function () {
  window.__lj = true;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ファーストビューの見出しは文節ごとに順番に出す
  document.querySelectorAll('.hero h1 w-b').forEach(function (w, i) {
    w.style.setProperty('--i', i);
  });

  var TEXT = [
    '.section .eyebrow', '.chapter-copy .eyebrow', '.company .eyebrow',
    'main h2', '.chapter-copy h3', '.overview-grid article', '.overview-bridge',
    '.intro .gold', '.lead', '.prose p', '.chapter-grid li', '.contents-note',
    '.learning-pair > div', '.final-message', '.company .button', '.contact-note'
  ].join(',');
  var texts = [].slice.call(document.querySelectorAll(TEXT)).filter(function (el) {
    return !el.closest('.hero');
  });
  var imgs = [].slice.call(document.querySelectorAll('.chapter-visual, .wide-photo, .company-image'));
  texts.forEach(function (el) { el.classList.add('rv'); });
  imgs.forEach(function (el) { el.classList.add('rv-img'); });
  var all = texts.concat(imgs);

  if (reduce || !('IntersectionObserver' in window)) {
    all.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var shown = entries.filter(function (e) { return e.isIntersecting; })
        .map(function (e) { return e.target; });
      // 同時に画面へ入ったものは少しずつずらして出す
      shown.forEach(function (el, i) {
        el.style.setProperty('--d', Math.min(i * 0.09, 0.45) + 's');
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    all.forEach(function (el) { io.observe(el); });
  }

  // 横長写真のゆっくりした動き・ヘッダーの格納
  var par = [].slice.call(document.querySelectorAll('.wide-photo img, .company-image img'));
  var header = document.querySelector('.header');
  var mqSP = window.matchMedia('(max-width: 600px)');
  var lastY = window.scrollY, ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight, y = window.scrollY;
    if (!reduce) {
      par.forEach(function (img) {
        var r = img.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.translate = '0 ' + (p * -8).toFixed(2) + '%';
      });
    }
    if (header) {
      if (mqSP.matches && y > lastY + 4 && y > 160) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y < 160) header.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  // 固定ボトムバー: ファーストビューを過ぎたら出す
  var bar = document.getElementById('cta-bar');
  var hero = document.querySelector('.hero');
  if (bar && hero) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        bar.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { threshold: 0 }).observe(hero);
    } else {
      bar.classList.add('is-visible');
    }
  }
})();
