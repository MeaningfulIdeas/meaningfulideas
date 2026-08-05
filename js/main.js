// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('open');
    });
  }

  // Close mobile nav when a link is clicked
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (links) {
        links.classList.remove('open');
      }
    });
  });
});