# zs-interactive-form
 An interactive form using JavaScript
*****
*****
1. Conditional Error Messaging: 
   
   1.1 Description

      In this application, conditional error messaging has two components, the errorMessages object, and the customErrorValidation() function.
         a) The errorMessages object contains custom error messages for each field with conditional error messaging enabled. Using an object for this allows for easy scaling if there was ever a need enable conditional error messaging for more fields, or to add additional custom error messages.
         b) The customErrorValidation() function determines which error message should be accessed in the errorMessages object and displays that message in the hint element on the page.

      Currently, conditional error messaging is enabled for the following fields:
         1. Name
         2. Email

      Note: All RegEx expressions used in validation helper functions were developed and tested using RegEx Pal (https://www.regexpal.com/).
*****
*****
2. Real-time Validation:

   2.1 Description

      The real-time validation feature works by running the basicValidation() or customErrorValidation() functions inside keyup event listeners attached to text input elements. The validation function to run depends on whether the field being validated has conditional error messaging enabled. Everytime a key is released, the associated field will be validated, and the appropriate styling will be shown on the page.

      The activities section will be validated everytime a box is checked or unchecked in that section. 

      Currently, real-time validation is enabled for the following fields:
         1. Name
         2. Email
         3. Activities
         4. Credit card information (credit card number, zip code, and cvv)