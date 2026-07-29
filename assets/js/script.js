const navSteps = document.querySelectorAll(".nav-step");
const formSteps = document.querySelectorAll(".step");
const form = document.querySelector(".form");
const backButton = document.querySelector(".button--back");
const nextButton = document.querySelector(".button--primary");
const confirmButton = document.querySelector(".button--confirm");
const confirmation = document.querySelector(".confirmation");

let currentStep = 0;

function showStep(stepIndex) {
  clearActiveSteps();

  formSteps[stepIndex].classList.add("active");
}

nextButton.addEventListener("click", () => {
  if (currentStep < formSteps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
  if (currentStep > 0) {
    backButton.classList.remove("hidden");
  }

  if (currentStep === formSteps.length - 1) {
    nextButton.classList.add("hidden");
    confirmButton.classList.remove("hidden");
  }
})

backButton.addEventListener("click", () => {
  currentStep--;
  if (currentStep < 1) {
    backButton.classList.add("hidden");
  }
  if (currentStep < formSteps.length - 1) {
    confirmButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  }
  showStep(currentStep);
});

confirmButton.addEventListener("click", () => {
  form.classList.add("hidden");
  confirmation.classList.add("active");
})

function clearActiveSteps() {
  formSteps.forEach(step => {
    step.classList.remove("active");
  });
};