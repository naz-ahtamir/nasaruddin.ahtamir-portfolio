(function() {
  const cursor = document.createElement('div');
  cursor.className = 'holographic-cursor';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0, rafId = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        rafId = null;
      });
    }
  });

  const interactive = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();