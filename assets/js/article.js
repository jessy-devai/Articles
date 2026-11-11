/* ==========================================================================
   in — comportements des pages article (aucun réglage à faire ici)
   ========================================================================== */
(function () {
  "use strict";
  var doc = document;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Barre du haut : fond flouté après le début du défilement
     + barre de progression si le navigateur ne gère pas les animations au défilement */
  var bar = doc.querySelector(".site-bar");
  var progress = doc.querySelector(".progress");
  var nativeProgress = window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()");
  function onScroll() {
    var y = window.scrollY || doc.documentElement.scrollTop;
    if (bar) bar.classList.toggle("is-scrolled", y > 24);
    if (progress && !nativeProgress) {
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--p", max > 0 ? Math.min(1, y / max) : 0);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Vidéos chapitrées : YouTube n'est chargé qu'au clic (vie privée + rapidité).
     Sans JavaScript, les chapitres restent des liens directs vers YouTube. */
  doc.querySelectorAll(".video[data-yt]").forEach(function (box) {
    var id = box.getAttribute("data-yt");
    var stage = box.querySelector(".video-stage");
    var poster = box.querySelector(".video-poster");
    var links = Array.prototype.slice.call(box.querySelectorAll(".chapters a"));
    var title = box.getAttribute("data-title") || "Vidéo";

    function play(i) {
      var a = links[i];
      if (!a) return;
      var start = a.getAttribute("data-start"), end = a.getAttribute("data-end");
      var src = "https://www.youtube-nocookie.com/embed/" + id +
        "?start=" + start + (end ? "&end=" + end : "") +
        "&autoplay=1&rel=0&modestbranding=1&playsinline=1";
      var frame = stage.querySelector("iframe");
      if (!frame) {
        frame = doc.createElement("iframe");
        frame.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        frame.setAttribute("allowfullscreen", "");
        frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        stage.appendChild(frame);
      }
      frame.setAttribute("title", title + " — " + a.querySelector(".n").textContent);
      frame.src = src;
      if (poster) { poster.remove(); poster = null; }
      links.forEach(function (l, j) { l.setAttribute("aria-current", j === i ? "true" : "false"); });
      frame.focus({ preventScroll: true });
    }
    if (poster) poster.addEventListener("click", function () { play(0); });
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        play(i);
        if (!reduce && stage.getBoundingClientRect().top < 0) stage.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  });

  /* Image défilante : l'indication « faire défiler » s'efface dès qu'on a commencé */
  doc.querySelectorAll(".scroller").forEach(function (fig) {
    var vp = fig.querySelector(".scroller-viewport");
    if (!vp) return;
    vp.addEventListener("scroll", function () {
      if (vp.scrollTop > 30) fig.classList.add("is-scrolled");
    }, { passive: true });
  });

  /* Typographie française : espace insécable avant : ; ! ? » et après « */
  function fr(s) { return String(s || "").replace(/ ([:;!?»])/g, "\u00a0$1").replace(/« /g, "«\u00a0"); }
  /* « À lire ensuite » : construit automatiquement depuis le catalogue */
  var slot = doc.querySelector(".read-next");
  var current = doc.body.getAttribute("data-article");
  var list = (window.IN_CATALOGUE || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var idx = list.findIndex(function (a) { return a.dossier === current; });
  if (slot && idx > -1 && list.length > 1) {
    var picks = [];
    if (list[idx - 1]) picks.push(["Article suivant", list[idx - 1]]);
    if (list[idx + 1]) picks.push(["Article précédent", list[idx + 1]]);
    if (picks.length === 1) {
      list.forEach(function (a, j) { if (picks.length < 2 && j !== idx && a !== picks[0][1]) picks.push(["À lire aussi", a]); });
    }
    var mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
    var ul = doc.createElement("ul");
    picks.forEach(function (p) {
      var a = p[1], d = a.date.split("-");
      var li = doc.createElement("li");
      var link = doc.createElement("a");
      link.href = "../" + a.dossier + "/";
      link.innerHTML = '<span class="dir"></span><span class="t"></span><span class="m"></span>';
      link.querySelector(".dir").textContent = p[0] + " · N°" + String(a.numero).padStart(2, "0");
      link.querySelector(".t").textContent = fr(a.titre);
      link.querySelector(".m").textContent = mois[+d[1] - 1] + " " + d[0] + " · " + a.lecture + " min";
      li.appendChild(link);
      ul.appendChild(li);
    });
    slot.appendChild(ul);
    slot.hidden = false;
  }
})();
