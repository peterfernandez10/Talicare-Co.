// header solid + hide on scroll down
const headerWrap = document.getElementById('headerWrap');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 40) headerWrap.classList.add('solid'); else headerWrap.classList.remove('solid');
  headerWrap.style.top = (y > lastY && y > 200) ? '-90px' : '18px';
  lastY = y;
});

// hero heading animate
window.addEventListener('load', () => { document.getElementById('heroHeading').classList.add('animate'); });

// mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));

// checklist
const checkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); checkObserver.unobserve(entry.target); } });
}, { threshold: 0.4 });
document.querySelectorAll('#checklist li').forEach(el => checkObserver.observe(el));

// ring panel
const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); ringObserver.unobserve(entry.target); } });
}, { threshold: 0.4 });
document.querySelectorAll('#ringPanel').forEach(el => ringObserver.observe(el));

// count up
function countUp(el){
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1600;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now-start)/duration, 1);
    const eased = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(eased*target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { countUp(entry.target); countObserver.unobserve(entry.target); } });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// button ripple
document.querySelectorAll('[data-ripple]').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// testimonial carousel
const slides = document.querySelectorAll('.t-slide');
const dotsWrap = document.getElementById('tDots');
slides.forEach((s,i) => {
  const dot = document.createElement('button');
  if (i===0) dot.classList.add('active');
  dot.addEventListener('click', () => showSlide(i));
  dotsWrap.appendChild(dot);
});
let tIndex = 0;
function showSlide(i){
  slides[tIndex].classList.remove('active');
  dotsWrap.children[tIndex].classList.remove('active');
  tIndex = i;
  slides[tIndex].classList.add('active');
  dotsWrap.children[tIndex].classList.add('active');
}
setInterval(() => { showSlide((tIndex+1) % slides.length); }, 5000);
