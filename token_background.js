// token_background.js
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "backgroundCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1"; // Behind content
  canvas.style.pointerEvents = "none"; // Click-through
  document.body.appendChild(canvas);

  const context = canvas.getContext("2d");
  let particles = [];
  const numParticles = 100; // Adjust for density
  const particleSpeed = 0.2; // Adjust for subtle motion

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 2 + 1; // Small, subtle particles
      const opacity = Math.random() * 0.3 + 0.2; // Low opacity for subtlety
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: size,
        baseSize: size,
        opacity: opacity,
        color: getRandomGradientColor(),
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
      });
    }
  }

  function getRandomGradientColor() {
    const colors = [
      "rgba(127, 0, 255, 0.5)", // Soft purple
      "rgba(255, 0, 255, 0.5)", // Magenta
      "rgba(0, 204, 255, 0.5)", // Cyan
      "rgba(255, 204, 51, 0.5)", // Yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function drawParticles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const particle of particles) {
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  function updateParticles() {
    for (const particle of particles) {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap particles around the edges
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.y > canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = canvas.height;
    }
    drawParticles();
  }

  function animate() {
    requestAnimationFrame(animate);
    updateParticles();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  animate();
})();
