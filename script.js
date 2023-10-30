// GLOBAL VARIABLES //


// Array of hasSpecial characters to be included in password
var hasSpecialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of hasNumeric characters to be included in password
var hasNumericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of hasLowercase characters to be included in password
var hasLowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of hasUppercase characters to be included in password
var hasUpperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// MiN and MAX password allowed lengths
const MIN_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 128;

const ERROR_MESSAGE_1 = "Please select at least one character class from the options below.";
const ERROR_MESSAGE_2 = "The total percentages must add up to 100%. There's currently no room for percentage auto-completion without exceeding 100%.";
const ERROR_MESSAGE_3 = "The total percentages must add up to 100%. To enable automatic calculation, leave one or more selected fields blank and try again.";
const ERROR_MESSAGE_4 = "The total percentage exceeds 100%. Please make sure the sum does not exceed 100%.";
const ERROR_MESSAGE_5 = "Password length must be between 8 and 128 characters. Please provide a valid length within this range.";


// ==================================== //



// ALGORITHM //


// A) GET USER PREFERENCES 

function getPasswordOptions() {

  // Selects option Checkboxes
  var checkboxes = document.querySelectorAll('.option-checkbox');

  // Iterates through the checkboxes to determine which ones are checked and get associated percentages
  var userInput = {};
  var isCharClassSelected = [];

  checkboxes.forEach(function (checkbox) {
    const name = checkbox.getAttribute("name");
    const isChecked = checkbox.checked;
    const percentInput = checkbox.nextElementSibling.nextElementSibling;
    const percent = percentInput.value;

    if (isChecked) {
      userInput[name] = [isChecked, parseInt(percent)];
      isCharClassSelected.push(isChecked);
    } else {
      isCharClassSelected.push(isChecked);
    }
  });

  // Gets length of p/w user specified
  var lengthInput = document.querySelector('#pw-length');
  var pwLength = lengthInput.value;

  if (pwLength === "") {
    pwLength === null;
  } else {
    pwLength = parseInt(pwLength);
  }

  // Get total number of selected classes
  var selectedClassesCount = Object.keys(userInput).length;

  // Creates Object
  var userOptions = {
    selectedClasses: userInput,
    pwLength: pwLength,
    selectedClassesCount: selectedClassesCount,
    lower: isCharClassSelected[0],
    upper: isCharClassSelected[1],
    numeric: isCharClassSelected[2],
    special: isCharClassSelected[3]
  };

  return userOptions;
}




// B) GET PASSWORD STRING

function getPassword(userOptions) {

  // Returns Error message if no char class was selected
  if (!userOptions.lower && !userOptions.upper && !userOptions.numeric && !userOptions.special) {
    return ERROR_MESSAGE_1;
  }

  // Calculates number of NaN (unspecified percentages) and Total Percentage Sum the user specified
  var countNaN = 0;
  var totalPercentage = 0;

  for (charClass in userOptions.selectedClasses) {
    if (isNaN(userOptions.selectedClasses[charClass][1])) {
      countNaN++;
    } else {
      totalPercentage += userOptions.selectedClasses[charClass][1];
    }
  }

  // Returns Error message..
  if (totalPercentage > 100) {
    // If the total percentage specified is more than 100(%)
    return ERROR_MESSAGE_4;
  } else if (totalPercentage < 100) {
    if ( totalPercentage + countNaN > 100) {
      return ERROR_MESSAGE_2;
    }
    // If the total percentage specified is less than 100(%) and no automatic calculation can be done
    if (countNaN === 0) {
      return ERROR_MESSAGE_3;
    }

    // Automatically updates unspecified percentages
    var newPercentage = totalPercentage;
    for (charClass in userOptions.selectedClasses) {
      if (isNaN(userOptions.selectedClasses[charClass][1])) {
        userOptions.selectedClasses[charClass][1] = Math.ceil((100 - totalPercentage) / countNaN);
        newPercentage += userOptions.selectedClasses[charClass][1];
      }
      // If the newPercentage exceeds 100 due to Math.ceil rounding, value needs to be adjusted so that newPercentage === 100;
      if (newPercentage > 100) {
        var subtract = newPercentage - 100;
        userOptions.selectedClasses[charClass][1] -= subtract;
      }  
    }
  } else {
    if (countNaN !== 0) {
      return ERROR_MESSAGE_2;
    }
  }

  // Assign percentages to named variables.
  var lower = 0;
  var upper = 0;
  var numeric = 0;
  var special = 0;

  for (charClass in userOptions.selectedClasses) {

    if ("lower" in userOptions.selectedClasses) {
      lower = userOptions.selectedClasses["lower"][1];
    }
    if ("upper" in userOptions.selectedClasses) {
      upper = userOptions.selectedClasses["upper"][1];
    }
    if ("numeric" in userOptions.selectedClasses) {
      numeric = userOptions.selectedClasses["numeric"][1];
    }
    if ("special" in userOptions.selectedClasses) {
      special = userOptions.selectedClasses["special"][1];
    }
  }

  // Log percentages to Console (for debugging)
  
  console.log("========================");
  if ("lower" in userOptions.selectedClasses) {
    console.log("a-z Percentage: " + lower + "%" + " | " + "0 - " + (lower - 1));
  }
  if ("upper" in userOptions.selectedClasses) {
    console.log("A-Z Percentage: " + upper + "%" + " | " + lower + " - " + (lower + upper - 1));
  }
  if ("numeric" in userOptions.selectedClasses) {
    console.log("1-9 Percentage: " + numeric + "%" + " | " + (lower + upper) + " - " + (lower + upper + numeric - 1));
  }
  if ("special" in userOptions.selectedClasses) {
    console.log("!@^ Percentage: " + special + "%" + " | " + (lower + upper + numeric) + " - " + (lower + upper + numeric + special - 1));
  }
  console.log("========================");



  // Generate random password (algorithm)
  
  /* 
  Formula explanation
  -------------------
  Let's suppose we have selected 3 char classes (a-z, A-Z, 1-9).
  For "a-z", we chose 20% probability
  For "A-Z", we chose 50% proabability 
  For "1-9" we left the remaining (until it reaches 100%) which is 30%.

  This means that, in a scale or 1 - 100, we have the following ranges:
  1 - 20: choose a-z
  21 - 70: choose A-Z
  71 - 100: choose 1-9

  The for-loop will run as many times as the specified user length, 
  each time randomly choosing 1 char and concatinating to the "password" string.
  - First, it gets a random number between 1 and 100
  - Then, in the if statement, it will check if this number falls into the a-z, A-Z, or 1-9 ranges
  - Once determined, it will append a character of that class to the string

  NOTE: This does not ensure that the complete password will include all specified char classes.
        This will be checked in the generatePassword() function and if needed it will repeat the process.
  */

  var password = "";

  for (var i = 0; i < userOptions.pwLength; i++) {
    // Gets a number between 0 - 100
    var random = Math.floor(Math.random() * 100);
    // console.log("Random:", random);


    if (random < (lower) && userOptions.lower) {
      password += hasLowerCasedCharacters[Math.floor(Math.random() * hasLowerCasedCharacters.length)]

    } else if (random < (lower + upper) && userOptions.upper) {
      password += hasUpperCasedCharacters[Math.floor(Math.random() * hasUpperCasedCharacters.length)]

    } else if (random < (lower + upper + numeric) && userOptions.numeric) {
      password += hasNumericCharacters[Math.floor(Math.random() * hasNumericCharacters.length)]

    } else if (random < (lower + upper + numeric + special) && userOptions.special) {
      password += hasSpecialCharacters[Math.floor(Math.random() * hasSpecialCharacters.length)]
    }
  }

  return password;
}


// C) CHECK IF str INCLUDES AT LEAST 1 CHAR FROM arr

function includesChar(str, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) {
      return true;
    }
  }
  return false;
}



// D) PUT ALL COMMANDS TOGETHER AND GENERATE PASSWORD

function generatePassword() {

  // Gets P/W userOptions, return if null
  var userOptions = getPasswordOptions();

  // Return Error Message if no character classes were selected
  if (userOptions.pwLength < MIN_PASS_LENGTH || userOptions.pwLength > MAX_PASS_LENGTH) {
    return ERROR_MESSAGE_5;
  }

  // Creates var to store password
  var password;
  var tries = 1;

  while (true) {

    // Counts tries

    console.log("");
    console.log("Try " + tries + ":");
    tries++;

    // Creates password
  password = getPassword(userOptions);
  console.log(password);

    // Checks if password includes all user's specified char classes
    if (
      (!userOptions.lower || includesChar(password, hasLowerCasedCharacters)) &&
      (!userOptions.upper || includesChar(password, hasUpperCasedCharacters)) &&
      (!userOptions.numeric || includesChar(password, hasNumericCharacters)) &&
      (!userOptions.special || includesChar(password, hasSpecialCharacters))
    ) {
      // Breaks out of the loop if all criteria is met
      break;
    }
  }

  return password;
}




// ==================================== //



// EVENT LISTENERS/ SELECTORS //


// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);


// Option percentages behaviour //
var optionInputs = document.querySelectorAll(".option-input");

optionInputs.forEach(function (input) {
  input.addEventListener('input', function() {
    var percentageValue = parseInt(input.value);
    if (isNaN(percentageValue) || percentageValue < 1 || percentageValue > 100 || percentageValue !== parseFloat(input.value)) {
      input.value = "";
    }
  });
});

