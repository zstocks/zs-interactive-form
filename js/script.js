const form = document.querySelector('form');
const name = document.querySelector('#name');
const otherJob = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
const shirtColor = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const activities = document.querySelector('#activities');
let totalCost = 0;
const activitiesCost = document.querySelector('#activities-cost');
const paymentType = document.querySelector('#payment');
const payOptions = paymentType.querySelectorAll('option');
const paymentMethods = [
    document.querySelector('#credit-card'), 
    document.querySelector('#paypal'), 
    document.querySelector('#bitcoin')
  ];
const activityCheckboxes = document.querySelectorAll('#activities input');

/**
 * Updates the page to show only the selected payment method
 * 
 * @param (string) selectedMethod - the payment method selected by the user
 */
const updatePayMethod = selectedMethod => {
  for (let i = 0; i < paymentMethods.length; i++) {
    if (selectedMethod === paymentMethods[i].id) {
      paymentMethods[i].style.display = 'block';
    } else {
      paymentMethods[i].style.display = 'none';
    }
  }
}

// focus on name input field when page loads
name.focus();

//*** JOB ROLE ***//
// hide other job role field when page loads
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
// by default, select the 'credit card' payment method and update the form to show only the selected payment method
payOptions[1].selected = 'selected';
updatePayMethod(paymentType.value);

// when the user changes the payment method, update the page to display their selected payment method
paymentType.addEventListener('change', () => {
  updatePayMethod(paymentType.value);
});

//*** VALIDATION ***//
// see readme section 1.1
const isValidName = name => /^[a-zA-Z]+ [a-zA-Z]+$/.test(name);

// see readme section 1.2
const isValidEmail = email => /^[^@\s]+@[^@.\s]+\.[a-z]+$/i.test(email);

// check for selected activities by ensuring the totalCost is greater than 0
const isValidActivity = () => totalCost > 0 ? true : false;

// a number between 13 and 16 digits
const isValidCredit = ccNumber => /^\d{13,16}$/.test(ccNumber);

// a number exactly 5 digits
const isValidZip = zipCode => /^\d{5}$/.test(zipCode);

// a number exactly 3 digits
const isValidCvv = cvv => /^\d{3}$/.test(cvv);

// form validation to run when the form is submitted
form.addEventListener('submit', (e) => {
  const email = document.querySelector('#email');
  const activitiesHint = document.querySelector('#activities-hint');
  const ccNumber = document.querySelector('#cc-num');
  const zip = document.querySelector('#zip');
  const cvv = document.querySelector('#cvv');

  // see readme section 1
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
   * isValid and notValid apply/remove styling depending on whether user input is valid or not.
   * 
   * @param (HTMLElement) hint - html element containing the hing message
   */
  const isValid = hint => {
    hint.parentElement.classList.remove('not-valid');
    hint.parentElement.classList.add('valid');
    hint.style.display = 'none';
  }

  const notValid = hint => {
    e.preventDefault();
    hint.parentElement.classList.add('not-valid');
    hint.parentElement.classList.remove('valid');
    hint.style.display = 'block';
  }

  /**
   * displays/hides form hint based on the validation of a given field. For fields with only one error message.
   * 
   * @param (function) helperFunction - the function called to validate a field
   * @param (HTMLElement) hint - the html element containing the hint message for the field being validated
   */
  const basicValidation = (helperFunction, hint) => {
    // if helperFunction returns false, display a hint on the page
    if (!helperFunction) {
      notValid(hint);
    } else {
      // if helperFunction returns true, hide the hint on the page
      isValid(hint);
    }
  }

  /**
   * validates a field value and displays/hides a custom error message based on the type of validation error. For fields with custom error messages.
   * 
   * @param (string) fieldValue - the string entered into the field by the user
   * @param (HTMLElement) hint - the html element containing the hint message for the field being validated
   * @param (object) field - either name or email; refers to an object containing validation helper function and custom error messages
   */
  const customErrorValidation = (fieldValue, hint, field) => {
    if (!field.validate) {
      notValid(hint);
      if (fieldValue === '') {
        // message to display if field is blank
        hint.innerText = field.blankMsg;
      } else {
        // message to display if field is formatted incorrectly
        hint.innerText = field.formatMsg;
      }
    } else {
      isValid(hint);
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