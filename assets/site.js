// Menu mobile et année du pied de page. Aucune dépendance, aucun traceur.
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
})();
