// Slider
let slides = document.querySelectorAll('.slide');
let current = 0, 
    arrows = { left: document.querySelector('.arrow.left'), right: document.querySelector('.arrow.right') };

function showSlide(idx) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
}
function nextSlide() { current = (current+1)%slides.length; showSlide(current); }
function prevSlide() { current = (current-1+slides.length)%slides.length; showSlide(current); }
arrows.left.addEventListener('click', prevSlide);
arrows.right.addEventListener('click', nextSlide);

// Auto advance every 1 second
// setInterval(nextSlide, 13000);

// Responsive navigation
let menuToggle = document.querySelector('.menu-toggle');
let navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

// Dropdown toggling for mobile tap
document.querySelectorAll('.dropdown-parent > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if(window.innerWidth <= 600) {
      e.preventDefault();
      let parent = this.parentElement;
      let menu = parent.querySelector('.dropdown-menu');
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }
  });
});

const testimonials = [
  {
    image: "https://thumbs.dreamstime.com/b/happy-indian-young-man-company-employee-working-laptop-portrait-business-professional-manager-office-worker-programmer-254112864.jpg",
    text: "Their work on our website and Internet marketing has made a significant different to our business. We've seen a 425% increase in quote requests from the website which has been pretty remarkable – but I’d always like to see more!",
    author: "Michael Clarke",
    role: "Marketing Manager, A.E.T Institute"
  },
  {
    image: "https://img.freepik.com/premium-photo/indian-female-software-engineer-smiling_921410-26356.jpg",
    text: "Writing case studies was a daunting task for us. We didn’t know where to begin or what questions to ask, and clients never seemed to follow through when we asked. Elixir team did everything – with almost no time or effort for me!",
    author: "Maria Sharapova",
    role: "Managing Director, Themewagon Inc."
  },
  {
    image: "https://kenh14cdn.com/203336854389633024/2022/12/17/photo-1-16712483103771658946801.jpg",
    text: "As a sales gamification company, we were skeptical to work with a consultant to optimize our sales emails, but Elixir was highly recommended by many other Y-Combinator startups we knew. Elixir helped us run a ~6 week email campaign.",
    author: "David Beckham",
    role: "Chairman, Harmony Corporation"
  }
];
let currentIndex = 0;
let timer = null;

function renderSlide(idx) {
  const t = testimonials[idx];
  document.getElementById('testimonialContainer').innerHTML = `
    <img src="${t.image}" alt="Testimonial ${idx+1}" class="testimonial-img">
    <div>
      <div class="testimonial-text">${t.text}</div>
      <div class="testimonial-author">${t.author}</div>
      <div class="testimonial-role">${t.role}</div>
    </div>
  `;
}
function moveSlide(delta) {
  currentIndex = (currentIndex + delta + testimonials.length) % testimonials.length;
  renderSlide(currentIndex);
  resetTimer();
}
function autoSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  renderSlide(currentIndex);
  resetTimer();
}
function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(autoSlide, 30000);
}
renderSlide(currentIndex);
timer = setTimeout(autoSlide, 30000);
 
// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (for HTML, images)

// LOGIN
app.post('/login', (req, res) => {
  const loginData = req.body;
  fs.writeFile('data.json', JSON.stringify(loginData, null, 2), err => {
    if (err) return res.status(500).send('Error saving data');
    res.send({ status: 'success' });
  });
});

// REGISTER
app.post('/register', (req, res) => {
  const registrationData = req.body;
  let allData = [];
  if (fs.existsSync('data.json')) {
    allData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    if (!Array.isArray(allData)) allData = [];
  }
  allData.push(registrationData);
  fs.writeFile('data.json', JSON.stringify(allData, null, 2), err => {
    if (err) return res.status(500).send('Error saving data');
    res.send({ status: 'success' });
  });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
