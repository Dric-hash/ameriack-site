// Menu mobile, année du pied de page, apparition au défilement et relief des visuels 3D.
// Aucune dépendance, aucun traceur.
(function () {
  var b = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  if (b && menu) {
    b.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      b.setAttribute("aria-expanded", ouvert ? "true" : "false");
      b.setAttribute("aria-label", ouvert ? "Fermer le menu" : "Ouvrir le menu");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("ouvert");
        b.setAttribute("aria-expanded", "false");
      });
    });
  }
  var an = document.querySelector("[data-annee]");
  if (an) { an.textContent = new Date().getFullYear(); }

  var reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Apparition au défilement : sans IntersectionObserver ou avec « moins d'animations », tout est visible.
  var blocs = document.querySelectorAll(".apparait");
  if (reduit || !("IntersectionObserver" in window)) {
    blocs.forEach(function (el) { el.classList.add("vu"); });
  } else {
    var io = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("vu"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    blocs.forEach(function (el) { io.observe(el); });
  }

  // Relief : le visuel s'incline de quelques degrés vers la souris (souris uniquement).
  var souris = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  if (!reduit && souris) {
    document.querySelectorAll("[data-relief]").forEach(function (fig) {
      var img = fig.querySelector("img");
      if (!img) { return; }
      var attente = null;
      fig.addEventListener("pointermove", function (ev) {
        var r = fig.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        if (attente) { cancelAnimationFrame(attente); }
        attente = requestAnimationFrame(function () {
          img.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");
          img.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg");
        });
      });
      fig.addEventListener("pointerleave", function () {
        if (attente) { cancelAnimationFrame(attente); }
        img.style.setProperty("--ry", "0deg");
        img.style.setProperty("--rx", "0deg");
      });
    });
  }
})();
