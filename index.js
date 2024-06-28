const math = require("mathjs");
const jstat = require("jstat");

// Datos iniciales de los partidos previos
const data = [2, 2, 2];

// Calcular la media y la desviación estándar
const mean = math.mean(data);
const stdDev = math.std(data, "uncorrected");

// Crear la distribución normal con la media y desviación estándar calculadas
const distribution = jstat.normal(mean, stdDev);

let mostProbable = { x: 0, data: 0 };

for (let i = 0; i < 11; i++) {
  const probCorners = distribution.pdf(i);
  if (probCorners > mostProbable.data) {
    mostProbable.x = i;
    mostProbable.data = probCorners.toFixed(4);
  }
  console.log(`Probabilidad de ${i}: ${probCorners.toFixed(4)}`);
}

let mostProbableB = { x: "", data: distribution.cdf(0) - distribution.cdf(1) };
for (let i = 0; i < 11; i++) {
  for (let j = 0; j < 11; j++) {
    if (i < j) {
      const probBetween = distribution.cdf(j) - distribution.cdf(i);
      if (probBetween > mostProbableB.data) {
        mostProbableB.x = `Entre ${i} y ${j}`;
        mostProbableB.data = probBetween.toFixed(4);
      }
      console.group(`Probabilidad de tener entre ${i} y ${j}`);
      console.log(`${probBetween.toFixed(4)}`);
      console.groupEnd();
    }
  }
}

console.log(
  `Lo más probable es que haya exactamente ${mostProbable.x} = ${mostProbable.data}`,
);
console.log(
  `Lo más probable es que haya ${mostProbableB.x} = ${mostProbableB.data}`,
);
