/**
 * Dynamic Motion & Canvas Animation Script
 * Portfolio: Manas Mallik | Mechanical Design Engineer
 */

document.addEventListener("DOMContentLoaded", () => {
  initPhotoUploader();
  initSmoothScroll();
  initTiltEffect();
  initCanvasParticleHUD();
  initTelemetryCounter();
});

/* 1. Base64 Persistent Photo Upload Engine */
function initPhotoUploader() {
  const photoUpload = document.getElementById("photo-upload");
  const profileImg = document.getElementById("profile-img");
  const profilePlaceholder = document.getElementById("profile-placeholder");

  if (!photoUpload || !profileImg) return;

  const savedPhoto = localStorage.getItem("manas_portfolio_photo");
  if (savedPhoto) {
    profileImg.src = savedPhoto;
    profileImg.classList.remove("hidden");
    if (profilePlaceholder) profilePlaceholder.classList.add("hidden");
  }

  photoUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64Image = event.target.result;
        profileImg.src = base64Image;
        profileImg.classList.remove("hidden");
        if (profilePlaceholder) profilePlaceholder.classList.add("hidden");
        localStorage.setItem("manas_portfolio_photo", base64Image);
      };
      reader.readAsDataURL(file);
    }
  });
}

/* 2. Smooth Scrolling for Navigation Links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

/* 3. Interactive 3D Card Tilt Effect on Hover */
function initTiltEffect() {
  const cards = document.querySelectorAll("#skills > div > div, #projects > div > div");

  cards.forEach((card) => {
    card.style.transition = "transform 0.15s ease-out, box-shadow 0.15s ease-out";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      card.style.boxShadow = "0 10px 25px -5px rgba(6, 182, 212, 0.15)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.boxShadow = "none";
    });
  });
}

/* 4. Interactive HUD Grid Floating Nodes */
function initCanvasParticleHUD() {
  const canvas = document.createElement("canvas");
  canvas.id = "hud-motion-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  canvas.style.opacity = "0.3";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.strokeStyle = `rgba(14, 116, 144, ${1 - dist / 110})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* 5. Live CAD Telemetry Rotator */
function initTelemetryCounter() {
  const statusElem = document.getElementById("solver-status");
  if (!statusElem) return;

  const statusStates = [
    "SOLVER: ANSYS Fluent (Shockwave CFD)",
    "MESH: 1.2M Cells (Hexahedral)",
    "PRESSURE: 1.42 MPa Peak Shock",
    "ITERATION: 1500/1500 [CONVERGED]"
  ];

  let index = 0;
  setInterval(() => {
    index = (index + 1) % statusStates.length;
    statusElem.textContent = statusStates[index];
  }, 3500);
}
