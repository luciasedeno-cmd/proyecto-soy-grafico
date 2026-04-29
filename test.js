// Estado global del test
let currentQuestion = 0;
let scores = { apertura: 0, responsabilidad: 0, amabilidad: 0, estabilidad: 0, extroversion: 0 };
let traitCounts = { apertura: 0, responsabilidad: 0, amabilidad: 0, estabilidad: 0, extroversion: 0 };

// 50 preguntas basadas en el modelo Big Five
const questions = [
  // Apertura (10)
  { text: "Tengo una imaginación vívida", trait: "apertura" },
  { text: "Valoro el arte y la belleza", trait: "apertura" },
  { text: "Soy creativo/a cuando resuelvo problemas", trait: "apertura" },
  { text: "Me interesan las ideas abstractas y filosóficas", trait: "apertura" },
  { text: "Disfruto explorando nuevas culturas y ideas", trait: "apertura" },
  { text: "Prefiero la variedad a la rutina", trait: "apertura" },
  { text: "Soy aventurero/a y me gustan los desafíos nuevos", trait: "apertura" },
  { text: "Entiendo rápidamente conceptos nuevos y complejos", trait: "apertura" },
  { text: "Me gusta experimentar con diferentes formas de hacer las cosas", trait: "apertura" },
  { text: "Tengo perspectivas poco convencionales", trait: "apertura" },
  // Responsabilidad (10)
  { text: "Soy una persona organizada y metódica", trait: "responsabilidad" },
  { text: "Hago mis tareas a tiempo", trait: "responsabilidad" },
  { text: "Sigo planes y tengo objetivos claros", trait: "responsabilidad" },
  { text: "Pido perfección en lo que hago", trait: "responsabilidad" },
  { text: "Soy disciplinado/a en mis responsabilidades", trait: "responsabilidad" },
  { text: "Planificar con anticipación es importante para mí", trait: "responsabilidad" },
  { text: "Termino mis proyectos con cuidado y atención", trait: "responsabilidad" },
  { text: "Soy fiable y se puede contar conmigo", trait: "responsabilidad" },
  { text: "Trabajo duro para lograr mis metas", trait: "responsabilidad" },
  { text: "Dejo mis espacios limpios y organizados", trait: "responsabilidad" },
  // Amabilidad (10)
  { text: "Me importan sinceramente los sentimientos de otros", trait: "amabilidad" },
  { text: "Soy una persona compasiva", trait: "amabilidad" },
  { text: "Tiendo a ser cooperativo/a", trait: "amabilidad" },
  { text: "Me preocupo por las necesidades de otras personas", trait: "amabilidad" },
  { text: "Intento ser amable con la mayoría de las personas", trait: "amabilidad" },
  { text: "Evito conflictos cuando es posible", trait: "amabilidad" },
  { text: "Soy generoso/a con mi tiempo y recursos", trait: "amabilidad" },
  { text: "Me agrada ayudar a otros", trait: "amabilidad" },
  { text: "Disfruto trabajando en equipo", trait: "amabilidad" },
  { text: "Perdono fácilmente los errores de otros", trait: "amabilidad" },
  // Estabilidad (10 - invertidas)
  { text: "Me siento frecuentemente ansioso/a", trait: "estabilidad", reverse: true },
  { text: "Tengo cambios de humor frecuentes", trait: "estabilidad", reverse: true },
  { text: "Me preocupo mucho por cosas", trait: "estabilidad", reverse: true },
  { text: "Soy propenso/a a sentirme triste o deprimido/a", trait: "estabilidad", reverse: true },
  { text: "Me molesto fácilmente", trait: "estabilidad", reverse: true },
  { text: "A menudo me siento estresado/a", trait: "estabilidad", reverse: true },
  { text: "Tengo dificultad para manejar la presión", trait: "estabilidad", reverse: true },
  { text: "Me siento emocionalmente vulnerable", trait: "estabilidad", reverse: true },
  { text: "Tengo miedo de fracasar", trait: "estabilidad", reverse: true },
  { text: "Me afectan mucho las críticas", trait: "estabilidad", reverse: true },
  // Extroversión (10)
  { text: "Soy una persona extrovertida y sociable", trait: "extroversion" },
  { text: "Me encanta estar rodeado de gente", trait: "extroversion" },
  { text: "Soy el alma de la fiesta", trait: "extroversion" },
  { text: "Inicio conversaciones fácilmente", trait: "extroversion" },
  { text: "Prefiero estar con otros que solo/a", trait: "extroversion" },
  { text: "Tengo mucha energía y entusiasmo", trait: "extroversion" },
  { text: "Me gusta ser el centro de atención", trait: "extroversion" },
  { text: "Soy asertivo/a y expreso mis opiniones", trait: "extroversion" },
  { text: "Hago amigos fácilmente", trait: "extroversion" },
  { text: "Me aburro con la soledad", trait: "extroversion" }
];

// Descripciones de personalidad
const descriptions = {
  apertura: { high: "Eres creativo/a e imaginativo/a. Te atrae la novedad y la diversidad de perspectivas.", low: "Prefieres la estabilidad y las formas probadas." },
  responsabilidad: { high: "Eres muy organizado/a y disciplinado/a. Logras tus objetivos con dedicación.", low: "Prefieres la espontaneidad sobre la estructura rígida." },
  amabilidad: { high: "Eres empático/a y compasivo/a. Te importa el bienestar de otros.", low: "Eres independiente y priorizas tus intereses." },
  estabilidad: { high: "Tienes gran estabilidad emocional y manejas bien el estrés.", low: "Experimentas emociones intensas. Necesitas apoyo en situaciones estresantes." },
  extroversion: { high: "Eres sociable y energético/a. Disfrutes la interacción con otros.", low: "Prefieres interacciones profundas con pocas personas." }
};

// Initializar cuando DOM carga
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM cargado, test listo");
});

// Iniciar test
function startTest() {
  console.log("Iniciando test");
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("questionsScreen").classList.add("active");
  currentQuestion = 0;
  showQuestion();
}

// Mostrar pregunta actual
function showQuestion() {
  console.log("Mostrando pregunta " + (currentQuestion + 1) + " de " + questions.length);

  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const question = questions[currentQuestion];
  document.getElementById("questionText").textContent = question.text;
  document.getElementById("currentQuestion").textContent = currentQuestion + 1;
  document.getElementById("totalQuestions").textContent = questions.length;

  // Actualizar barra de progreso
  const progress = (currentQuestion / questions.length) * 100;
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.background = `linear-gradient(90deg, #6366f1 0%, #6366f1 ${progress}%, #e2e8f0 ${progress}%, #e2e8f0 100%)`;

  // Crear botones de respuesta
  const container = document.getElementById("scaleButtons");
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.className = "scale-button";
    btn.textContent = i;
    btn.onclick = () => answerQuestion(i);
    container.appendChild(btn);
  }
}

// Responder pregunta
function answerQuestion(value) {
  console.log("Respuesta: " + value);
  const question = questions[currentQuestion];
  let score = value;

  // Invertir para preguntas de estabilidad (neuroticism)
  if (question.reverse) {
    score = 6 - value;
  }

  scores[question.trait] += score;
  traitCounts[question.trait]++;

  currentQuestion++;
  showQuestion();
}

// Mostrar resultados
function showResults() {
  console.log("Mostrando resultados");

  // Calcular promedios
  const averages = {};
  for (let trait in scores) {
    averages[trait] = Math.round((scores[trait] / traitCounts[trait]) * 10) / 10;
  }

  console.log("Promedios:", averages);

  // Cambiar pantalla
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("resultsScreen").classList.add("active");

  // Mostrar tarjeta de personalidad
  const personalityType = getPersonalityType(averages);
  const avg = Object.values(averages).reduce((a, b) => a + b) / 5;
  document.querySelector(".personality-type").innerHTML = `
    <h3>Tu Tipo de Personalidad</h3>
    <div class="type-name">${personalityType}</div>
    <div class="type-description">Score: ${avg.toFixed(1)}/5.0</div>
  `;

  // Mostrar rasgos
  const container = document.getElementById("traitsContainer");
  container.innerHTML = "";

  const icons = { apertura: "🌟", responsabilidad: "✅", amabilidad: "❤️", estabilidad: "😌", extroversion: "🎭" };
  const names = { apertura: "Apertura", responsabilidad: "Responsabilidad", amabilidad: "Amabilidad", estabilidad: "Estabilidad", extroversion: "Extroversión" };

  for (let trait in averages) {
    const score = averages[trait];
    const pct = (score / 5) * 100;

    let level = "";
    if (score >= 4) level = "Muy Alto";
    else if (score >= 3) level = "Alto";
    else if (score >= 2.5) level = "Medio";
    else if (score >= 1.5) level = "Bajo";
    else level = "Muy Bajo";

    const card = document.createElement("div");
    card.className = "trait-card";
    card.innerHTML = `
      <div class="trait-name">${icons[trait]} ${names[trait]}</div>
      <div class="trait-score">${score.toFixed(1)}</div>
      <div class="trait-level">${level}</div>
      <div class="trait-bar"><div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #6366f1, #ec4899);"></div></div>
    `;
    container.appendChild(card);
  }

  // Mostrar descripción
  const descContainer = document.getElementById("descriptionContainer");
  const topTrait = Object.entries(averages).sort((a, b) => b[1] - a[1])[0];
  const isHigh = topTrait[1] >= 3;
  descContainer.innerHTML = `
    <h4>${personalityType}</h4>
    <p>${descriptions[topTrait[0]][isHigh ? "high" : "low"]}</p>
  `;

  // Dibujar gráfico radar
  drawRadarChart(averages);
}

// Determinar tipo de personalidad
function getPersonalityType(avg) {
  const traits = Object.entries(avg).sort((a, b) => b[1] - a[1]).map(e => e[0]);
  const mapping = {
    "apertura,responsabilidad": "El Innovador",
    "apertura,amabilidad": "El Creativo Empático",
    "apertura,extroversion": "El Aventurero",
    "responsabilidad,amabilidad": "El Dedicado",
    "responsabilidad,extroversion": "El Líder",
    "amabilidad,extroversion": "El Conector",
    "estabilidad,apertura": "El Filósofo Sereno",
    "estabilidad,responsabilidad": "El Ejecutor",
    "estabilidad,amabilidad": "El Protector",
    "estabilidad,extroversion": "El Comunicador Tranquilo"
  };
  const key = traits.slice(0, 2).join(",");
  return mapping[key] || "Tu Perfil Único";
}

// Dibujar gráfico radar
function drawRadarChart(avg) {
  const canvas = document.getElementById("radarChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const size = 300;
  canvas.width = size;
  canvas.height = size;

  const center = size / 2;
  const maxRadius = 100;

  const labels = ["Apertura", "Responsabilidad", "Amabilidad", "Estabilidad", "Extroversión"];
  const values = [avg.apertura, avg.responsabilidad, avg.amabilidad, avg.estabilidad, avg.extroversion];

  ctx.clearRect(0, 0, size, size);

  // Dibujar círculos de fondo
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    const r = (maxRadius / 5) * i;
    ctx.beginPath();
    ctx.arc(center, center, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Dibujar datos
  ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 2;
  ctx.beginPath();

  const angleSlice = (Math.PI * 2) / labels.length;
  for (let i = 0; i < labels.length; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const r = (values[i] / 5) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dibujar puntos
  ctx.fillStyle = "#6366f1";
  for (let i = 0; i < labels.length; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const r = (values[i] / 5) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Descargar resultados
function downloadResults() {
  const averages = {};
  for (let trait in scores) {
    averages[trait] = (scores[trait] / traitCounts[trait]).toFixed(2);
  }

  const personalityType = getPersonalityType(averages);

  let content = "=== RESULTADOS DEL TEST DE PERSONALIDAD ===\n\n";
  content += `Tipo de Personalidad: ${personalityType}\n\n`;
  content += "Puntuaciones:\n";
  content += `- Apertura: ${averages.apertura}/5\n`;
  content += `- Responsabilidad: ${averages.responsabilidad}/5\n`;
  content += `- Amabilidad: ${averages.amabilidad}/5\n`;
  content += `- Estabilidad: ${averages.estabilidad}/5\n`;
  content += `- Extroversión: ${averages.extroversion}/5\n`;
  content += `\nFecha: ${new Date().toLocaleDateString('es-ES')}\n`;

  const link = document.createElement("a");
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(content);
  link.download = "resultado-personalidad.txt";
  link.click();
}

// Reiniciar test
function restartTest() {
  currentQuestion = 0;
  scores = { apertura: 0, responsabilidad: 0, amabilidad: 0, estabilidad: 0, extroversion: 0 };
  traitCounts = { apertura: 0, responsabilidad: 0, amabilidad: 0, estabilidad: 0, extroversion: 0 };
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("startScreen").classList.add("active");
}


