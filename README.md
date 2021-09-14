# zs-interactive-form
 An interactive form using JavaScript

1. Conditional Error Messaging: 
 Display the appropriate error message/hint-text when a form field is not valid on form submission.
 All RegEx expressions were developed and tested using RegEx Pal (https://www.regexpal.com/).

 1.1 Name
  Acceptable values: ^[a-zA-Z]+ [a-zA-Z]+$
  The name field accepts a first and last name separated by a space, consisting of letters.

  Error messages:
  a) The application first checks to see if the name field is empty - if so, hint-text will read: Name field cannot be blank

  b) Next, the application ensures the user is only entering letters with a space. 
     If this criteria is not met, the hint-text will read: Please enter first and last name using only letters separated by a space

 1.2 Email
  The email field accepts only email addresses that follow the format: string@string.a-z
  Here is the logic for the regex expression: ^[^@\s]+@[^@.\s]+\.[a-z]+$
   1. [^@\s]+ - accepts any string of characters that are not '@' or whitespace
   2. @ - followed by '@' 
   3. [^@.\s]+ - followed by any string of characters that are not '@', '.', or whitespace
   4. \.[a-z] - followed by '.' and a string made of letters strictly a-z

   Error messages:
   a) The application first checks to see if the email field is empty - if so, hint-text will read: Email field cannot be blank

   b) Next, the application ensures the email address meets the required format.
      If the required format is not met, hint-text will read: Email address must be formatted correctly. ex: name@domain.com


