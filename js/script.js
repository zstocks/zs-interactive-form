const form = document.querySelector('form');
const otherJob = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
const shirtColor = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const activities = document.querySelector('#activities');
let totalCost = 0;
const activitiesCost = document.querySelector('#activities-cost');
const paymentType = document.querySelector('#payment');
const payOptions = paymentType.querySelectorAll('option');
const credit = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const activityCheckboxes = document.querySelectorAll('#activities input');

// focus on name text field when page loads
document.querySelector('#name').focus();

//*** JOB ROLE ***//
// hide other job role text field when page loads
otherJob.style.display = 'none';

// hide/show job role dropdown depending on job role selected
jobRole.addEventListener('change', () => {
 if (jobRole.value === 'other') {
  otherJob.style.display = 'block';
 } else {
  otherJob.style.display = 'none';
 }
});

//*** T-SHIRT ***//
// disable the 'color' dropdown when page loads
shirtColor.setAttribute('disabled', 'true');

// display relevant shirt colors depending on which shirt design was selected
shirtDesign.addEventListener('change', () => {
 const design = shirtDesign.value;
 const colors = document.querySelectorAll('#color option');

 // enable color dropdown and reset its selected value
 shirtColor.removeAttribute('disabled');
 colors[0].selected = 'selected';

 // if the color's data-theme matches the theme selected by the user, display that color, otherwise hide that color
 for (let i = 0; i < colors.length; i++) {
   const theme = colors[i].getAttribute('data-theme');
   if (design === theme) {
    colors[i].removeAttribute('hidden');
   } else {
    colors[i].setAttribute('hidden', 'true');
   }
  }
});

//*** ACTIVITIES ***//
activities.addEventListener('change', (e) => {
 const activity = e.target;
 const activityCost = parseInt(activity.getAttribute('data-cost'));

 // Increase/decrease total activities' cost based on user checkbox selection
 if (activity.checked) {
  totalCost += activityCost;
 } else {
  totalCost -= activityCost;
 }
 
 // update the total cost on the page
 activitiesCost.innerText = `Total: $${totalCost}`;
});

//*** PAYMENT INFO ***//

/**
 * Updates the page to show only the selected payment method
 * 
 * @param (string) selectedMethod - the payment method selected by the user
 */
const updatePayMethod = (selectedMethod) => {
  if (selectedMethod === 'credit-card') {
    credit.style.display = 'block';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (selectedMethod === 'paypal') {
    paypal.style.display = 'block';
    credit.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (selectedMethod === 'bitcoin') {
    bitcoin.style.display = 'block';
    paypal.style.display = 'none';
    credit.style.display = 'none';
  }
}

// by default, select the 'credit card' payment method and update the form to show only the selected payment method
payOptions[1].selected = 'selected';
updatePayMethod(paymentType.value);

// when the user changes the payment method, update the page to display their selected payment method
paymentType.addEventListener('change', () => {
  updatePayMethod(paymentType.value);
});

//*** VALIDATION ***//
//*** helper functions to verify form fields ***//
const isValidName = (name) => {
  // see readme section 1.1
  return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);
}

const isValidEmail = (email) => {
  // see readme section 1.2
  return /^[^@\s]+@[^@.\s]+\.[a-z]+$/i.test(email);
}

const isValidActivity = () => {
  // check for selected activities by ensuring the totalCost is greater than 0
  return totalCost > 0 ? true : false;
}

const isValidCredit = (ccNumber) => {
  // a number between 13 and 16 digits
  return /^\d{13,16}$/.test(ccNumber);
}

const isValidZip = (zipCode) => {
  // a number exactly 5 digits
  return /^\d{5}$/.test(zipCode);
}

const isValidCvv = (cvv) => {
  // a number exactly 3 digits
  return /^\d{3}$/.test(cvv);
}

// form validation to run when the form is submitted
form.addEventListener('submit', (e) => {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const activitiesHint = document.querySelector('#activities-hint');
  const ccNumber = document.querySelector('#cc-num');
  const zip = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');
  const errorMessages = {
    name: {
      validate: isValidName(name.value),
      blankMsg: 'Name field cannot be blank',
      formatMsg: 'Please enter first and last name using only letters separated by a space'
    },
    email: {
      validate: isValidEmail(email.value),
      blankMsg: 'Email field cannot be blank',
      formatMsg: 'Email address must be formatted correctly. ex: name@domain.com'
    }
  }

  /**
   * displays/hides form hint based on the validation of a given field
   * 
   * @param (function) helperFunction - the function called to validate a field
   * @param (HTMLElement) hint - the html element containing the form hint message for the field being validated
   */
  const basicValidation = (helperFunction, hint) => {
    // if helperFunction returns false, display a hint on the page
    if (!helperFunction) {
      e.preventDefault();
      hint.style.display = 'block';
    } else {
      // if helperFunction returns true, hide the hint on the page
      hint.style.display = 'none';
    }
  }

  /**
   * validates a field value and displays/hides a custom error message based on the type of validation error
   * 
   * @param (string) fieldValue - the string entered into the field by the user
   * @param (HTMLElement) hint - the html element containing the form hint message for the field being validated
   * @param (object) type - either name or email; refers to an object that validates a field and contains custom error messages
   */
  const customErrorValidation = (fieldValue, hint, type) => {
    // check if field is valide by calling its validation helper function stored in the type object
    if (!type.validate) {
      e.preventDefault();
      if (fieldValue === '') {
        // message to display if field is blank
        hint.innerText = type.blankMsg;
      } else {
        // message to display if field is formatted incorrectly
        hint.innerText = type.formatMsg;
      }
      hint.style.display = 'block';
    } else {
      hint.style.display = 'none';
    }
  }

  // validate name and show appropriate error message
  customErrorValidation(name.value, name.nextElementSibling, errorMessages.name);

  // validate email and show appropriate error message
  customErrorValidation(email.value, email.nextElementSibling, errorMessages.email);

  // validate activity
  basicValidation(isValidActivity(), activitiesHint);

  // validate credit card info only if Credit Card is the selected payment method
  if (paymentType.value === 'credit-card') {
    basicValidation(isValidCredit(ccNumber.value), ccNumber.nextElementSibling);
    basicValidation(isValidZip(zip.value), zip.nextElementSibling);
    basicValidation(isValidCvv(cvv.value), cvv.nextElementSibling);
  }
});

//*** ACCESSIBILITY ***//
// listen for focus and blur events on each of the activity checkboxes
for (const checkbox of activityCheckboxes) {
  // if the focus event is detected, add the class .focus to its parent label
  checkbox.addEventListener('focus', () => {
    checkbox.parentElement.className = 'focus';
  });

  // if the blur event is detected, remove the class .focus to its parent label
  checkbox.addEventListener('blur', () => {
    checkbox.parentElement.classList.remove('focus');
  });
}