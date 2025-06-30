const message = `Wishing you endless happiness, success, and love in every step you take💖!
🌸 May your dreams come true and your smile never fade. 🌸
You're strong, kind, and truly special — never forget that.
Keep shining, "my dear friend!"

Wishing you sparkle, joy, and endless smiles today and always. 💖\n\n`;

let index = 0;
function typeWriter() {
  const textBox = document.getElementById("typedText");
  if (index < message.length) {
    textBox.innerHTML += message.charAt(index);
    index++;
    setTimeout(typeWriter, 40);
  }
}

let slideIndex = 0;
let imgEl;
const images = [
  "images/photo1.jpg", "images/photo2.jpg", "images/photo3.jpg",
  "images/photo4.jpg", "images/photo5.jpg", "images/photo6.jpg",
  "images/photo7.jpg", "images/photo8.jpg", "images/photo9.jpg",
  "images/photo10.jpg"
];

function startSlideshow() {
  imgEl = document.getElementById("slideImg");
  imgEl.src = images[slideIndex];
}
function showSlide(index) {
  slideIndex = (index + images.length) % images.length;
  imgEl.src = images[slideIndex];
}
function nextSlide() { showSlide(slideIndex + 1); }
function prevSlide() { showSlide(slideIndex - 1); }

function startCountdown() {
  const targetDate = new Date("2025-07-02T00:00:00"); // 🔁 Change here
  const countdownText = document.getElementById("countdownOnly");

  const interval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 1000) {
      clearInterval(interval);
      document.getElementById("countdownPopup").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
      startSlideshow();
      showFireworks();
      showTeddy();
      createHearts();
    } else {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      countdownText.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
    }
  }, 1000);
}

function createHearts() {
  const container = document.getElementById("heart-container");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.innerText = "💖";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }, 500);
}

function showFireworks() {
  const canvas = document.getElementById("fireworkCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 3,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${hexToRGB(p.color)}, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  draw();
  setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 4000);
}

function hexToRGB(h) {
  let r = 0, g = 0, b = 0;
  if (h.startsWith("hsl")) {
    const hsl = h.match(/\d+/g);
    [r, g, b] = hslToRgb(hsl[0] / 360, hsl[1] / 100, hsl[2] / 100);
  }
  return `${r}, ${g}, ${b}`;
}

function hslToRgb(h, s, l) {
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
          Math.round(hue2rgb(p, q, h) * 255),
          Math.round(hue2rgb(p, q, h - 1 / 3) * 255)];
}

function showTeddy() {
  document.getElementById("blurWrapper").classList.add("blur-background");
  setTimeout(() => {
    document.getElementById("birthdayPopup").style.display = "flex";
  }, 1000);
}

function closeBirthdayPopup() {
  document.getElementById("birthdayPopup").style.display = "none";
  checkAndRemoveBlur();
  typeWriter(); // Typewriter starts now
}

function checkAndRemoveBlur() {
  document.getElementById("blurWrapper").classList.remove("blur-background");
}

window.onload = startCountdown;
