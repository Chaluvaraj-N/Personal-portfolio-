// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const nav = document.getElementById("nav")
const header = document.getElementById("header")
const navLinks = document.querySelectorAll(".nav-link")
const filterBtns = document.querySelectorAll(".filter-btn")
const projects = document.querySelectorAll(".project")
const contactForm = document.getElementById("contact-form")
const animateElements = document.querySelectorAll(".animate-on-scroll")
const skillBars = document.querySelectorAll(".skill-progress")

// Theme Toggle Functionality
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateThemeIcon(savedTheme)
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  icon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon"
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  nav.classList.toggle("active")
  const icon = mobileMenuToggle.querySelector("i")
  icon.className = nav.classList.contains("active") ? "bx bx-x" : "bx bx-menu"
}

// Smooth Scrolling and Active Navigation
function updateActiveNav() {
  const sections = document.querySelectorAll(".section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

// Sticky Header
function handleScroll() {
  if (window.scrollY > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  updateActiveNav()
  animateOnScroll()
  animateSkillBars()
}

// Project Filtering
function filterProjects(category) {
  projects.forEach((project) => {
    const projectCategories = project.getAttribute("data-category").split(" ")

    if (category === "all" || projectCategories.includes(category)) {
      project.classList.remove("hidden")
    } else {
      project.classList.add("hidden")
    }
  })
}

// Form Validation
function validateForm(formData) {
  const errors = {}

  // Name validation
  if (!formData.name.trim()) {
    errors.name = "Name is required"
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email.trim()) {
    errors.email = "Email is required"
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Subject validation
  if (!formData.subject.trim()) {
    errors.subject = "Subject is required"
  } else if (formData.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters"
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = "Message is required"
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters"
  }

  return errors
}

function displayErrors(errors) {
  // Clear previous errors
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
  })

  // Display new errors
  Object.keys(errors).forEach((field) => {
    const errorElement = document.getElementById(`${field}-error`)
    if (errorElement) {
      errorElement.textContent = errors[field]
    }
  })
}

function handleFormSubmit(e) {
  e.preventDefault()

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  }

  const errors = validateForm(formData)

  if (Object.keys(errors).length === 0) {
    // Form is valid
    const submitBtn = document.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="bx bx-loader-alt bx-spin"></i>'
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  } else {
    displayErrors(errors)
  }
}

// Scroll Animations
function animateOnScroll() {
  animateElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animated")
    }
  })
}

// Skill Bar Animation
function animateSkillBars() {
  skillBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top
    const barVisible = 150

    if (barTop < window.innerHeight - barVisible && !bar.classList.contains("animated")) {
      const width = bar.getAttribute("data-width")
      bar.style.width = width
      bar.classList.add("animated")
    }
  })
}

// Navigation Link Click Handler
function handleNavClick(e) {
  e.preventDefault()
  const targetId = this.getAttribute("href")
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }

  // Close mobile menu if open
  if (nav.classList.contains("active")) {
    toggleMobileMenu()
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme()

  // Initial animations
  setTimeout(() => {
    animateOnScroll()
    animateSkillBars()
  }, 100)

  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", toggleMobileMenu)

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleNavClick)
  })

  // Project filters
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      // Filter projects
      const category = this.getAttribute("data-filter")
      filterProjects(category)
    })
  })

  // Contact form
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit)
  }

  // Scroll events
  window.addEventListener("scroll", handleScroll)

  // Resize events
  window.addEventListener("resize", () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && nav.classList.contains("active")) {
      toggleMobileMenu()
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("active") && !nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      toggleMobileMenu()
    }
  })
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape" && nav.classList.contains("active")) {
    toggleMobileMenu()
  }

  // Theme toggle with Ctrl/Cmd + Shift + T
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "T") {
    e.preventDefault()
    toggleTheme()
  }
})

// Smooth scroll polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = (target, duration = 1000) => {
    const targetPosition = target.offsetTop - 80
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const run = ease(timeElapsed, startPosition, distance, duration)
      window.scrollTo(0, run)
      if (timeElapsed < duration) requestAnimationFrame(animation)
    }

    function ease(t, b, c, d) {
      t /= d / 2
      if (t < 1) return (c / 2) * t * t + b
      t--
      return (-c / 2) * (t * (t - 2) - 1) + b
    }

    requestAnimationFrame(animation)
  }

  // Override the smooth scroll behavior
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        smoothScrollPolyfill(targetSection)
      }
    })
  })
}
