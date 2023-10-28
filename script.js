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
  
  // 1. Gets length of p/w user prefers, between 8 - 128 inclusive
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
  // Tests pwLength output in console
  console.log("Password length is:", pwLength);

  // Returns if user canceled
  if (pwLength === null) {
    return null;
  }

  // 2. Gets prefered types (at least 1 of those char classes should be selected)

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
  

  // 3. Returns an object with all user's p/w preferences
  var pwOptions = {
    length: pwLength,
    lowercase: hasLowercase,
    uppercase: hasUppercase,
    numeric: hasNumeric,
    special: hasSpecial
  };

  // Checks if at least 1 char class was chosen, return null if none was.
  if (pwOptions.lowercase === false && pwOptions.uppercase === false && pwOptions.numeric === false && pwOptions.special === false) {
    alert("ERROR: At least 1 of the available character classes must be chosen. Please try again.")
    return null;
  }
  return pwOptions;
}



// B) Function for getting a random element from an array
function getRandom(arr) {

  // Creates a variable to store the randomized array
  var randomArr = [];
  
  // Copies array so that original is not modified
  var unshuffledArr = [];
  var unshuffledArr = unshuffledArr.concat(arr);

  // Shuffles array
  while (unshuffledArr.length !== 0) {
    // Chooses a random number between 0 and array's length
    var j = Math.floor(Math.random() * (unshuffledArr.length));
    // Concats the char of that index to randomArr
    randomArr = randomArr.concat(unshuffledArr[j])
    // Removes that char from the unshuffled array
    unshuffledArr.splice(j, 1);
  }
  
  // Returns randomized array
  return randomArr;
}



// C) Function to generate password with user input
function generatePassword() {
  
  // Gets P/W options, return if null
  var pwOptions = getPasswordOptions()
  // console.log("'pwOptions' object:", pwOptions)

  if (pwOptions === null) {
    return "** Try again! **"
  }
  
  // Generates arr of acceptable chars
  var allowedChars = [];
  if (pwOptions.lowercase) {
    allowedChars = allowedChars.concat(hasLowerCasedCharacters)
  }
  if (pwOptions.uppercase) {
    allowedChars = allowedChars.concat(hasUpperCasedCharacters)
  }
  if (pwOptions.numeric) {
    allowedChars = allowedChars.concat(hasNumericCharacters)
  }
  if (pwOptions.special) {
    allowedChars = allowedChars.concat(hasSpecialCharacters)
  }

  // Logs allowed chars in console
  console.log("allowedChars:", allowedChars)

  // Gets randomized array
  var randomCharArr = getRandom(allowedChars);
  console.log("Random Char Array:", randomCharArr)
  // console.log("allowedChars:", allowedChars)


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