// Menu mobile, année du pied de page, arrivée du visuel d'accueil et repère du logiciel affiché.
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
        b.setAttribute("aria-label", "Ouvrir le menu");
      });
    });
  }
  var an = document.querySelector("[data-annee]");
  if (an) { an.textContent = new Date().getFullYear(); }

  // Visuel d'accueil : une seule arrivée, quand l'image est chargée (sinon visible tout de suite).
  var accueil = document.querySelector(".accueil-visuel");
  if (accueil) {
    var img = accueil.querySelector("img");
    var montrer = function () { accueil.classList.add("pret"); };
    if (!img || img.complete) { montrer(); } else { img.addEventListener("load", montrer); img.addEventListener("error", montrer); }
    setTimeout(montrer, 2500);
  }

  // Logiciels : l'index devient une liste d'onglets ; un seul logiciel affiché à la fois.
  // Sans script, toutes les fiches restent visibles l'une sous l'autre et les liens mènent à chacune.
  var bloc = document.querySelector(".logiciels");
  var liens = bloc ? Array.prototype.slice.call(bloc.querySelectorAll(".index a")) : [];
  if (liens.length) {
    var liste = bloc.querySelector(".index");
    liste.setAttribute("role", "tablist");
    liste.setAttribute("aria-orientation", window.matchMedia("(max-width:1080px)").matches ? "horizontal" : "vertical");
    var fiches = {};
    liens.forEach(function (a) {
      var id = a.getAttribute("href").slice(1), f = document.getElementById(id);
      fiches[id] = f;
      a.parentNode.setAttribute("role", "presentation");
      a.setAttribute("role", "tab"); a.id = "onglet-" + id; a.setAttribute("aria-controls", id);
      f.setAttribute("role", "tabpanel"); f.setAttribute("aria-labelledby", a.id); f.setAttribute("tabindex", "-1");
      var img = f.querySelector(".fiche-visuel img"); if (img) { img.loading = "eager"; }
    });
    bloc.classList.add("onglets");
    var choisir = function (id, focus) {
      if (!fiches[id]) { return false; }
      liens.forEach(function (a) {
        var oui = a.getAttribute("aria-controls") === id;
        a.setAttribute("aria-selected", oui ? "true" : "false"); a.tabIndex = oui ? 0 : -1;
        a.classList.toggle("actif", oui);
        var f = fiches[a.getAttribute("aria-controls")];
        if (oui) { if (f.hidden) { f.hidden = false; f.classList.remove("entre"); void f.offsetWidth; f.classList.add("entre"); } }
        else { f.hidden = true; }
        if (oui && focus) { a.focus(); }
        if (oui && liste.scrollWidth > liste.clientWidth) { liste.scrollTo({ left: a.offsetLeft - 20, behavior: "smooth" }); }
      });
      return true;
    };
    liens.forEach(function (a, i) {
      a.addEventListener("click", function (ev) { ev.preventDefault(); choisir(a.getAttribute("aria-controls")); });
      a.addEventListener("keydown", function (ev) {
        var k = ev.key, j = null;
        if (k === "ArrowDown" || k === "ArrowRight") { j = (i + 1) % liens.length; }
        else if (k === "ArrowUp" || k === "ArrowLeft") { j = (i - 1 + liens.length) % liens.length; }
        else if (k === "Home") { j = 0; } else if (k === "End") { j = liens.length - 1; }
        if (j !== null) { ev.preventDefault(); choisir(liens[j].getAttribute("aria-controls"), true); }
      });
    });
    // Liens vers #paiegabon, #compta… (rangée de l'accueil, autres pages) : ouvrir l'onglet et y descendre.
    var depuisAdresse = function () {
      var id = location.hash.slice(1);
      if (choisir(id)) { document.getElementById("solutions").scrollIntoView(); return true; }
      return false;
    };
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (fiches[id] && !a.closest(".index")) {
        a.addEventListener("click", function (ev) {
          ev.preventDefault(); choisir(id);
          document.getElementById("solutions").scrollIntoView({ behavior: "smooth" });
          history.replaceState(null, "", "#" + id);
        });
      }
    });
    if (!depuisAdresse()) { choisir(liens[0].getAttribute("aria-controls")); }
    window.addEventListener("hashchange", depuisAdresse);
  }
})();
