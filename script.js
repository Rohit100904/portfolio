const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active"); // toggles X
});

// Scroll Animation
const sections = document.querySelectorAll("section");
const projectCards = document.querySelectorAll(".project-card");

const revealOnScroll = () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
  projectCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      card.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);/* 3D Data Tunnel / Starfield Animation */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 500;
const speed = 0.05;

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = (Math.random() - 0.5) * canvas.width;
    this.y = (Math.random() - 0.5) * canvas.height;
    this.z = Math.random() * canvas.width;
  }

  update() {
    this.z -= speed * canvas.width * 0.02;
    if (this.z <= 0) {
      this.reset();
      this.z = canvas.width;
    }
  }

  draw() {
    let scale = 300 / this.z;
    let x = canvas.width / 2 + this.x * scale;
    let y = canvas.height / 2 + this.y * scale;

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      this.reset();
      return;
    }

    let size = (1 - this.z / canvas.width) * 3;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 200, 255, ${1 - this.z / canvas.width})`;
    ctx.fill();
  }
}

function init() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.fillStyle = "rgba(5, 8, 15, 0.5)"; // subtle trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    star.update();
    star.draw();
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
