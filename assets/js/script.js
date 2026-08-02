const navSteps = document.querySelectorAll(".step-number");
const formSteps = document.querySelectorAll(".step");
const form = document.querySelector(".form");
const backButton = document.querySelector(".button--back");
const nextButton = document.querySelector(".button--primary");
const confirmButton = document.querySelector(".button--confirm");
const confirmation = document.querySelector(".confirmation");

const plans = document.querySelectorAll('input[name="plan"]');
const billingSwitch = document.querySelector('input[type="checkbox"]');

const planPrices = document.querySelectorAll(".plan__price");
const planBonuses = document.querySelectorAll(".plan__bonus");

const addons = document.querySelectorAll('.addon input[type="checkbox"]');
const addonPriceMonths = document.querySelectorAll(".addon__price-monthly");
const addonPriceYears = document.querySelectorAll(".addon__price-yearly");

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
})

function clearActiveSteps() {
  formSteps.forEach(step => {
    step.classList.remove("active");
  });
};

function clearActiveNav() {
  navSteps.forEach(navStep => {
    navStep.classList.remove("active");
  });
};

function saveSelectedPlan() {
  plans.forEach(planInput => {
    planInput.addEventListener("change", () => {
      selectedPlan = planInput.value;
      console.log(selectedPlan);
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
    console.log(selectedBilling);

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
        console.log(selectedAddons);
      } else {
        selectedAddons = selectedAddons.filter(item => item !== addon.id);
        console.log(selectedAddons);
      }
    })
  });
}

// function checkState() {
//   console.log("Plan:", selectedPlan);
//   console.log("Billing:", selectedBilling);
//   console.log("Addons:", selectedAddons);
// }

saveSelectedPlan();
handleBillingChange();
handleAddonChange();

// checkState();