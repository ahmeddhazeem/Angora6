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

      if (window.innerWidth < 1024 && sidebar) {
        sidebar.classList.add("-translate-x-full");
      }
    });
  });

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });
  }

  
  const NASA_API_KEY = "DEMO_KEY"; 
  const apodImage = document.querySelector("#today-in-space img");
  const apodTitle = document.querySelector("#today-in-space h3");
  const apodExplanation = document.querySelector("#today-in-space p");
  const apodDateHeader = document.getElementById("apod-date");
  const apodDateInput = document.getElementById("apod-date-input");
  const apodDateDisplay = document.getElementById("apod-date-display");
  const loadDateBtn = document.getElementById("load-date-btn");
  const todayApodBtn = document.getElementById("today-apod-btn");

  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  async function fetchAPOD(dateStr = "") {
    try {
      let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
      if (dateStr) {
        url += `&date=${dateStr}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.media_type === "image" && apodImage) {
        apodImage.src = data.url;
      }
      if (apodTitle) apodTitle.textContent = data.title;
      if (apodExplanation) apodExplanation.textContent = data.explanation;
      if (apodDateHeader) {
        apodDateHeader.textContent = `Astronomy Picture of the Day - ${data.date}`;
      }
      if (apodDateDisplay && data.date) {
        apodDateDisplay.textContent = formatDate(data.date);
      }
    } catch (err) {
      console.error("APOD Fetch Error:", err);
    }
  }

  fetchAPOD();

  if (apodDateInput && apodDateDisplay) {
    apodDateInput.addEventListener("change", (e) => {
      apodDateDisplay.textContent = formatDate(e.target.value);
    });
  }

  if (loadDateBtn && apodDateInput) {
    loadDateBtn.addEventListener("click", () => {
      if (apodDateInput.value) {
        fetchAPOD(apodDateInput.value);
      }
    });
  }

  if (todayApodBtn) {
    todayApodBtn.addEventListener("click", () => {
      fetchAPOD();
    });
  }


  async function fetchPlanets() {
    try {
      // Direct endpoint from your documentation
      const res = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
      const data = await res.json();
      
      console.log("Planets Data:", data);
      
      // If data is returned as an array or object containing planets:
      const planetsList = Array.isArray(data) ? data : data.bodies || data.planets;
      
      if (planetsList) {
        const planetCards = document.querySelectorAll(".planet-card");
        planetCards.forEach((card, index) => {
          if (planetsList[index]) {
            const planet = planetsList[index];
            const nameEl = card.querySelector("h4") || card.querySelector("h3");
            if (nameEl) nameEl.textContent = planet.englishName || planet.name;
          }
        });
      }
    } catch (err) {
      console.error("Planets Fetch Error:", err);
    }
  }

  fetchPlanets();


  async function fetchLaunches() {
    try {
      // Exact Development URL from your documentation
      const res = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
      const data = await res.json();

      console.log("Launches Data:", data);

      const launchesList = data.results || data;
      const launchCards = document.querySelectorAll("#launches .grid > div, #launches .bg-slate-900\\/50");

      if (launchesList && launchCards.length > 0) {
        launchesList.forEach((launch, idx) => {
          if (launchCards[idx]) {
            const card = launchCards[idx];
            const img = card.querySelector("img");
            const title = card.querySelector("h3") || card.querySelector("h4");
            const status = card.querySelector("span");

            if (img && (launch.image || launch.image?.image_url)) {
              img.src = launch.image?.image_url || launch.image;
            }
            if (title) title.textContent = launch.name;
            if (status) status.textContent = launch.status?.name || "Upcoming";
          }
        });
      }
    } catch (err) {
      console.error("Launches Fetch Error:", err);
    }
  }

  fetchLaunches();
});