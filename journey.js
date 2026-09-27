/* 改善版で足した要素のスクロール演出（2026年9月27日）。script.js と同じ .rv / .in の仕組みを使う */
(function () {
  var SEL = [
    '.jm-item', '.ch-head .eyebrow', '.ch-head h3', '.can', '.shot-panel', '.flow-panel',
    '.talk-card', '.flow li', '.gallery figure', '.gallery-note', '.mio-card', '.qa', '.how-sub'
  ].join(',');
  var els = [].slice.call(document.querySelectorAll(SEL));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  els.forEach(function (el) { el.classList.add('rv'); });
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    var shown = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
    shown.forEach(function (el, i) {
      el.style.setProperty('--d', Math.min(i * 0.08, 0.4) + 's');
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 });
  els.forEach(function (el) { io.observe(el); });
})();
