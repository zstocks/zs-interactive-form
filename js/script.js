const otherJob = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
const shirtColor = document.querySelector('#color');
const shirtDesign = document.querySelector('#design');
const activities = document.querySelector('#activities');
let totalCost = 0;
const activitiesCost = document.querySelector('#activities-cost');

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
const paymentType = document.querySelector('#payment');
const payOptions = paymentType.querySelectorAll('option');
const credit = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

// by default, select the 'credit card' payment method
payOptions[1].selected = 'selected';

// instead of hiding these elements in this way, try
// building a function that shows the div associated
// with the selected payment method and hiding the 
// others. Call that method at runtime, and call it
// again in the event listener for the dropdown.
paypal.style.display = 'none';
bitcoin.style.display = 'none';