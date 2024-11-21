export const ML_PARAMS = {
  muscleMass: {
    weightCoef: 0.42,
    heightCoef: 0.15,
    ageCoef: -0.008,
    genderBias: { Male: 2.5, Female: -2.5 },
    activityCoef: {
      sedentary: -2,
      light: 0,
      moderate: 2,
      active: 4,
      athlete: 6,
    },
  },
  bodyFat: {
    bmiCoef: 1.3,
    ageCoef: 0.07,
    genderBias: { Male: -4, Female: 2 },
    activityCoef: {
      sedentary: 3,
      light: 1.5,
      moderate: 0,
      active: -1.5,
      athlete: -3,
    },
  },
};

export const ACTIVITY_OPTIONS = [
  { value: "sedentary", label: "Sedentary (Little to no exercise)" },
  { value: "light", label: "Light (Exercise 1-3 times/week)" },
  { value: "moderate", label: "Moderate (Exercise 3-5 times/week)" },
  { value: "active", label: "Active (Exercise 6-7 times/week)" },
  { value: "athlete", label: "Athlete (Professional training)" },
];

export const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
