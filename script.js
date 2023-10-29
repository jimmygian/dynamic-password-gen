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

// ==================================== //


// A) Function to prompt user for password options
function getPasswordOptions() {

  // Gets length of p/w user prefers, between 8 - 128 inclusive
  var pwLength = prompt("Choose password length (between 8 - 128 chars):");

  // Evaluates user input:
  while (pwLength !== null) {
    // Tries to make user input a number
    pwLength = parseInt(pwLength);

    if (pwLength >= 8 && pwLength <= 128 && !isNaN(pwLength)) {
      // Breaks if user input is correct
      break;
    } else {
      // Re-prompts if user input is incorrect
      pwLength = prompt("Please insert a numberic value between 8 -128. Choose password length:");
    }
  }
  // Returns if user canceled
  if (pwLength === null) {
    return null;
  }

  // Gets prefered types (at least 1 of those char classes should be selected)
  var hasLowercase = confirm("Should password include lowercase?");
  var hasUppercase = confirm("Should password include uppercase?");
  var hasNumeric = confirm("Should password include numeric values?");
  var hasSpecial = confirm("Should password include special characters?");

  // Get total number of allowed characters
  var charClasses = 0;
  if (hasLowercase) {
    charClasses++;
  }
  if (hasUppercase) {
    charClasses++;
  }
  if (hasNumeric) {
    charClasses++;
  }
  if (hasSpecial) {
    charClasses++;
  }


  // Returns an object with all user's p/w preferences
  var pwOptions = {
    length: pwLength,
    lowercase: hasLowercase,
    uppercase: hasUppercase,
    numeric: hasNumeric,
    special: hasSpecial,
    selectedClassesCount: charClasses
  };

  // Checks if at least 1 char class was chosen, return null if none was.
  if (pwOptions.lowercase === false && pwOptions.uppercase === false && pwOptions.numeric === false && pwOptions.special === false) {
    alert("ERROR: At least 1 of the available character classes must be chosen. Please try again.")
    return null;
  }
  return pwOptions;
}



// B) Function to generate password based on user input
function generatePassword() {

  // Gets P/W options, return if null
  var pwOptions = getPasswordOptions()

  // Returns if user did not provide sufficient info
  if (pwOptions === null) {
    return "** Try again! **"
  }

  // Gets number of total allowed chars && Calculates chances percentage ( 0 - 1 is like 0% - 100%)
  var totalChar = 0;
  var chanceLower = 0;
  var chanceUpper = 0;
  var chanceNumeric = 0;
  var chanceSpecial = 0;

  var multiplyCount = 1;
  var multiplyLower = 0;
  var multiplyUpper = 0;
  var multiplyNumeric = 0;
  var multiplySpecial = 0;

  // Depending on selected user classes, chances will be divided equally between them (1/3, 1/3, 1/3 or 1/2, 1/2 etc)
  if (pwOptions.lowercase) {
    // Updates number of total allowed chars (we need it for the calculation below)
    totalChar += hasLowerCasedCharacters.length;
    // Updates chances
    chanceLower = 1 / pwOptions.selectedClassesCount;

    multiplyLower = multiplyCount;
    multiplyCount++;
  }
  if (pwOptions.uppercase) {
    totalChar += hasUpperCasedCharacters.length;
    chanceUpper = 1 / pwOptions.selectedClassesCount;

    multiplyUpper = multiplyCount;
    multiplyCount++;
  }
  if (pwOptions.numeric) {
    totalChar += hasNumericCharacters.length;
    chanceNumeric = 1 / pwOptions.selectedClassesCount;

    multiplyNumeric = multiplyCount;
    multiplyCount++;
  }
  if (pwOptions.special) {
    totalChar += hasSpecialCharacters.length;
    chanceSpecial = 1 / pwOptions.selectedClassesCount;

    multiplySpecial = multiplyCount;
    multiplyCount++;
  }

  
  var password = "";

  for (var i = 0; i < pwOptions.length; i++) {
    var random = Math.floor(Math.random() * totalChar);


    // Formula: random number between 0-1 * length of total acceptable chars * multiplier (if it's 1st in line should be 1, if second it should be 2 etc.)
    if (random < (chanceLower * totalChar * multiplyLower) && pwOptions.lowercase) {
      // Formula: Random num between 0 and 1 multiplied by specified length = Random number between 0 and length
      // Math.floor() is used to round decimal
      password += hasLowerCasedCharacters[Math.floor(Math.random() * hasLowerCasedCharacters.length)]

    } else if (random < (chanceUpper * totalChar * multiplyUpper) && pwOptions.uppercase) {
      password += hasUpperCasedCharacters[Math.floor(Math.random() * hasUpperCasedCharacters.length)]

    } else if (random < (chanceNumeric * totalChar * multiplyNumeric) && pwOptions.numeric) {
      password += hasNumericCharacters[Math.floor(Math.random() * hasNumericCharacters.length)]  

    } else if (random < (chanceSpecial * totalChar * multiplySpecial) && pwOptions.special) {
      password += hasSpecialCharacters[Math.floor(Math.random() * hasSpecialCharacters.length)]  
    }
  }


  return password;
}




// ==================================== //

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