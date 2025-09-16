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
window.addEventListener("load", revealOnScroll);
/* Interactive Neural Network Background */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: null,
  y: null,
  radius: 150 // interaction range
};

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Node {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speedX = (Math.random() - 0.5) * 1.2;
    this.speedY = (Math.random() - 0.5) * 1.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // bounce at edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    // interactive mouse effect
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      this.x -= dx / 20;
      this.y -= dy / 20;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#1abc9c"; // neon green
    ctx.fill();
  }
}

let nodes = [];
function init() {
  nodes = [];
  for (let i = 0; i < 90; i++) {
    nodes.push(new Node());
  }
}

function connectNodes() {
  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      let dx = nodes[a].x - nodes[b].x;
      let dy = nodes[a].y - nodes[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        let opacity = 1 - dist / 140;
        if (mouse.x && Math.abs(mouse.x - nodes[a].x) < mouse.radius && Math.abs(mouse.y - nodes[a].y) < mouse.radius) {
          ctx.strokeStyle = `rgba(26,188,156,${opacity + 0.3})`; // brighter near mouse
        } else {
          ctx.strokeStyle = `rgba(26,188,156,${opacity})`;
        }
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  nodes.forEach(node => {
    node.update();
    node.draw();
  });
  connectNodes();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();
