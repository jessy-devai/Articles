/* ==========================================================================
   in — page d'accueil (aucun réglage à faire ici : tout vient du catalogue)
   ========================================================================== */
(function () {
  "use strict";
  var doc = document;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var MOIS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  var MOIS_COURT = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];

  var list = (window.IN_CATALOGUE || []).slice().sort(function (a, b) {
    return a.date === b.date ? b.numero - a.numero : (a.date < b.date ? 1 : -1);
  });
  /* Typographie française : espace insécable avant : ; ! ? » et après « */
  function fr(s) { return String(s || "").replace(/ ([:;!?»])/g, "\u00a0$1").replace(/« /g, "«\u00a0"); }
  function num(a) { return String(a.numero).padStart(2, "0"); }
  function url(a) { return "articles/" + a.dossier + "/"; }
  function dateLong(a) { var d = a.date.split("-"); return MOIS[+d[1] - 1] + " " + d[0]; }
  function dateCourt(a) { var d = a.date.split("-"); return MOIS_COURT[+d[1] - 1] + " " + d[0]; }
  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* --- Dernier essai (carte mise en avant) ------------------------ */
  var last = list[0];
  if (last) {
    var slot = doc.querySelector("[data-feature]");
    if (slot) {
      var a = el("a", "feature");
      a.href = url(last);
      var n = el("span", "feature-num");
      n.setAttribute("aria-hidden", "true");
      n.appendChild(el("small", null, "N°"));
      n.appendChild(doc.createTextNode(num(last)));
      var body = el("span", "feature-body");
      body.appendChild(el("span", "kicker", last.rubrique));
      var t = el("span", "feature-title", fr(last.titre));
      t.style.viewTransitionName = "t-" + last.dossier;
      body.appendChild(t);
      body.appendChild(el("span", "feature-dek", fr(last.chapo)));
      var meta = el("span", "feature-meta");
      [dateLong(last), last.lecture + " min de lecture", last.extra].filter(Boolean).forEach(function (m, i) {
        if (i) { var d = el("span", "dot"); d.setAttribute("aria-hidden", "true"); meta.appendChild(d); }
        meta.appendChild(el("span", null, m));
      });
      body.appendChild(meta);
      var cta = el("span", "cta");
      cta.innerHTML = 'Lire l’essai <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
      body.appendChild(cta);
      a.appendChild(n);
      a.appendChild(body);
      slot.appendChild(a);

      if (finePointer && !reduce) {
        a.addEventListener("pointermove", function (e) {
          var r = a.getBoundingClientRect();
          a.style.setProperty("--fx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
          a.style.setProperty("--fy", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
        });
      }
    }
  }

  /* --- Index de tous les essais ------------------------------------------ */
  var index = doc.querySelector("[data-index]");
  var count = doc.querySelector("[data-count]");
  if (count) count.textContent = String(list.length).padStart(2, "0");
  if (index) {
    list.forEach(function (art, i) {
      var li = el("li");
      var a = el("a");
      a.href = url(art);
      a.appendChild(el("span", "num", "N°" + num(art)));
      var t = el("span", "t", fr(art.titre));
      if (i > 0) t.style.viewTransitionName = "t-" + art.dossier; // le n°1 est déjà nommé dans la carte
      a.appendChild(t);
      a.appendChild(el("span", "r", art.rubrique.replace(/^Essai · /, "")));
      var d = el("span", "d");
      d.innerHTML = '<time datetime="' + art.date + '"></time>';
      d.firstChild.textContent = dateCourt(art) + " · " + art.lecture + " min";
      a.appendChild(d);
      var go = el("span", "go", "→");
      go.setAttribute("aria-hidden", "true");
      a.appendChild(go);
      li.appendChild(a);
      index.appendChild(li);
    });
  }

  /* --- Barre du haut ------------------------------------------------------ */
  var bar = doc.querySelector(".site-bar");
  var logo = doc.querySelector(".site-logo");
  var hero = doc.querySelector(".hero");
  function onScroll() {
    var y = window.scrollY || doc.documentElement.scrollTop;
    bar.classList.toggle("is-scrolled", y > 24);
    var past = hero ? y > hero.offsetHeight * 0.55 : y > 300;
    bar.classList.toggle("is-past-hero", past);
    if (logo) logo.tabIndex = past ? 0 : -1;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Lumière qui suit le pointeur dans le hero ------------------------- */
  if (hero && finePointer && !reduce) {
    var raf = 0, px = 50, py = 40;
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width * 100;
      py = (e.clientY - r.top) / r.height * 100;
      if (!raf) raf = requestAnimationFrame(function () {
        hero.style.setProperty("--mx", px.toFixed(1) + "%");
        hero.style.setProperty("--my", py.toFixed(1) + "%");
        raf = 0;
      });
    });
  }
})();
