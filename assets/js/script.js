const navSteps = document.querySelectorAll(".step-number");
const formSteps = document.querySelectorAll(".step");
const form = document.querySelector(".form");
const backButton = document.querySelector(".button--back");
const nextButton = document.querySelector(".button--primary");
const confirmButton = document.querySelector(".button--confirm");
const confirmation = document.querySelector(".confirmation");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

const plans = document.querySelectorAll('input[name="plan"]');
const billingSwitch = document.querySelector('input[type="checkbox"]');

const planPrices = document.querySelectorAll(".plan__price");
const planBonuses = document.querySelectorAll(".plan__bonus");

const addons = document.querySelectorAll('.addon input[type="checkbox"]');
const addonPriceMonths = document.querySelectorAll(".addon__price-monthly");
const addonPriceYears = document.querySelectorAll(".addon__price-yearly");

const summaryPlan = document.querySelector(".summary__info");
const summaryPlanValue = document.querySelector(".summary__info-value");
const summaryAddon = document.querySelector(".summary__addons");
const summaryTotal = document.querySelector(".summary__total");
const changeButton = document.querySelector(".summary__change");

let currentStep = 0;
let selectedPlan = "arcade";
let selectedBilling = "monthly";
let selectedAddons = [];

function showStep(stepIndex) {
  clearActiveSteps();
  clearActiveNav();

  formSteps[stepIndex].classList.add("active");
  navSteps[stepIndex].classList.add("active");
}

function validateRequiredField(input) {
  if (input.value.trim() === "") {
    showError(input);
    input.classList.add("input-error");

    return false;
  }

  clearError(input);
  input.classList.remove("input-error");

  return true;
}

function validatePersonalInfo() {
  let isValid = true;

  if (!validateRequiredField(nameInput)) {
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validateRequiredField(emailInput)){
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError(
      emailInput,
      "Please enter a valid email address"
    );
    emailInput.classList.add("input-error");
    isValid = false;
  } else {
    clearError(emailInput);
    emailInput.classList.remove("input-error");
  }

  if (!validateRequiredField(phoneInput)) {
    isValid = false;
  }

  return isValid;
}

function showError(input, message = "This field is required") {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");
  errorMessage.textContent = message;
  errorMessage.classList.add("active");
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorMessage = formGroup.querySelector(".error-message");
  errorMessage.classList.remove("active");
}

nextButton.addEventListener("click", () => {
  if (currentStep === 0) {
    if (!validatePersonalInfo()) {
      return;
    }
  }

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
    renderSummary();
    renderTotal();
  }
});

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
});

function clearActiveSteps() {
  formSteps.forEach(step => {
    step.classList.remove("active");
  });
}

function clearActiveNav() {
  navSteps.forEach(navStep => {
    navStep.classList.remove("active");
  });
}

function saveSelectedPlan() {
  plans.forEach(planInput => {
    planInput.addEventListener("change", () => {
      selectedPlan = planInput.value;
    });
  });
}

function handleBillingChange() {
  billingSwitch.addEventListener("change", () => {
    if (billingSwitch.checked) {
      planBonuses.forEach(planBonus => {
        planBonus.classList.remove("hidden");
      });

      addonPriceMonths.forEach(addonPriceMonth => {
        addonPriceMonth.classList.add("hidden");
      });
      addonPriceYears.forEach(addonPriceYear => {
        addonPriceYear.classList.remove("hidden");
      });
      selectedBilling = "yearly";
    } else {
      planBonuses.forEach(planBonus => {
        planBonus.classList.add("hidden");
      });

      addonPriceYears.forEach(addonPriceYear => {
        addonPriceYear.classList.add("hidden");
      });
      addonPriceMonths.forEach(addonPriceMonth => {
        addonPriceMonth.classList.remove("hidden");
      });
      selectedBilling = "monthly";
    }

    planPrices.forEach((price) => {
      if (billingSwitch.checked) {
        price.textContent = `$${price.dataset.yearly}/yr`;
      } else {
        price.textContent = `$${price.dataset.monthly}/mo`;
      }
    })
  });
}

function handleAddonChange() {
  addons.forEach(addon => {
    addon.addEventListener("change", () => {
      if (addon.checked) {
        selectedAddons.push(addon.id);
      } else {
        selectedAddons = selectedAddons.filter(item => item !== addon.id);
      }
    })
  });
}

function handleChangePlan() {
  changeButton.addEventListener("click", () => {
    currentStep = 1;

    showStep(currentStep);

    nextButton.classList.remove("hidden");
    confirmButton.classList.add("hidden");
  });
}

const plansData = {
  arcade: {
    name: "Arcade",
    monthly: 9,
    yearly: 90
  },
  advanced: {
    name: "Advanced",
    monthly: 12,
    yearly: 120
  },
  pro: {
    name: "Pro",
    monthly: 15,
    yearly: 150
  }
};

const addonsData = {
  online: {
    name: "Online service",
    monthly: 1,
    yearly: 10
  },
  storage: {
    name: "Larger storage",
    monthly: 2,
    yearly: 20
  },
  custom: {
    name: "Customizable Profile",
    monthly: 2,
    yearly: 20
  }
}

function renderSummary() {
  summaryAddon.innerHTML = '';

  if (billingSwitch.checked) {
    summaryPlan.textContent = plansData[selectedPlan].name + " (Yearly)";
    summaryPlanValue.textContent = `$${plansData[selectedPlan].yearly}/yr`;
    selectedAddons.forEach(addon => {
      summaryAddon.innerHTML += `
        <div class="summary__addon-item">
          <span>${addonsData[addon].name}</span>
          <span class="summary__addon-value">+$${addonsData[addon].yearly}/yr</span>
        </div>
      `;
    });
  } else {
    summaryPlan.textContent = plansData[selectedPlan].name + " (Monthly)";
    summaryPlanValue.textContent = `$${plansData[selectedPlan].monthly}/mo`;
    selectedAddons.forEach(addon => {
      summaryAddon.innerHTML += `
        <div class="summary__addon-item">
          <span>${addonsData[addon].name}</span>
          <span class="summary__addon-value">+$${addonsData[addon].monthly}/mo</span>
        </div>
      `;
    });
  }
}

function renderTotal() {
  summaryTotal.innerHTML = '';
  let total = 0;

  if (billingSwitch.checked) {
    total = plansData[selectedPlan].yearly;

    selectedAddons.forEach(addon => {
      total += addonsData[addon].yearly;
    });

    summaryTotal.innerHTML = `
    <div class="summary__total-item">
      <span class="summary__total-description">Total (per year)</span>
      <span class="summary__total-value">$${total}/yr</span>
    </div>
    `;
  } else {
    total = plansData[selectedPlan].monthly;

    selectedAddons.forEach(addon => {
      total += addonsData[addon].monthly;
    });

    summaryTotal.innerHTML = `
    <div class="summary__total-item">
      <span class="summary__total-description">Total (per month)</span>
      <span class="summary__total-value">$${total}/mo</span>
    </div>
    `;
  }
}

saveSelectedPlan();
handleBillingChange();
handleAddonChange();
handleChangePlan();