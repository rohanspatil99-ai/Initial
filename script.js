const button = document.getElementById("celebrateButton");
const statusText = document.getElementById("statusText");
const canvas = document.getElementById("confetti");

if (!button || !statusText || !canvas) {
  // Optional celebration animation: the element is only present on its own page.
}
else {
  const context = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  button.addEventListener("click", () => {
    statusText.textContent = "First website launched successfully!";
    launchConfetti();
  });

  function launchConfetti() {
    const colors = ["#c8ef67", "#ff7657", "#182217", "#ffffff"];
    const pieces = Array.from({ length: 90 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.45,
      size: 5 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocityX: (Math.random() - 0.5) * 12,
      velocityY: -5 - Math.random() * 9,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.2
    }));

    let frame = 0;
    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((piece) => {
        piece.velocityY += 0.22;
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.rotation += piece.rotationSpeed;
        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.rotation);
        context.fillStyle = piece.color;
        context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
        context.restore();
      });

      frame += 1;
      if (frame < 180) requestAnimationFrame(draw);
      else context.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw();
  }
}
