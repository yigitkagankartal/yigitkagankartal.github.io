console.log("Kişisel web sitesi yüklendi.");

// 1) Linklere küçük "press" efekti
const pressables = document.querySelectorAll("a");

pressables.forEach((el) => {
  el.addEventListener("mousedown", () => {
    el.classList.add("is-pressed");
  });

  el.addEventListener("mouseup", () => {
    el.classList.remove("is-pressed");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("is-pressed");
  });
});

// 2) Sidebar nav linkleri: click'te smooth scroll
const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
const navLinksArr = Array.from(navLinks);

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();

        // scroll-margin-top'u hesaba katarak manuel scroll
        const rect = target.getBoundingClientRect();
        const offset = 120; // CSS'teki scroll-margin-top'a yakın
        const targetY = window.scrollY + rect.top - offset;

        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
      }
    }
  });
});

// 3) Scroll'a göre aktif section'ı manuel hesapla (tutukluk fix'li)
const sections = document.querySelectorAll("main .section");

// varsayılan aktif id: ilk section
let currentActiveId = sections.length ? sections[0].id : null;

function updateActiveNav() {
  if (!sections.length) return;

  const viewportHeight = window.innerHeight;
  const triggerLine = viewportHeight * 0.25; // ekranın üst %25'i

  // varsayılan olarak önceki aktif id'yi koru
  let newActiveId = currentActiveId;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    // Section'ın üstü triggerLine'ın üstüne geçmiş ve altı hâlâ ekran içindeyse aktif say
    if (rect.top <= triggerLine && rect.bottom > triggerLine) {
      newActiveId = section.id;
    }
  });

  // Eğer aktif id değiştiyse nav'ı güncelle
  if (newActiveId !== currentActiveId) {
    currentActiveId = newActiveId;

    navLinksArr.forEach((link) => {
      const targetId = link.getAttribute("href").replace("#", "");
      if (targetId === currentActiveId) {
        if (!link.classList.contains("active")) {
          link.classList.add("active", "just-activated");
          setTimeout(() => link.classList.remove("just-activated"), 400);
        }
      } else {
        link.classList.remove("active");
      }
    });
  }
}

// Sayfa yüklenince ve scroll oldukça çalıştır
window.addEventListener("load", updateActiveNav);
window.addEventListener("scroll", updateActiveNav);

// 4) Mouse spotlight (ışık efekti)
const cursorLight = document.querySelector(".cursor-light");

if (cursorLight) {
  window.addEventListener("mousemove", (e) => {
    cursorLight.style.setProperty("--mouse-x", `${e.clientX}px`);
    cursorLight.style.setProperty("--mouse-y", `${e.clientY}px`);
  });
}
// Astronaut Portal Button
const astro = document.querySelector(".astro-btn");
const portal = document.getElementById("portal");
const closeBtn = document.querySelector(".portal-close");

astro.addEventListener("click", () => {
    portal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    portal.classList.remove("active");
});
// ---------- CV DROPDOWN TOGGLE (CLICK ile Aç / Kapat) ----------

const cvWrapper = document.querySelector(".cv-wrapper");
const cvButton = document.querySelector(".cv-button");

if (cvWrapper && cvButton) {
  cvButton.addEventListener("click", (e) => {
    e.stopPropagation(); // dışarıya tıklama event'i gitmesin

    // Aç / kapa
    const isOpen = cvWrapper.classList.contains("open");
    if (isOpen) {
      cvWrapper.classList.remove("open");
    } else {
      cvWrapper.classList.add("open");

      // mini bounce animasyonu
      cvButton.classList.remove("cv-bounce");
      void cvButton.offsetWidth; // reflow
      cvButton.classList.add("cv-bounce");
    }
  });

  // Dropdown içindeyken kapanmasın diye, içerikteki tıklamayı da durdur
  const cvDropdown = cvWrapper.querySelector(".cv-dropdown");
  if (cvDropdown) {
    cvDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Sayfanın başka bir yerine tıklanınca kapat
  window.addEventListener("click", () => {
    cvWrapper.classList.remove("open");
  });
}

