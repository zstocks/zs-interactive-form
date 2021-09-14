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
  return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name); // see readme section 1.1
}

const isValidEmail = (email) => {
  return /^[^@\s]+@[^@.\s]+\.[a-z]+$/i.test(email); // see readme section 1.2
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

form.addEventListener('submit', (e) => {
  const name = document.querySelector('#name').value;
  const nameHint = document.querySelector('#name-hint');
  const email = document.querySelector('#email').value;
  const emailHint = document.querySelector('#email-hint');
  const activitiesHint = document.querySelector('#activities-hint');
  const ccNumber = document.querySelector('#cc-num').value;
  const ccHint = document.querySelector('#cc-hint');
  const zip = document.querySelector('#zip').value;
  const zipHint = document.querySelector('#zip-hint');
  const cvv = document.querySelector('#cvv').value;
  const cvvHint = document.querySelector('#cvv-hint');
  const errorMessages = {
    name: {
      validate: isValidName(name),
      blank: 'Name field cannot be blank',
      format: 'Please enter first and last name using only letters separated by a space'
    },
    email: {
      validate: isValidEmail(email),
      blank: 'Email field cannot be blank',
      format: 'Email address must be formatted correctly. ex: name@domain.com'
    }
  }

  const basicValidation = (helperFunction, hint) => {
    // if helperFunction returns false, display a hint on the page
    if (!helperFunction) {
      e.preventDefault();
      hint.style.display = 'block';
    } else {
      // if helperFunction returns true, hide the hint-text
      hint.style.display = 'none';
    }
  }

  const customErrorValidation = (fieldValue, hint, type) => {
    if (!type.validate) {
      e.preventDefault();
      if (fieldValue === '') {
        hint.innerText = type.blank;
      } else {
        hint.innerText = type.format;
      }
      hint.style.display = 'block';
    } else {
      hint.style.display = 'none';
    }
  }

  // validate name and show appropriate error message
  customErrorValidation(name, nameHint, errorMessages.name);

  // validate email and show appropriate error message
  customErrorValidation(email, emailHint, errorMessages.email);

  // validate activity
  basicValidation(isValidActivity(), activitiesHint);

  // validate credit card info only if Credit Card is the selected payment method
  if (paymentType.value === 'credit-card') {
    basicValidation(isValidCredit(ccNumber), ccHint);
    basicValidation(isValidZip(zip), zipHint);
    basicValidation(isValidCvv(cvv), cvvHint);
  }
});