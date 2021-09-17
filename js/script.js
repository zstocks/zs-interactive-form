const form = document.querySelector('form');
const name = document.querySelector('#name');
const email = document.querySelector('#email'); 
const otherJob = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
const shirtColor = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const activities = document.querySelector('#activities');
let totalCost = 0;
const activitiesCost = document.querySelector('#activities-cost');
const ccNumber = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const paymentType = document.querySelector('#payment');
const payOptions = paymentType.querySelectorAll('option');
const paymentMethods = [
    document.querySelector('#credit-card'), 
    document.querySelector('#paypal'), 
    document.querySelector('#bitcoin')
  ];
const activityCheckboxes = document.querySelectorAll('#activities input');

// object containing error messages for fields with conditional error messaging capabilities
const errorMessages = {
  name: {
    blankMsg: 'Name field cannot be blank',
    formatMsg: 'Please enter first and last name using only letters separated by a space'
  },
  email: {
    blankMsg: 'Email field cannot be blank',
    formatMsg: 'Email address must be formatted correctly. ex: name@domain.com'
  }
}

//*** FUNCTIONS ***//
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

/**
 * isValid and notValid functions apply/remove styling depending on whether user input is valid or not.
 * 
 * @param (HTMLElement) input - field to be verified, serves as a reference here to manipulate its parent and sibling elements
 */
const isValid = input => {
  input.parentElement.classList.remove('not-valid');
  input.parentElement.classList.add('valid');
  input.nextElementSibling.style.display = 'none';
}

const notValid = input => {
  input.parentElement.classList.add('not-valid');
  input.parentElement.classList.remove('valid');
  input.nextElementSibling.style.display = 'block';
}

/**
 * For fields with multiple error messages. If field is not valid, determines which error message to display
 * 
 * @param (function) valid - helper function to validate user input; returns true or false value
 * @param (HTMLElement) input - the field to be validated
 * @param (object) errorMessages - object containing custom error messages
 * @param (eventObject) e - the event object passed from the event handler
 */
const customErrorValidation = (valid, input, errorMessages, e) => {
  if (!valid) {
    if (e.type === 'submit') {
      e.preventDefault();
    }
    notValid(input);
    if (input.value === '') {
      // message to display if field is blank
      input.nextElementSibling.innerText = errorMessages.blankMsg;
    } else {
      // message to display if field is formatted incorrectly
      input.nextElementSibling.innerText = errorMessages.formatMsg;
    }
  } else {
    isValid(input);
  }
}

/**
 * displays/hides form hint based on the validation of a given field. For fields with only one error message.
 * 
 * @param (function) valid - helper function to validate user input; returns true or false value
 * @param (HTMLElement) input - the field to be validated
 * @param (eventObject) e - the event object passed from the event handler
 */
const basicValidation = (valid, input, e) => {
  // if valid returns false, display a hint on the page
  if (!valid) {
    if (e.type === 'submit') {
      e.preventDefault();
    }
    notValid(input);
  } else {
    // if valid returns true, hide the hint on the page
    isValid(input);
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
 const activityTimeSlot = activity.getAttribute('data-day-and-time');

 // Increase/decrease total activities' cost based on user checkbox selection
 if (activity.checked) {
  totalCost += activityCost;
 } else {
  totalCost -= activityCost;
 }
 
 // update the total cost on the page
 activitiesCost.innerText = `Total: $${totalCost}`;

 // handle activities with the same day and time as the selected activity
 for (const checkbox of activityCheckboxes) {
  // ensure the checkbox in question is not the activity checked/unchecked by the user
  if (checkbox !== activity) {
    const conflictingTimeSlot = checkbox.getAttribute('data-day-and-time');
    // disable any activities with the same time as the activity that was checked
    if (activityTimeSlot === conflictingTimeSlot && activity.checked) {
      checkbox.setAttribute('disabled', 'true');
      checkbox.parentElement.classList.add('disabled');
    // enable any activities with the same time as the activity that was unchecked
    } else if (activityTimeSlot === conflictingTimeSlot && !activity.checked) {
      checkbox.removeAttribute('disabled');
      checkbox.parentElement.classList.remove('disabled');
    }
  }
 }

 // validate activity in real time
  basicValidation(isValidActivity(), activitiesCost, e);
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
// keyup events for name, email, and the credit card payment method allow for real time validation
name.addEventListener('keyup', (e) => {
  customErrorValidation(isValidName(name.value), name, errorMessages.name, e);
});

email.addEventListener('keyup', (e) => {
  customErrorValidation(isValidEmail(email.value), email, errorMessages.email, e);
});

paymentMethods[0].addEventListener('keyup', (e) => {
  basicValidation(isValidCredit(ccNumber.value), ccNumber, e);
  basicValidation(isValidZip(zip.value), zip, e);
  basicValidation(isValidCvv(cvv.value), cvv, e);
});

// validate all fields when the form is submitted
form.addEventListener('submit', (e) => { 
  // validate name and show appropriate error message
  customErrorValidation(isValidName(name.value), name, errorMessages.name, e);

  // validate email and show appropriate error message
  customErrorValidation(isValidEmail(email.value), email, errorMessages.email, e);

  // validate activity
  basicValidation(isValidActivity(), activitiesCost, e);

  // validate credit card info only if Credit Card is the selected payment method
  if (paymentType.value === 'credit-card') {
    basicValidation(isValidCredit(ccNumber.value), ccNumber, e);
    basicValidation(isValidZip(zip.value), zip, e);
    basicValidation(isValidCvv(cvv.value), cvv, e);
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