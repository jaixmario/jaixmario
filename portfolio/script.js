document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Core State & LocalStorage Keys
  // ==========================================
  const THEME_KEY = "jaideep-portfolio-theme-mode"; // 'dark' | 'light'
  const COLOR_THEME_KEY = "jaideep-portfolio-color-theme"; // 'theme-default', etc.
  const FONT_KEY = "jaideep-portfolio-font-theme"; // 'sans' | 'serif'

  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // ==========================================
  // 2. Light / Dark Mode Toggling
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");

  function applyThemeMode(mode) {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  }

  // Determine initial theme mode
  let savedTheme = localStorage.getItem(THEME_KEY);
  if (!savedTheme) {
    // Default to dark
    savedTheme = "dark";
  }
  applyThemeMode(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem(THEME_KEY, newTheme);
    applyThemeMode(newTheme);
  });

  // ==========================================
  // 3. Theme Customizer (Color & Font)
  // ==========================================
  const customizerBtn = document.getElementById("customizer-btn");
  const customizerPanel = document.getElementById("customizer-panel");
  const tabColorsBtn = document.getElementById("tab-colors-btn");
  const tabFontsBtn = document.getElementById("tab-fonts-btn");
  const tabColorsContent = document.getElementById("tab-colors-content");
  const tabFontsContent = document.getElementById("tab-fonts-content");

  // Toggle Customizer Panel
  customizerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = customizerBtn.getAttribute("aria-expanded") === "true";
    customizerBtn.setAttribute("aria-expanded", !isExpanded);
    customizerPanel.classList.toggle("hidden");
  });

  // Close Customizer on outside click
  document.addEventListener("click", (e) => {
    if (customizerPanel && !customizerPanel.classList.contains("hidden")) {
      if (!customizerPanel.contains(e.target) && e.target !== customizerBtn) {
        customizerPanel.classList.add("hidden");
        customizerBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Tabs Switching logic
  tabColorsBtn.addEventListener("click", () => {
    tabColorsBtn.className = "flex-1 py-1 rounded text-center bg-background text-foreground shadow-sm";
    tabFontsBtn.className = "flex-1 py-1 rounded text-center text-muted-foreground hover:text-foreground";
    tabColorsContent.classList.remove("hidden");
    tabFontsContent.classList.add("hidden");
  });

  tabFontsBtn.addEventListener("click", () => {
    tabFontsBtn.className = "flex-1 py-1 rounded text-center bg-background text-foreground shadow-sm";
    tabColorsBtn.className = "flex-1 py-1 rounded text-center text-muted-foreground hover:text-foreground";
    tabFontsContent.classList.remove("hidden");
    tabColorsContent.classList.add("hidden");
  });

  // Color selection
  const themeClasses = ["theme-default", "theme-purple", "theme-green", "theme-orange", "theme-teal"];
  const colorBtns = document.querySelectorAll(".theme-circle-btn");

  function applyColorTheme(themeClass) {
    // Remove other theme classes
    document.documentElement.classList.remove(...themeClasses);
    if (themeClass !== "theme-default") {
      document.documentElement.classList.add(themeClass);
    }
    
    // Update checks
    colorBtns.forEach((btn) => {
      const check = btn.querySelector(".check-icon");
      if (btn.getAttribute("data-theme") === themeClass) {
        check.classList.remove("hidden");
      } else {
        check.classList.add("hidden");
      }
    });
  }

  const savedColorTheme = localStorage.getItem(COLOR_THEME_KEY) || "theme-default";
  applyColorTheme(savedColorTheme);

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.getAttribute("data-theme");
      localStorage.setItem(COLOR_THEME_KEY, selectedTheme);
      applyColorTheme(selectedTheme);
    });
  });

  // Font switcher
  const fontSansBtn = document.getElementById("font-sans-btn");
  const fontSerifBtn = document.getElementById("font-serif-btn");

  function applyFontTheme(font) {
    if (font === "serif") {
      document.body.classList.add("font-serif");
      fontSerifBtn.classList.add("bg-primary", "text-primary-foreground");
      fontSerifBtn.classList.remove("border-border");
      fontSansBtn.classList.remove("bg-primary", "text-primary-foreground");
      fontSansBtn.classList.add("border-border");
    } else {
      document.body.classList.remove("font-serif");
      fontSansBtn.classList.add("bg-primary", "text-primary-foreground");
      fontSansBtn.classList.remove("border-border");
      fontSerifBtn.classList.remove("bg-primary", "text-primary-foreground");
      fontSerifBtn.classList.add("border-border");
    }
  }

  const savedFont = localStorage.getItem(FONT_KEY) || "sans";
  applyFontTheme(savedFont);

  fontSansBtn.addEventListener("click", () => {
    localStorage.setItem(FONT_KEY, "sans");
    applyFontTheme("sans");
  });

  fontSerifBtn.addEventListener("click", () => {
    localStorage.setItem(FONT_KEY, "serif");
    applyFontTheme("serif");
  });

  // ==========================================
  // 4. Smooth Scrolling & Active Section Highlighting
  // ==========================================
  const logoTitle = document.getElementById("logo-title");
  const header = document.getElementById("header");
  const navBtns = document.querySelectorAll(".nav-btn");
  const sections = Array.from(document.querySelectorAll("section[id]"));

  // Scroll to Top on logo click
  logoTitle.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Setup click triggers on all links
  document.querySelectorAll("[data-nav-target], [data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetId = btn.getAttribute("data-nav-target") || btn.getAttribute("data-scroll-to");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const offset = 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });

  // Header glassmorphism background transition on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("bg-background/80", "backdrop-blur-md", "shadow-sm");
      header.classList.remove("bg-transparent");
    } else {
      header.classList.remove("bg-background/80", "backdrop-blur-md", "shadow-sm");
      header.classList.add("bg-transparent");
    }

    // Determine current active section
    let activeSecId = "";
    const scrollPos = window.scrollY + 120; // threshold offset

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeSecId = sec.getAttribute("id");
      }
    });

    // Special edge case: scrolled to bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
      activeSecId = "contact";
    }

    // Apply active class to buttons
    navBtns.forEach((btn) => {
      const target = btn.getAttribute("data-nav-target");
      if (target === `#${activeSecId}`) {
        btn.classList.add("bg-primary", "text-primary-foreground");
        btn.classList.remove("hover:bg-muted");
      } else {
        btn.classList.remove("bg-primary", "text-primary-foreground");
        btn.classList.add("hover:bg-muted");
      }
    });
  });

  // ==========================================
  // 5. Mock Terminal Component
  // ==========================================
  const terminalCard = document.getElementById("terminal-card");
  const terminalBody = document.getElementById("terminal-body");
  const terminalHistory = document.getElementById("terminal-history");
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalMinimize = document.getElementById("terminal-minimize");
  const terminalRestore = document.getElementById("terminal-restore");
  const terminalClear = document.getElementById("terminal-clear");

  const terminalCommands = {
    help: "Available commands: help, about, skills, projects, contact, clear, github",
    about: "I am Jaideep, a passionate developer based in Delhi, India. I love building web applications and exploring new technologies.",
    skills: "Python, HTML, CSS, JavaScript, Node.js, C++, Django, Docker, Linux, Windows, Shell",
    projects: "Check out my projects section to see my latest work!",
    contact: "Email: Mario22623@gmail.com\nGitHub: github.com/jaixmario",
    github: "Opening GitHub profile...",
    clear: ""
  };

  function scrollTerminal() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Click on terminal body focuses input
  terminalBody.addEventListener("click", () => {
    terminalInput.focus();
  });

  // Minimize terminal logic
  terminalMinimize.addEventListener("click", (e) => {
    e.stopPropagation();
    terminalCard.classList.add("hidden");
    terminalRestore.classList.remove("hidden");
  });

  terminalRestore.addEventListener("click", () => {
    terminalCard.classList.remove("hidden");
    terminalRestore.classList.add("hidden");
    terminalInput.focus();
    scrollTerminal();
  });

  // Clear button logic
  terminalClear.addEventListener("click", (e) => {
    e.stopPropagation();
    terminalHistory.innerHTML = `
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-primary">$</span>
          <span class="text-foreground">whoami</span>
        </div>
        <div class="pl-5 text-gray-300 whitespace-pre-line">Jaideep - Developer from Delhi, India</div>
      </div>
    `;
    scrollTerminal();
  });

  // Form submit command handling
  terminalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cmd = terminalInput.value.trim();
    if (cmd === "") return;

    const lowerCmd = cmd.toLowerCase();
    let response = "";

    if (lowerCmd === "clear") {
      terminalHistory.innerHTML = "";
      terminalInput.value = "";
      return;
    }

    if (lowerCmd === "github") {
      window.open("https://github.com/jaixmario", "_blank");
      response = "Opening GitHub profile in a new tab...";
    } else {
      response = terminalCommands[lowerCmd] || `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    // Append to history
    const historyBlock = document.createElement("div");
    historyBlock.className = "space-y-1";
    historyBlock.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-primary">$</span>
        <span class="text-foreground">${cmd}</span>
      </div>
      <div class="pl-5 text-gray-300 whitespace-pre-line">${response}</div>
    `;
    terminalHistory.appendChild(historyBlock);

    // Reset and scroll
    terminalInput.value = "";
    scrollTerminal();
  });

  // ==========================================
  // 6. Project Filters Setup
  // ==========================================
  const filterContainer = document.getElementById("project-filters");
  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  // Extract tags from DOM elements
  const allTags = new Set();
  projectCards.forEach((card) => {
    const tagsString = card.getAttribute("data-tags");
    if (tagsString) {
      tagsString.split(",").forEach((t) => allTags.add(t.trim()));
    }
  });

  // Add buttons dynamically
  allTags.forEach((tag) => {
    const btn = document.createElement("button");
    btn.setAttribute("data-filter", tag);
    btn.className = "filter-btn px-4 py-1.5 rounded-full text-sm font-medium bg-background border border-border text-foreground hover:bg-muted transition-all duration-200";
    btn.innerText = tag;
    filterContainer.appendChild(btn);
  });

  // Setup click events on filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");

      // Update button visual styles
      filterBtns.forEach((b) => {
        if (b === btn) {
          b.className = "filter-btn px-4 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground transition-all duration-200";
        } else {
          b.className = "filter-btn px-4 py-1.5 rounded-full text-sm font-medium bg-background border border-border text-foreground hover:bg-muted transition-all duration-200";
        }
      });

      // Filter cards
      projectCards.forEach((card) => {
        const cardTags = card.getAttribute("data-tags").split(",");
        if (selectedFilter === "all" || cardTags.includes(selectedFilter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ==========================================
  // 7. GitHub API Integrations
  // ==========================================
  const username = "jaixmario";
  const avatarImg = document.getElementById("avatar-img");
  const ghAvatar = document.getElementById("gh-avatar");
  const ghName = document.getElementById("gh-name");
  const ghBio = document.getElementById("gh-bio");
  const ghLocation = document.getElementById("gh-location");
  const ghBlog = document.getElementById("gh-blog");
  const ghFollowers = document.getElementById("gh-followers");
  const ghLink = document.getElementById("gh-link");

  const ghProfileCard = document.getElementById("github-profile-card");
  const ghProfileLoading = document.getElementById("github-profile-loading");
  const ghProfileError = document.getElementById("github-profile-error");
  const ghProfileContent = document.getElementById("github-profile-content");

  const statsRepos = document.getElementById("stats-repos");
  const statsStars = document.getElementById("stats-stars");
  const statsForks = document.getElementById("stats-forks");
  const reposGrid = document.getElementById("repos-grid");

  // Fetch GitHub User Profile
  async function fetchGitHubProfile() {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("Profile API response was not OK");
      const data = await res.json();

      // Update hero avatar
      if (data.avatar_url) {
        avatarImg.src = data.avatar_url;
        ghAvatar.src = data.avatar_url;
      }

      // Update profile card details
      ghName.innerText = data.name || data.login;
      ghBio.innerText = data.bio || "No biography provided";
      ghLocation.innerText = data.location || "Earth";
      
      if (data.blog) {
        const blogUrl = data.blog.startsWith("http") ? data.blog : `https://${data.blog}`;
        ghBlog.innerText = data.blog;
        ghBlog.href = blogUrl;
        ghBlog.parentElement.classList.remove("hidden");
      } else {
        ghBlog.parentElement.classList.add("hidden");
      }

      ghFollowers.innerText = `${data.followers} followers`;
      ghLink.href = data.html_url;

      // Swap loader with content
      ghProfileLoading.classList.add("hidden");
      ghProfileContent.classList.remove("hidden");
    } catch (err) {
      console.error("Error loading Github profile data:", err);
      ghProfileLoading.classList.add("hidden");
    }
  }

  // Helper function to fetch color for coding languages
  function getLangColor(lang) {
    const colors = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      "C++": "bg-purple-500",
      HTML: "bg-orange-500",
      CSS: "bg-pink-500",
      Shell: "bg-gray-600",
    };
    return colors[lang] || "bg-gray-500";
  }

  // Fetch repositories & calculate stats
  async function fetchGitHubRepos() {
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!res.ok) throw new Error("Repos API response was not OK");
      const data = await res.json();

      // Set repositories count
      statsRepos.innerText = data.length;

      // Calculate totals
      let totalStars = 0;
      let totalForks = 0;
      data.forEach((repo) => {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
      });

      statsStars.innerText = totalStars;
      statsForks.innerText = totalForks;

      // Filter grid to show: free-games-notifier, Authenticator-extension
      const featuredRepoNames = ["free-games-notifier", "Authenticator-extension"];
      const featuredRepos = data.filter((repo) => featuredRepoNames.includes(repo.name));

      // Build grid items HTML
      reposGrid.innerHTML = "";
      if (featuredRepos.length === 0) {
        reposGrid.innerHTML = `
          <div class="p-8 border border-muted rounded-lg col-span-full text-center text-muted-foreground">
            No specified repositories found on GitHub.
          </div>
        `;
        return;
      }

      featuredRepos.forEach((repo) => {
        const repoCard = document.createElement("div");
        repoCard.className = "bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full";
        
        const homepageLink = repo.homepage 
          ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200" title="Home page">
               <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                 <polyline points="15 3 21 3 21 9"></polyline>
                 <line x1="10" y1="14" x2="21" y2="3"></line>
               </svg>
             </a>`
          : "";

        repoCard.innerHTML = `
          <div class="p-5 flex-grow space-y-2">
            <h4 class="font-bold text-foreground text-lg">${repo.name}</h4>
            <p class="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              ${repo.description || "No description provided"}
            </p>
            ${repo.language ? `
              <div class="flex items-center gap-2 pt-2">
                <span class="h-3 w-3 rounded-full ${getLangColor(repo.language)} inline-block"></span>
                <span class="text-xs text-muted-foreground">${repo.language}</span>
              </div>
            ` : ""}
          </div>
          <div class="px-5 py-4 border-t border-border/50 flex justify-between items-center text-xs">
            <div class="flex gap-4 items-center">
              <div class="flex items-center gap-1 text-muted-foreground">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>${repo.stargazers_count}</span>
              </div>
              <div class="flex items-center gap-1 text-muted-foreground">
                <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="18" r="3"></circle>
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M18 15V9a4 4 0 0 0-4-4H9"></path>
                  <line x1="6" y1="9" x2="6" y2="15"></line>
                </svg>
                <span>${repo.forks_count}</span>
              </div>
            </div>
            <div class="flex gap-2 items-center">
              ${homepageLink}
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200" title="Github link">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>
        `;
        reposGrid.appendChild(repoCard);
      });
    } catch (err) {
      console.error("Error loading Github repositories data:", err);
      // Fallback UI inside repoGrid
      reposGrid.innerHTML = `
        <div class="p-5 border border-destructive/20 rounded-lg bg-destructive/10 col-span-full text-center">
          <p class="text-destructive text-sm font-semibold mb-2">Failed to load details from GitHub</p>
          <button id="retry-repos-btn" class="px-3 py-1 bg-background border border-border text-foreground hover:bg-muted text-xs font-semibold rounded shadow-sm">
            Try Again
          </button>
        </div>
      `;
      document.getElementById("retry-repos-btn").addEventListener("click", () => {
        reposGrid.innerHTML = `
          <div class="github-repo-card-loading flex justify-center items-center h-44 border border-dashed border-border rounded-lg py-4 col-span-full">
            <svg class="animate-spin h-6 w-6 text-primary mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-muted-foreground font-medium">Fetching repositories from GitHub...</span>
          </div>
        `;
        fetchGitHubRepos();
      });
    }
  }

  // Execute APIs
  fetchGitHubProfile();
  fetchGitHubRepos();

  // ==========================================
  // 8. Footer Year setup
  // ==========================================
  document.getElementById("year").innerText = new Date().getFullYear();
});
