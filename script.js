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

// ==================================== //



// ALGORITHM //


// A) GET USER PREFERENCES 

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
      pwLength = prompt("Please insert a numberic value between 8 - 128. Choose password length:");
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

  // Get total number of allowed character classes
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
  var pwPrefs = {
    length: pwLength,
    lowercase: hasLowercase,
    uppercase: hasUppercase,
    numeric: hasNumeric,
    special: hasSpecial,
    selectedClassesCount: charClasses
  };

  // Checks if at least 1 char class was chosen, return null if none was.
  if (pwPrefs.lowercase === false && pwPrefs.uppercase === false && pwPrefs.numeric === false && pwPrefs.special === false) {
    alert("ERROR: At least 1 of the available character classes must be chosen. Please try again.")
    return null;
  }
  return pwPrefs;
}


// B) GET PASSWORD STRING

function getPassword(prefs) {

  // Returns if user did not provide sufficient info
  if (prefs === null) {
    return "** Try again! **"
  }

  // Gets number of total allowed chars && Calculates chances percentage ( 0 - 1 is like 0% - 100%)
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
  if (prefs.lowercase) {
    // Updates chances
    chanceLower = 1 / prefs.selectedClassesCount;
    // Updates multiplier
    multiplyLower = multiplyCount;
    multiplyCount++;
  }
  if (prefs.uppercase) {
    chanceUpper = 1 / prefs.selectedClassesCount;
    multiplyUpper = multiplyCount;
    multiplyCount++;
  }
  if (prefs.numeric) {
    chanceNumeric = 1 / prefs.selectedClassesCount;
    multiplyNumeric = multiplyCount;
    multiplyCount++;
  }
  if (prefs.special) {
    chanceSpecial = 1 / prefs.selectedClassesCount;
    multiplySpecial = multiplyCount;
    multiplyCount++;
  }

  var password = "";
  var percentage = 100;
  for (var i = 0; i < prefs.length; i++) {
    var random = Math.floor(Math.random() * percentage);
    console.log("Random:", random);


    // Formula: random number between 0-1 * 100 * multiplier (depending on which one is first in the if statement)
    // e.g. Let's suppose user wants all 4 char classes:
    // It basically needs to be if random between 0 - 25 choose lower, else if between 25 -50 choose upper, else if 50 -75, else if 75 -100

    if (random < (chanceLower * percentage * multiplyLower) && prefs.lowercase) {
      // Formula: Random num between 0 and 1 multiplied by specified length = Random number between 0 and length
      // Math.floor() is used to round decimal
      console.log("chanceLower:", chanceLower * percentage * multiplyLower);
      password += hasLowerCasedCharacters[Math.floor(Math.random() * hasLowerCasedCharacters.length)]

    } else if (random < (chanceUpper * percentage * multiplyUpper) && prefs.uppercase) {
      console.log("chanceUpper:", chanceUpper * percentage * multiplyUpper);
      password += hasUpperCasedCharacters[Math.floor(Math.random() * hasUpperCasedCharacters.length)]

    } else if (random < (chanceNumeric * percentage * multiplyNumeric) && prefs.numeric) {
      console.log("chanceNumeric:", chanceNumeric * percentage * multiplyNumeric);
      password += hasNumericCharacters[Math.floor(Math.random() * hasNumericCharacters.length)]  

    } else if (random < (chanceSpecial * percentage * multiplySpecial) && prefs.special) {
      console.log("chanceSpecial:", chanceSpecial * percentage * multiplySpecial);
      password += hasSpecialCharacters[Math.floor(Math.random() * hasSpecialCharacters.length)]  
    }
  }

  return password;
}



// C) GENERATE PASSWORD

function generatePassword() {

  // Gets P/W prefs, return if null
  var prefs = getPasswordOptions();
  var password = getPassword(prefs);

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