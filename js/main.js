document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  var closeBtn = document.querySelector('.mobile-panel-close');

  function openPanel(){
    panel.classList.add('open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded','true');
  }
  function closePanel(){
    panel.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded','false');
  }
  if (toggle && panel) {
    toggle.addEventListener('click', function(){
      panel.classList.contains('open') ? closePanel() : openPanel();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  document.querySelectorAll('.mobile-top').forEach(function(btn){
    btn.addEventListener('click', function(){
      var sub = document.getElementById(btn.getAttribute('data-target'));
      var chevron = btn.querySelector('.mobile-chevron');
      if(!sub) return;
      sub.classList.toggle('open');
      if(chevron) chevron.classList.toggle('open');
    });
  });

  /* ---------- accordion (FAQ) ---------- */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var head = item.querySelector('.accordion-head');
    var body = item.querySelector('.accordion-body');
    if(!head || !body) return;
    head.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 40 + 'px';
      }
    });
  });

  /* ---------- filter chips (events / blog) ---------- */
  document.querySelectorAll('.filter-bar').forEach(function(bar){
    var chips = bar.querySelectorAll('.filter-chip');
    chips.forEach(function(chip){
      chip.addEventListener('click', function(){
        chips.forEach(function(c){ c.classList.remove('active'); });
        chip.classList.add('active');
        var filter = chip.getAttribute('data-filter');
        var list = document.querySelector(bar.getAttribute('data-list'));
        if(!list) return;
        list.querySelectorAll('[data-cat]').forEach(function(card){
          var show = (filter === 'all' || card.getAttribute('data-cat') === filter);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  });

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10) || 0;
          var dur = 1400;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString();
          }
          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---------- scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (r) { revealObserver.observe(r); });
  }

  /* ---------- back to top ---------- */
  var backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > 480);
    });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- close mobile panel on resize to desktop ---------- */
  window.addEventListener('resize', function(){
    if(window.innerWidth > 1080 && panel && panel.classList.contains('open')){
      closePanel();
    }
  });
});
