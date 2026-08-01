document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.querySelectorAll(".nav-link");
  const appSections = document.querySelectorAll(".app-section");
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");

  function switchSection(targetSectionId) {
    appSections.forEach((section) => {
      if (section.id === targetSectionId) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

   
    navLinks.forEach((link) => {
      const isTarget = link.getAttribute("data-section") === targetSectionId;
      if (isTarget) {
        link.classList.add("bg-blue-500/10", "text-blue-400");
        link.classList.remove("text-slate-300", "hover:bg-slate-800");
      } else {
        link.classList.remove("bg-blue-500/10", "text-blue-400");
        link.classList.add("text-slate-300", "hover:bg-slate-800");
      }
    });
  }

 
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute("data-section");
      switchSection(targetSection);

      // Close mobile sidebar if open after clicking a link
      if (window.innerWidth < 1024) {
        sidebar.classList.add("-translate-x-full");
      }
    });
  });


  if (sidebarToggle) {
    // Initial mobile state: hidden off-screen
    if (window.innerWidth < 1024) {
      sidebar.classList.add("-translate-x-full");
    }

    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });
  }


  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      sidebar.classList.remove("-translate-x-full");
    } else {
      sidebar.classList.add("-translate-x-full");
    }
  });

  
  const apodDateInput = document.getElementById("apod-date-input");
  const apodDateDisplay = apodDateInput?.nextElementSibling;
  const loadDateBtn = document.getElementById("load-date-btn");
  const todayApodBtn = document.getElementById("today-apod-btn");
  const apodDateHeader = document.getElementById("apod-date");


  function formatDate(dateStr) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  }

 
  const todayStr = new Date().toISOString().split("T")[0];
  if (apodDateInput) {
    apodDateInput.max = todayStr;
  }

  
  if (apodDateInput && apodDateDisplay) {
    apodDateInput.addEventListener("change", (e) => {
      apodDateDisplay.textContent = formatDate(e.target.value);
    });
  }

 
  if (loadDateBtn) {
    loadDateBtn.addEventListener("click", () => {
      const selectedDate = apodDateInput.value;
      if (apodDateHeader) {
        apodDateHeader.textContent = `Astronomy Picture of the Day - ${formatDate(selectedDate)}`;
      }
    
    });
  }

 
  if (todayApodBtn) {
    todayApodBtn.addEventListener("click", () => {
      if (apodDateInput) {
        apodDateInput.value = todayStr;
        if (apodDateDisplay) apodDateDisplay.textContent = formatDate(todayStr);
      }
      if (apodDateHeader) {
        apodDateHeader.textContent = `Astronomy Picture of the Day - ${formatDate(todayStr)}`;
      }
     
    });
  }

  
  const planetCards = document.querySelectorAll(".planet-card");
  const planetDetailName = document.getElementById("planet-detail-name");
  const planetDetailImage = document.getElementById("planet-detail-image");

  planetCards.forEach((card) => {
    card.addEventListener("click", () => {
      const planetId = card.getAttribute("data-planet-id");
      const planetName = card.querySelector("h4")?.textContent;
      const planetImgSrc = card.querySelector("img")?.src;

      if (planetDetailName && planetName) {
        planetDetailName.textContent = planetName;
      }
      if (planetDetailImage && planetImgSrc) {
        planetDetailImage.src = planetImgSrc;
        planetDetailImage.alt = `${planetName} rendering`;
      }
    });
  });
});