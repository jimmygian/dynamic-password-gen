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


// Function to prompt user for password options
function getPasswordOptions() {
  
  // 1. Get length of p/w user prefers, between 8 - 128 inclusive
  var pwLength = prompt("Choose password length (between 8 - 128 chars):");

  // Evaluate user input:
  while (pwLength !== null) {
    // Try to make user input a number
    pwLength = parseInt(pwLength);
    
    // Evaluate user input
    if (pwLength >= 8 && pwLength <= 128 && !isNaN(pwLength)) {
      // Break if user input is correct
      break;
    } else {
      // Re-prompt if user input is incorrect
      pwLength = prompt("Please insert a numberic value between 8 -128. Choose password length:");
    }
  }
  // Test pwLength output in console
  console.log("Password length is:", pwLength);


  // 2. Get prefered types (at least 1 of those char classes should be selected)
    
    // lowercase
    var hasLowercase = confirm("Should password include lowercase?");
    console.log("hasLowercase:", hasLowercase);
    // UPPERCASE
    var hasUppercase = confirm("Should password include uppercase?");
    console.log("hasUppercase:", hasUppercase);
    // Numeric
    var hasNumeric = confirm("Should password include numeric values?");
    console.log("hasNumeric:", hasNumeric);
    // Special chars
    var hasSpecial = confirm("Should password include special characters?");
    console.log("hasSpecial:", hasSpecial);


  // 3. Return an object with all user's p/w preferences
  var pwOptions = {
    length: pwLength,
    lowercase: hasLowercase,
    uppercase: hasUppercase,
    numeric: hasNumeric,
    special: hasSpecial
  };
  console.log("'pwOptions' object:", pwOptions)
  return pwOptions;
}




// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {
  getPasswordOptions()
  return "WORKS!!"
}

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