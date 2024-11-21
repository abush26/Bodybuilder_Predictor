import { ML_PARAMS } from "../constants/index";

export const sigmoid = (x) => {
  return 1 / (1 + Math.exp(-x));
};

export const predictMuscleMass = (weight, height, age, gender, activity) => {
  const params = ML_PARAMS.muscleMass;
  const basePredictor =
    weight * params.weightCoef +
    height * params.heightCoef +
    age * params.ageCoef +
    params.genderBias[gender] +
    params.activityCoef[activity];
  return sigmoid(basePredictor) * weight * 0.8;
};

export const predictBodyFat = (bmi, age, gender, activity) => {
  const params = ML_PARAMS.bodyFat;
  const basePredictor =
    bmi * params.bmiCoef +
    age * params.ageCoef +
    params.genderBias[gender] +
    params.activityCoef[activity];
  return Math.min(Math.max(basePredictor, 5), 45);
};

export const addNoise = (value, magnitude = 0.05) => {
  const noise = (Math.random() - 0.5) * 2 * magnitude * value;
  return value + noise;
};

export const calculateConfidence = (age, weight, height, activity) => {
  let confidence = 1.0;
  if (age < 20 || age > 60) confidence *= 0.9;
  if (weight < 45 || weight > 120) confidence *= 0.9;
  if (height < 150 || height > 200) confidence *= 0.9;
  if (activity === "sedentary" || activity === "athlete") confidence *= 0.95;
  return confidence;
};

export const generateRecommendations = (
  bodyFat,
  predictedMuscle,
  weight,
  activity
) => {
  const recs = [];

  if (bodyFat > 25 && predictedMuscle < weight * 0.3) {
    recs.push("Focus on fat loss while maintaining muscle mass");
    recs.push("Recommended macro split: 40% protein, 40% carbs, 20% fats");
  } else if (bodyFat < 15 && predictedMuscle < weight * 0.25) {
    recs.push("Priority: muscle gain with moderate caloric surplus");
    recs.push("Recommended macro split: 30% protein, 50% carbs, 20% fats");
  }

  if (activity === "sedentary" || activity === "light") {
    const suggestedActivity =
      predictedMuscle < weight * 0.2 ? "strength training" : "cardio";
    recs.push(
      `Gradually increase activity level, starting with ${suggestedActivity}`
    );
  }

  recs.push("Ensure 7-9 hours of sleep for optimal recovery");
  recs.push("Maintain hydration (2-3 liters daily)");

  return recs;
};
