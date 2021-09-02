// focus on name text field when page loads
document.querySelector('#name').focus();

//*** JOB ROLE ***//
const otherJob = document.querySelector('#other-job-role');
const jobRole = document.querySelector('#title');
// hide other job role text field when page loads
otherJob.style.display = 'none';
// when 'other' is selected from the job role dropdown, display the other job role text field - otherwise hide it
jobRole.addEventListener('change', () => {
 if (jobRole.value === 'other') {
  otherJob.style.display = 'block';
 } else {
  otherJob.style.display = 'none';
 }
});

//*** T-SHIRT ***//
