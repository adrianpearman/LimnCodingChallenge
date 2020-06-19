// VARIABLES
// PopUpForm DOM Elements
const companyName = document.getElementById("companyName");
const emailAddress = document.getElementById("emailAddress");
const fullName = document.getElementById("fullName");
const phoneNumber = document.getElementById("phoneNumber");
const submitButton = document.getElementById("submit-button");
// Error DOM Elements
const errorCompany = document.getElementById("error-company");
const errorEmail = document.getElementById("error-email");
const errorName = document.getElementById("error-name");
const errorPhone = document.getElementById("error-phone");
// PopUpForm DOM Elements
const popUpButton1 = document.getElementById("book-consultation-1");
const popUpButton2 = document.getElementById("book-consultation-2");
const popUpContainer = document.querySelector(".popup");
const popUpForm = document.querySelector(".popup-form-container");
const popUpCloseFormButton = document.querySelector(".popup-close-button");
const popupErrorContainer = document.querySelector(".popup-error-container");
const popupSuccessContainer = document.querySelector(
  ".popup-success-container"
);

// Form State
let popUpFormState = {
  companyName: null,
  companyNameValid: null,
  emailAddress: null,
  emailAddressValid: null,
  fullName: null,
  fullNameValid: null,
  phoneNumber: null,
  phoneNumberValid: null,
};
// Reuseable functions
const resetAppState = () => {
  // Clearing input values
  companyName.value = "";
  emailAddress.value = "";
  fullName.value = "";
  phoneNumber.value = "";

  popUpFormState = {
    companyName: null,
    companyNameValid: null,
    emailAddress: null,
    emailValid: null,
    fullName: null,
    fullNameValid: null,
    phoneNumber: null,
    phoneNumberValid: null,
  };
};
const windowScroll = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
// Individual Validation Functions
const validate = {
  validateEmail: (email) => {
    if (email === undefined || email === null) {
      return false;
    }
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validatePhoneNumber: (number) => {
    if (number === undefined || number === null) {
      return false;
    }
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(parseInt(number));
  },
  validateNameLength: (text) => {
    if (text === undefined || text === null) {
      return false;
    }
    if (text.length <= 3) {
      return false;
    } else {
      return true;
    }
  },
};
//Validating the Inputs
const validateFormEntries = (state) => {
  // Setting Valid Company Name
  if (validate.validateNameLength(state.companyName)) {
    popUpFormState.companyNameValid = true;
    errorCompany.classList.add("hide");
    companyName.classList.remove("popup-input-error");
  } else {
    popUpFormState.companyNameValid = false;
    errorCompany.classList.remove("hide");
    companyName.classList.add("popup-input-error");
  }
  // Setting Valid Email
  if (validate.validateEmail(state.emailAddress)) {
    popUpFormState.emailAddressValid = true;
    errorEmail.classList.add("hide");
    emailAddress.classList.remove("popup-input-error");
  } else {
    popUpFormState.emailAddressValid = false;
    errorEmail.classList.remove("hide");
    emailAddress.classList.add("popup-input-error");
  }
  // Setting Valid Name
  if (validate.validateNameLength(state.fullName)) {
    popUpFormState.fullNameValid = true;
    errorName.classList.add("hide");
    fullName.classList.remove("popup-input-error");
  } else {
    popUpFormState.fullNameValid = false;
    errorName.classList.remove("hide");
    fullName.classList.add("popup-input-error");
  }
  // Setting Valid Phone Number
  if (validate.validatePhoneNumber(state.phoneNumber)) {
    popUpFormState.phoneNumberValid = true;
    errorPhone.classList.add("hide");
    phoneNumber.classList.remove("popup-input-error");
  } else {
    popUpFormState.phoneNumberValid = false;
    errorPhone.classList.remove("hide");
    phoneNumber.classList.add("popup-input-error");
  }
};
// Updating Application State
const updateFormState = (event, state) => {
  const ALLOWED_PHONE_VALUES = /[0-9\/]+/;
  if (state === "phoneNumber") {
    if (!ALLOWED_PHONE_VALUES.test(event.key)) {
      event.preventDefault();
    } else {
      popUpFormState[state] = event.target.value;
    }
  }
  popUpFormState[state] = event.target.value;
};
// Submitting content & running validation functions
const submitForm = () => {
  validateFormEntries(popUpFormState);
  // Case for new errors in contact form
  if (
    popUpFormState.companyNameValid === true &&
    popUpFormState.emailAddressValid === true &&
    popUpFormState.fullNameValid === true &&
    popUpFormState.phoneNumberValid === true
  ) {
    popupSuccessContainer.classList.remove("hide");
    popupErrorContainer.classList.add("hide");

    // Set timeout used to simulate a network request.
    setTimeout(() => {
      const {
        companyName,
        emailAddress,
        fullName,
        phoneNumber,
      } = popUpFormState;

      // Replace section here for sending the content to the backend
      console.log("Sent contact information to backend", {
        companyName,
        emailAddress,
        fullName,
        phoneNumber,
      });

      // Clearing UI
      resetAppState();
      popupSuccessContainer.classList.add("hide");
      popupErrorContainer.classList.add("hide");
      popUpContainer.classList.remove("show");
    }, 700);
  }
  // Case for any errors in the Contact Form
  else {
    popupErrorContainer.classList.remove("hide");
    popupSuccessContainer.classList.add("hide");
  }
};

// UI ACTIONS
// Opening the pop up form
popUpButton1.addEventListener("click", () => {
  windowScroll();
  popUpContainer.classList.add("show");
});
popUpButton2.addEventListener("click", () => {
  windowScroll();
  popUpContainer.classList.add("show");
});
// Closing the pop up form
popUpContainer.addEventListener("click", () => {
  popUpContainer.classList.remove("show");
  resetAppState();
});
popUpCloseFormButton.addEventListener("click", () => {
  popUpContainer.classList.remove("show");
  resetAppState();
});
// Preventing form closing on events in the form
popUpForm.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Form Actions
companyName.addEventListener("keyup", (event) => {
  updateFormState(event, "companyName");
});
emailAddress.addEventListener("keyup", (event) => {
  updateFormState(event, "emailAddress");
});
fullName.addEventListener("keyup", (event) => {
  updateFormState(event, "fullName");
});
phoneNumber.addEventListener("keyup", (event) => {
  updateFormState(event, "phoneNumber");
});
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  submitForm();
});
