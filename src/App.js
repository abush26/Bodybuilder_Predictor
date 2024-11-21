// App.jsx
import React, { useState } from "react";
import { InputForm,ResultSection } from "./components/index";
import {
  predictMuscleMass,
  predictBodyFat,
  addNoise,
  calculateConfidence,
  generateRecommendations,
} from "./helpers/index";
import './App.css';

const App = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = (formData) => {
    const { age, weight, height, gender, activity } = formData;

    // Calculate metrics
    const bmi = weight / ((height / 100) * (height / 100));
    const predictedMuscle = addNoise(
      predictMuscleMass(weight, height, age, gender, activity)
    );
    const bodyFat = addNoise(predictBodyFat(bmi, age, gender, activity));
    const confidence = calculateConfidence(age, weight, height, activity);
    const musclePercentage = (predictedMuscle / weight) * 100;
    const recommendations = generateRecommendations(
      bodyFat,
      predictedMuscle,
      weight,
      activity
    );

    setResults({
      age,
      weight,
      height,
      bmi,
      predictedMuscle,
      bodyFat,
      confidence,
      musclePercentage,
      recommendations,
    });
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setResults(null);
  };

  return (
    <div className="gradient-background min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <InputForm onSubmit={handleSubmit} />
          ) : (
            <ResultSection results={results} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
