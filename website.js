const notifyButton = document.getElementById("notifyBtn");
const plantCountNode = document.getElementById("plantCount");
const waterCountNode = document.getElementById("waterCount");

if (notifyButton) {
  notifyButton.addEventListener("click", () => {
    notifyButton.textContent = "You're on the list";
    notifyButton.disabled = true;
    notifyButton.style.opacity = "0.8";
  });
}

if (plantCountNode && waterCountNode) {
  let plants = Number(plantCountNode.textContent);
  let watering = Number(waterCountNode.textContent);

  setInterval(() => {
    plants += Math.random() > 0.65 ? 1 : 0;
    watering = Math.max(1, watering + (Math.random() > 0.5 ? 1 : -1));
    plantCountNode.textContent = String(plants);
    waterCountNode.textContent = String(watering);
  }, 2600);
}
