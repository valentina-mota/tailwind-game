document.addEventListener("DOMContentLoaded", function () {
  const gridButton = document.querySelector(".grid");
  const listButton = document.querySelector(".list");
  const portfolioItems = document.querySelector(".portfolio-items");
  const portfolioItemElements = document.querySelectorAll(".portfolio-item");
  const portfolioItemImages = document.querySelectorAll(
    ".portfolio-item-image"
  );
  const portfolioItemContents = document.querySelectorAll(
    ".portfolio-item-content"
  );
  const filterButtons = document.querySelectorAll(".filter-button");
  const loadMoreButton = document.getElementById("toggle-projects");

  let visibleItemsCount = 4;
  let currentFilter = "all";

  // Funzione per impostare la visualizzazione griglia o lista
  function setViewMode(mode) {
    portfolioItems.classList.remove("grid-view", "list-view");
    portfolioItems.classList.add(`${mode}-view`);

    portfolioItemElements.forEach((item) =>
      item.classList.toggle("list-view", mode === "list")
    );
    portfolioItemImages.forEach((image) =>
      image.classList.toggle("list-view", mode === "list")
    );
    portfolioItemContents.forEach((content) =>
      content.classList.toggle("list-view", mode === "list")
    );
  }

  // Eventi per cambiare la visualizzazione
  gridButton.addEventListener("click", () => setViewMode("grid"));
  listButton.addEventListener("click", () => setViewMode("list"));

  // Funzione per mostrare i progetti in base al filtro e al conteggio visibile
  function showProjects(filter, count) {
    let shownItems = 0;

    portfolioItemElements.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        if (shownItems < count) {
          item.classList.remove("hidden");
          shownItems++;
        } else {
          item.classList.add("hidden");
        }
      } else {
        item.classList.add("hidden");
      }
    });

    // Gestisce il pulsante "Load more"
    loadMoreButton.style.display = shownItems < count ? "none" : "block";
    loadMoreButton.textContent =
      shownItems >= portfolioItemElements.length ? "Show less" : "Load more";
  }

  // Mostra i primi 4 progetti inizialmente
  showProjects(currentFilter, visibleItemsCount);

  // Event listener per il pulsante "Load more/Show less"

  // loadMoreButton.addEventListener("click", function () {
  //   if (loadMoreButton.textContent === "Show less") {
  //     visibleItemsCount = 4; // Torna ai primi 4 elementi
  //   } else {
  //     visibleItemsCount += 2; // Mostra 2 elementi in più
  //   }
  //   showProjects(currentFilter, visibleItemsCount);
  // });

  loadMoreButton.addEventListener("click", function () {
    if (loadMoreButton.textContent === "Show less") {
      visibleItemsCount = 4; // Torna ai primi 4 elementi
    } else {
      visibleItemsCount = Math.min(
        visibleItemsCount + 2,
        portfolioItemElements.length
      ); // Incrementa dinamicamente senza superare il numero massimo
    }
    showProjects(currentFilter, visibleItemsCount);
  });

  // Filtraggio dei progetti con evidenziazione del pulsante attivo
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      currentFilter = button.getAttribute("data-category");
      visibleItemsCount = 4; // Reset conteggio visibile quando si cambia filtro
      showProjects(currentFilter, visibleItemsCount);
      loadMoreButton.textContent = "Load more";
    });
  });
});

//cambio altezza banner on scroll
let banner = document.querySelector(".banner");
let svgContainer = document.querySelector(".profile-svg-container");
let nav = document.querySelector("nav");
let bottoneTornaSu = document.getElementById("torna-su");

const mediaQuery = window.matchMedia("(max-width: 768px)");

document.addEventListener("scroll", gestisciScroll);

bottoneTornaSu.addEventListener("click", gestisciBottoneTornaSu);

function gestisciBottoneTornaSu() {
  event.preventDefault();
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function gestisciScroll() {
  let quantitaScroll =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // Logica per gli elementi che dipendono dalla media query
  if (!mediaQuery.matches) {
    if (quantitaScroll > 10) {
      banner.style.borderBottom = "1px solid gray";
      banner.style.opacity = ".8";
      banner.style.height = "80px";
      banner.style.boxShadow = "5px 5px 5px rgba(128, 128, 128, .6)";
      banner.style.paddingLeft = "9rem";
      banner.style.paddingRight = "9rem";
      banner.style.paddingBottom = "40px";
      svgContainer.style.scale = ".6";
      svgContainer.style.paddingTop = "10px";
      nav.style.scale = ".9";
      nav.style.paddingBottom = "20px";
    } else {
      banner.style.height = "150px";
      banner.style.opacity = "1";
      svgContainer.style.scale = "";
      svgContainer.style.paddingTop = "";
      banner.style.borderBottom = "none";
      banner.style.boxShadow = "none";
      banner.style.paddingLeft = "";
      banner.style.paddingRight = "";
      banner.style.paddingBottom = "";
      nav.style.scale = "1";
      nav.style.paddingBottom = "";
    }
  }

  // Mostra il bottone torna-su solo dopo 300px di scroll
  if (quantitaScroll > 300) {
    bottoneTornaSu.style.left = "calc(100vw - 65px)";
    bottoneTornaSu.style.opacity = "1"; // Opzionale per transizione di visibilità
  } else {
    bottoneTornaSu.style.left = "calc(100vw - 65px)";
    bottoneTornaSu.style.opacity = "0"; // Nasconde il bottone sotto i 300px
  }
}

//hover call to action
const buttonsCallToAction = document.querySelectorAll(".call-to-action");

buttonsCallToAction.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.innerHTML = "&nbsp;&nbsp;Contact me!&nbsp;&nbsp;";
  });

  button.addEventListener("mouseout", () => {
    button.innerHTML = "Start a project";
  });
});

// Aggiornamento anno dinamico nel footer
document.getElementById("year").textContent = new Date().getFullYear();

//menu mobile
let icons = document.querySelector(".icons");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
let navbarOverlay = document.querySelector(".navbar-overlay");
const overlayLinks = document.querySelectorAll(".navbar-overlay a");
let isMenuOpen = false;

function toggleMenu(event) {
  event.stopPropagation();
  console.log("toggleMenu triggered");

  bar1.classList.toggle("change");
  bar2.classList.toggle("change");
  bar3.classList.toggle("change");

  if (
    bar1.classList.contains("change") &&
    bar2.classList.contains("change") &&
    bar3.classList.contains("change")
  ) {
    navbarOverlay.style.height = "50vh";
    overlayLinks.forEach((link, index) => {
      link.style.transform = "translateY(0px)";
      link.style.opacity = "1";
      link.style.transitionDelay = `calc(0.15s * ${index})`;
    });

    isMenuOpen = true;
    setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 100); // Abilita il listener dopo 100ms
  } else {
    closeMenu();
  }
}

function closeMenu() {
  console.log("closeMenu triggered");

  navbarOverlay.style.height = "0";
  overlayLinks.forEach((link) => {
    link.style.transform = "translateY(-50px)";
    link.style.opacity = "0";
    link.style.transitionDelay = "0s";
  });
  bar1.classList.remove("change");
  bar2.classList.remove("change");
  bar3.classList.remove("change");

  isMenuOpen = false;
  window.removeEventListener("click", handleClickOutside);
}

function handleClickOutside(event) {
  if (
    isMenuOpen &&
    !navbarOverlay.contains(event.target) &&
    !icons.contains(event.target)
  ) {
    closeMenu();
  }
}

icons.addEventListener("click", toggleMenu);

overlayLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Funzione semplice per verificare il touch su iPhone senza interferenze
function handleCloseMenu(event) {
  // Logga solo per capire se il tocco viene registrato
  console.log("Touch/click rilevato al di fuori dell'overlay o delle icone.");

  if (!icons.contains(event.target) && !navbarOverlay.contains(event.target)) {
    closeMenu(); // Chiude il menu solo se clicchi fuori
  }
}

// Usa solo `touchstart` senza `click` per iPhone
document.addEventListener("touchstart", handleCloseMenu);
