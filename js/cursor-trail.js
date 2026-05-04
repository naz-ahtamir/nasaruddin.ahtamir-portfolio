(function() {
  const canvas = document.createElement('canvas');
  canvas.className = 'cursor-trail';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.color = '255,106,0';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      this.size *= 0.96;
    }
    draw() {
      ctx.fillStyle = `rgba(${this.color},${this.life})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let mx = 0, my = 0, lx = 0, ly = 0;

  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles = particles.filter(p => p.life > 0);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (Math.abs(mx - lx) > 3 || Math.abs(my - ly) > 3) {
      for (let i = 0; i < 3; i++) particles.push(new Particle(mx, my));
      lx = mx;
      ly = my;
    }
  });
})();