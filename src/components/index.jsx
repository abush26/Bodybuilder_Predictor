import React from "react";
import { ACTIVITY_OPTIONS, GENDER_OPTIONS } from "../constants/index";

export const InputForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      age: parseFloat(formData.get("age")),
      weight: parseFloat(formData.get("weight")),
      height: parseFloat(formData.get("height")),
      gender: formData.get("gender"),
      activity: formData.get("activity"),
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 slide-in">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-6">
        A Bodybuilder Physique Predictor 💪
      </h1>
      <p className="text-lg text-center text-gray-400 mb-8">
        Get an AI-powered prediction of your future physique
      </p>

      <form
        id="physique-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <label className="block text-gray-300 font-medium">Age</label>
          <input
            type="number"
            name="age"
            min="15"
            max="80"
            className="w-full p-4 rounded-lg bg-gray-700 text-white"
            required
            placeholder="15"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            min="30"
            max="200"
            step="0.1"
            className="w-full p-4 rounded-lg bg-gray-700 text-white"
            required
            placeholder="40"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            min="120"
            max="250"
            className="w-full p-4 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-300 font-medium">Gender</label>
          <select
            name="gender"
            className="w-full p-4 rounded-lg bg-gray-700 text-white"
            required
          >
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-gray-300 font-medium">
            Activity Level
          </label>
          <select
            name="activity"
            className="w-full p-4 rounded-lg bg-gray-700 text-white"
            required
          >
            {ACTIVITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="md:col-span-2 py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400"
        >
          Generate Prediction
        </button>
      </form>
    </div>
  );
};

// components/ProgressBar.jsx
export const ProgressBar = ({ label, percentage, color }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span>{label}</span>
      <span>{percentage.toFixed(1)}%</span>
    </div>
    <div className="w-full bg-gray-600 rounded-full h-4">
      <div
        className={`${color} rounded-full h-4 progress-bar`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

// components/ResultSection.jsx
export const ResultSection = ({ results, onReset }) => {
  const {
    age,
    weight,
    height,
    bmi,
    predictedMuscle,
    bodyFat,
    confidence,
    recommendations,
    musclePercentage,
  } = results;

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl p-8">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-8">
        Predicted Physique
      </h2>

      <div className="bg-gray-700 rounded-lg p-4 mb-6 text-center">
        <h3 className="text-xl font-semibold mb-2">💪 Confidence Score</h3>
        <div className="text-2xl text-yellow-500 font-bold">
          {(confidence * 100).toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="metric-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Input Metrics</h3>
          <div className="space-y-3">
            <p>
              <span className="text-gray-400">Age:</span> {age} years
            </p>
            <p>
              <span className="text-gray-400">Weight:</span> {weight} kg
            </p>
            <p>
              <span className="text-gray-400">Height:</span> {height} cm
            </p>
            <p>
              <span className="text-gray-400">BMI:</span> {bmi.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="metric-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Predictions</h3>
          <div className="space-y-3">
            <p>
              <span className="text-gray-400">Predicted Muscle Mass:</span>{" "}
              {predictedMuscle.toFixed(1)} kg
            </p>
            <p>
              <span className="text-gray-400">Predicted Body Fat:</span>{" "}
              {bodyFat.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Predicted Body Composition
        </h3>
        <div className="space-y-4">
          <ProgressBar
            label="Muscle Mass"
            percentage={musclePercentage}
            color="bg-green-500"
          />
          <ProgressBar
            label="Body Fat"
            percentage={bodyFat}
            color="bg-yellow-500"
          />
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">ML-Based Recommendations</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400"
        >
          New Prediction
        </button>
      </div>
    </div>
  );
};
