// Verificar que el DOM está listo
console.log("Script cargado");

// Datos del test - 50 preguntas sobre los Cinco Grandes
const questions = [
  // Apertura (Open-mindedness) - 10 preguntas
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

  // Responsabilidad (Conscientiousness) - 10 preguntas
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

  // Amabilidad (Agreeableness) - 10 preguntas
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

  // Estabilidad Emocional (Neuroticism) - 10 preguntas
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

  // Extroversión (Extraversion) - 10 preguntas
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

let currentQuestion = 0;
let scores = {
  apertura: 0,
  responsabilidad: 0,
  amabilidad: 0,
  estabilidad: 0,
  extroversion: 0
};
let traitCounts = {
  apertura: 0,
  responsabilidad: 0,
  amabilidad: 0,
  estabilidad: 0,
  extroversion: 0
};

// Descripción de perfiles
const profileDescriptions = {
  apertura: {
    high: "Tienes una alta apertura a nuevas experiencias. Eres creativo/a, innovador/a y te atrae la diversidad de pensamientos. Disfrutas explorando nuevas ideas y perspectivas.",
    low: "Prefieres la estabilidad y la tradición. Tienes un estilo de vida más conservador y te sientes cómodo/a con lo establecido y conocido."
  },
  responsabilidad: {
    high: "Eres muy organizado/a, disciplinado/a y orientado/a a objetivos. Tu dedicación y planificación te ayudan a lograr lo que te propones.",
    low: "Tienes una aproximación más flexible y espontánea. Prefieres fluir con las circunstancias en lugar de seguir planes rígidos."
  },
  amabilidad: {
    high: "Eres empático/a, compasivo/a y cooperativo/a. Tu generosidad y preocupación por otros hacen de ti una persona valiosa en relaciones.",
    low: "Tienes una naturaleza más competitiva e independiente. Priorizas tus propios intereses y eres directo/a en tus comunicaciones."
  },
  estabilidad: {
    high: "Tienes gran estabilidad emocional. Manejas bien el estrés y rara vez te sientes abrumado/a. Tu serenidad es tu fortaleza.",
    low: "Eres más sensible emocionalmente. Experimentas emociones intensamente. Esto te da profundidad pero requiere manejo cuidadoso del estrés."
  },
  extroversion: {
    high: "Eres muy sociable y orientado/a a otras personas. Tu energía y entusiasmo inspiran y atrae a otros.",
    low: "Prefieres interacciones más profundas con pocas personas. Recargas tu energía en soledad y reflexión."
  }
};

// Inicio del test
function startTest() {
  showScreen("questionsScreen");
  showQuestion();
  document.getElementById("totalQuestions").textContent = questions.length;
}

// Mostrar pantalla
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Mostrar pregunta
function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const question = questions[currentQuestion];
  document.getElementById("questionText").textContent = question.text;

  // Actualizar progreso
  const progress = (currentQuestion / questions.length) * 100;
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.background = `linear-gradient(to right,
    #6366f1 0%,
    #6366f1 ${progress}%,
    #e2e8f0 ${progress}%,
    #e2e8f0 100%)`;
  document.getElementById("currentQuestion").textContent = currentQuestion + 1;

  // Crear botones de escala
  createScaleButtons();
}

// Crear botones de escala Likert
function createScaleButtons() {
  const container = document.getElementById("scaleButtons");
  container.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("button");
    button.className = "scale-button";
    button.textContent = i;
    button.onclick = () => answerQuestion(i);
    container.appendChild(button);
  }
}

// Responder pregunta
function answerQuestion(value) {
  const question = questions[currentQuestion];
  let score = value;

  // Si es una pregunta inversa (estabilidad), invertir la puntuación
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
  // Calcular promedios
  const averages = {};
  for (let trait in scores) {
    averages[trait] = traitCounts[trait] > 0 ? Math.round(scores[trait] / traitCounts[trait] * 10) / 10 : 0;
  }

  // Determinar tipo de personalidad
  const personalityType = determinePersonalityType(averages);

  // Mostrar pantalla de resultados
  showScreen("resultsScreen");
  displayPersonalityCard(personalityType, averages);
  displayTraits(averages);
  displayDescription(personalityType, averages);
  displayRadarChart(averages);
}

// Determinar tipo de personalidad
function determinePersonalityType(averages) {
  const traits = Object.entries(averages)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const topTraits = traits.slice(0, 2);
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

  const key = topTraits.join(",");
  return mapping[key] || "Tu Perfil Único";
}

// Mostrar tarjeta de personalidad
function displayPersonalityCard(type, averages) {
  const card = document.querySelector(".personality-type");
  const avg = Object.values(averages).reduce((a, b) => a + b) / Object.values(averages).length;

  card.innerHTML = `
    <h3>Tu Tipo de Personalidad</h3>
    <div class="type-name">${type}</div>
    <div class="type-description">
      Score General: ${(avg).toFixed(1)}/5.0
    </div>
  `;
}

// Mostrar rasgos
function displayTraits(averages) {
  const names = {
    apertura: "🌟 Apertura",
    responsabilidad: "✅ Responsabilidad",
    amabilidad: "❤️ Amabilidad",
    estabilidad: "😌 Estabilidad",
    extroversion: "🎭 Extroversión"
  };

  const levels = {
    apertura: "Apertura a nuevas experiencias",
    responsabilidad: "Organización y disciplina",
    amabilidad: "Empatía y cooperación",
    estabilidad: "Estabilidad emocional",
    extroversion: "Sociabilidad y energía"
  };

  const container = document.getElementById("traitsContainer");
  container.innerHTML = "";

  for (let trait in averages) {
    const score = averages[trait];
    const percentage = (score / 5) * 100;

    let levelText = "";
    if (score >= 4) levelText = "Muy Alto";
    else if (score >= 3) levelText = "Alto";
    else if (score >= 2.5) levelText = "Medio";
    else if (score >= 1.5) levelText = "Bajo";
    else levelText = "Muy Bajo";

    const card = document.createElement("div");
    card.className = "trait-card";
    card.innerHTML = `
      <div class="trait-name">${names[trait]}</div>
      <div class="trait-score">${score.toFixed(1)}</div>
      <div class="trait-level">${levelText}</div>
      <div class="trait-bar">
        <div style="width: ${percentage}%; height: 100%; background: linear-gradient(101deg, #6366f1, #ec4899);"></div>
      </div>
    `;
    container.appendChild(card);
  }
}

// Mostrar descripción
function displayDescription(type, averages) {
  const container = document.getElementById("descriptionContainer");

  let description = `<h4>${type}</h4>`;

  // Agregar descripción para el rasgo más alto
  const dominantTrait = Object.entries(averages).sort((a, b) => b[1] - a[1])[0][0];
  const isHigh = averages[dominantTrait] >= 3;

  description += `<p>${profileDescriptions[dominantTrait][isHigh ? "high" : "low"]}</p>`;

  // Agregar consejos
  description += `<p><strong>📌 Consejos para ti:</strong> `;
  if (isHigh) {
    description += `Mantén tu fortaleza en ${dominantTrait}. Tu naturaleza te proporciona ventajas únicas. Continúa desarrollándote en esta área.`;
  } else {
    description += `Considera trabajar en desarrollo personal para mejorar tu ${dominantTrait}. No es una debilidad, sino una oportunidad de crecimiento.`;
  }
  description += `</p>`;

  container.innerHTML = description;
}

// Mostrar gráfico de radar (simulado con gráfico de barras)
function displayRadarChart(averages) {
  const canvas = document.getElementById("radarChart");
  const ctx = canvas.getContext("2d");

  // Configurar canvas
  const size = 350;
  canvas.width = size;
  canvas.height = size;

  const center = size / 2;
  const maxRadius = 120;

  // Datos
  const labels = ["Apertura", "Responsabilidad", "Amabilidad", "Estabilidad", "Extroversión"];
  const values = [
    averages.apertura,
    averages.responsabilidad,
    averages.amabilidad,
    averages.estabilidad,
    averages.extroversion
  ];

  // Clear canvas
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Dibujar grid
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    const radius = (maxRadius / 5) * i;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Dibujar ejes
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  const numAxes = labels.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  for (let i = 0; i < numAxes; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const x = center + maxRadius * Math.cos(angle);
    const y = center + maxRadius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  // Dibujar datos
  ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
  ctx.strokeStyle = "#6366f1";
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (let i = 0; i < numAxes; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const radius = (values[i] / 5) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dibujar puntos
  ctx.fillStyle = "#6366f1";
  for (let i = 0; i < numAxes; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const radius = (values[i] / 5) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Dibujar etiquetas
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < numAxes; i++) {
    const angle = angleSlice * i - Math.PI / 2;
    const x = center + (maxRadius + 30) * Math.cos(angle);
    const y = center + (maxRadius + 30) * Math.sin(angle);
    ctx.fillText(labels[i], x, y);
  }
}

// Descargar resultados
function downloadResults() {
  const averages = {};
  for (let trait in scores) {
    averages[trait] = traitCounts[trait] > 0 ? (scores[trait] / traitCounts[trait]).toFixed(2) : 0;
  }

  const personalityType = determinePersonalityType(averages);

  let content = "=== RESULTADOS DE TEST DE PERSONALIDAD ===\n\n";
  content += `Tipo de Personalidad: ${personalityType}\n\n`;

  content += "Puntuaciones por Rasgo:\n";
  content += `- Apertura: ${averages.apertura}/5\n`;
  content += `- Responsabilidad: ${averages.responsabilidad}/5\n`;
  content += `- Amabilidad: ${averages.amabilidad}/5\n`;
  content += `- Estabilidad Emocional: ${averages.estabilidad}/5\n`;
  content += `- Extroversión: ${averages.extroversion}/5\n`;

  content += `\nFecha: ${new Date().toLocaleDateString('es-ES')}\n`;

  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content));
  element.setAttribute("download", "resultado-personalidad.txt");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Reiniciar test
function restartTest() {
  currentQuestion = 0;
  scores = {
    apertura: 0,
    responsabilidad: 0,
    amabilidad: 0,
    estabilidad: 0,
    extroversion: 0
  };
  traitCounts = {
    apertura: 0,
    responsabilidad: 0,
    amabilidad: 0,
    estabilidad: 0,
    extroversion: 0
  };

  showScreen("startScreen");
}



