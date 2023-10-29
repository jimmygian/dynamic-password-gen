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

  // Select option Checkboxes
  var optionCheckboxes = document.querySelectorAll('.option-checkbox');

  var useruserOptionsInput = {};
  var charClassesBool = []
  // Iterate through the checkboxes to determine which ones are checked and get associated percentages
  optionCheckboxes.forEach(function (checkbox) {
    const name = checkbox.getAttribute("name");
    const isChecked = checkbox.checked;
    const percentInput = checkbox.nextElementSibling.nextElementSibling;
    const percent = percentInput.value;

    if (isChecked) {
      useruserOptionsInput[name] = [isChecked, parseInt(percent)];
      charClassesBool.push(isChecked);
    } else {
      charClassesBool.push(isChecked);
    }
  });


  // Gets length of p/w user prefers, between 8 - 128 inclusive
  var lengthInput = document.querySelector('#pw-length');
  var pwLength = lengthInput.value;

  if (pwLength === "") {
    pwLength === null;
  } else {
    pwLength = parseInt(pwLength);
  }

  // Get total number of selected classes
  var selectedClassesCount = Object.keys(useruserOptionsInput).length;

  // Creates Object
  var userOptions = {
    selectedClasses: useruserOptionsInput,
    pwLength: pwLength,
    selectedClassesCount: selectedClassesCount,
    lower: charClassesBool[0],
    upper: charClassesBool[1],
    numeric: charClassesBool[2],
    special: charClassesBool[3]
  };

  console.log(userOptions);

  return userOptions;
}




// B) GET PASSWORD STRING

function getPassword(userOptions) {

  // If all false, return
  if (!userOptions.lower && !userOptions.upper && !userOptions.numeric && !userOptions.special) {
    return "Please select at least one of the character classes below."
  }

  // Calculates number of NaN and Total Percentage the user specified
  var countNaN = 0;
  var totalPercentage = 0;

  var lower = 0;
  var upper = 0;
  var numeric = 0;
  var special = 0;

  for (element in userOptions.selectedClasses) {

    if (isNaN(userOptions.selectedClasses[element][1])) {
      countNaN++;
    } else {
      totalPercentage += userOptions.selectedClasses[element][1];
    }
  }


  if (totalPercentage > 100) {
    return "Percentage Exceeds 100%";
  } else if (totalPercentage < 100) {
    if (countNaN === 0) {
      return "Percentages must total 100%. To automatically calculate, leave one or more selected fields blank.";
    }

    var newPercentage = totalPercentage;
    for (element in userOptions.selectedClasses) {
      if (isNaN(userOptions.selectedClasses[element][1])) {
        userOptions.selectedClasses[element][1] = Math.ceil((100 - totalPercentage) / countNaN);
        newPercentage += userOptions.selectedClasses[element][1];
      }
      if (newPercentage > 100) {
        var subtract = newPercentage - 100;
        userOptions.selectedClasses[element][1] -= subtract;
      }
      
    }
  } else {
    if (countNaN !== 0) {
      return "Percentages must total 100%. There is no room for percentage auto-completion without exceeding 100%."
    }
  }
  // multiplyLower = 1;
  // multiplyUpper = 1;
  // multiplyNumeric = 1;
  // multiplySpecial = 1;
  // multiplyCount = 1;

  for (element in userOptions.selectedClasses) {

    if ("lower" in userOptions.selectedClasses) {
      lower = userOptions.selectedClasses["lower"][1];
      // multiplyLower = multiplyLower * multiplyCount;
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

  // Store multiply count
  var multiplyLower = 1;
  var multiplyUpper = 1;
  var multiplyNumeric = 1;
  var multiplySpecial = 1;
  var multiplyCount = 1;

  if (userOptions.lower) {
    multiplyLower *= multiplyCount;
    multiplyCount++;
  }
  if (userOptions.upper) {
    multiplyUpper *= multiplyCount;
    multiplyCount++;
  }
  if (userOptions.numeric) {
    multiplyNumeric *= multiplyCount;
    multiplyCount++;
  }
  if (userOptions.special) {
    multiplySpecial *= multiplyCount;
    multiplyCount++;
  }
  


  // console.log("Count NaN:", countNaN);
  // console.log("Total Percentage:", totalPercentage);

  // console.log("========================")

  // for ( element in userOptions.selectedClasses) {
  //   console.log(element)
  //   console.log(userOptions.selectedClasses[element][1])
  // }
  console.log("lower:", lower)
  console.log("upper:", upper)
  console.log("numeric:", numeric)
  console.log("special:", special)



  var password = "";
  var percentage = 1;


  for (var i = 0; i < userOptions.pwLength; i++) {
    // Gets a number between 0 - 100
    var random = Math.floor(Math.random() * 100);
    console.log("Random:", random);


    // Formula: random number between 0-1 * 100 * multiplier (depending on which one is first in the if statement)
    // e.g. Let's suppose user wants all 4 char classes:
    // It basically needs to be if random between 0 - 25 choose lower, else if between 25 -50 choose upper, else if 50 -75, else if 75 -100

    if (random < (lower) && userOptions.lower) {
      // Formula: Random num between 0 and 1 multiplied by specified length = Random number between 0 and length
      // Math.floor() is used to round decimal
      console.log("lowerPercentage:", lower);
      password += hasLowerCasedCharacters[Math.floor(Math.random() * hasLowerCasedCharacters.length)]

    } else if (random < (lower + upper) && userOptions.upper) {
      console.log("upperPercentage:", lower + upper);
      password += hasUpperCasedCharacters[Math.floor(Math.random() * hasUpperCasedCharacters.length)]

    } else if (random < (lower + upper + numeric) && userOptions.numeric) {
      console.log("numPercentage:", lower + upper + numeric);
      password += hasNumericCharacters[Math.floor(Math.random() * hasNumericCharacters.length)]

    } else if (random < (lower + upper + numeric + special) && userOptions.special) {
      console.log("specialPercentage:", lower + upper + numeric + special);
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

  if (userOptions.pwLength < 8 || userOptions.pwLength > 128) {
    return "Password length must be between 8 - 128 characters. Please try again."
  }

  // Creates var to store password
  var password;

  while (true) {
    // Creates password
  password = getPassword(userOptions);

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
