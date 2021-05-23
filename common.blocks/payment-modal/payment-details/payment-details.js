// ==================CONTENT================== //
// I. CREATING GLOBAL DOM VARIABLES            //
//                                             //
// II. CONTROLLER                              //
//  2.1 Global DOM Variables Initialization    //
//  2.2 Event Listeners Initialization         //
//                                             //
// III. COMMON FUNCTIONS                       //
//  3.1 Global DOM Variables                   //
//  3.2 Event Listeners                        //
//  3.3 Adaptive Credit Card                   //
//  3.4 Filling card information               //
// =========================================== //

// I. CREATING GLOBAL DOM VARIABLES 
// ==================================================================================================================================================================================

let visaLogo,
    masterCardLogo,
    cardNumber,
    cardHolderName,
    expiryDate;
let cardHolderNamerDefault;
let cardNumberDefault;
let expiryDateDefault;
let cardNumberInput,
    nameOnCardInput,
    validThroughInput,
    cvvInput;

// II. CONTROLLER
// ==================================================================================================================================================================================

function creditCardInteractionsController() {
  // *** 2.1 Global DOM Variables Initialization ***
  initPaymentDetailsPageVariables();

  // *** 2.2 Event Listeners Initialization ***
  initPaymentDetailsEventListeners();
}

// III. PAYMENT-DETAILS PAGE FUNCTIONS
// ==================================================================================================================================================================================

// *** 3.1 Global DOM Variables Initialization ***

function initPaymentDetailsPageVariables() {
  [
    visaLogo,
    masterCardLogo,
    cardNumber,
    cardHolderName,
    expiryDate
  ] = findCreditCardElements();

  [
    cardNumberInput,
    nameOnCardInput,
    validThroughInput,
    cvvInput
  ] = findCreditCardInputFields();

  cardHolderNamerDefault = cardHolderName.innerHTML;
  cardNumberDefault = getCardNumberDefaultValues(cardNumber);
  expiryDateDefault = expiryDate.innerHTML;

  //Local Functions / Helpers
  function findCreditCardElements() {
    return [
      document.querySelector('.visa-logo'),
      document.querySelector('.master-card-logo'),
      document.querySelector('.card-number'),
      document.querySelector('.card-holder-name'),
      document.querySelector('.expiry-date')
    ];
  }
  
  function findCreditCardInputFields() {
    return [
      document.querySelector('#card-number'),
      document.querySelector('#name-on-card'),
      document.querySelector('#valid-through'),
      document.querySelector('#card-cvv')
    ];
  }
}

// *** 3.2 EVENT LISTENERS ***

function initPaymentDetailsEventListeners() {
  nameOnCardInput.addEventListener('input', () => { 
    let filteredInput = filterOnlyLettersFromString(nameOnCardInput.value);

    nameOnCardInput.value = filteredInput || null;

    writeCardHolderName(nameOnCardInput.value.toUpperCase(), cardHolderName);

    if (nameOnCardInput.value === "") {
      writeCardHolderName(cardHolderNamerDefault, cardHolderName);
    }
  })

  cardNumberInput.addEventListener('input', () => { 
    let filteredInput = filterOnlyNumbersFromString(cardNumberInput.value);

    chooseVisaOrMasterCardLogo(filteredInput, visaLogo, masterCardLogo);

    cardNumberInput.value = putSpacesBetweenNumbers(filteredInput);
    
    writeCreditCardNumber(cardNumberInput.value, cardNumber);

    if (cardNumberInput.value === "") {
      writeCreditCardNumber(cardNumberDefault, cardNumber);
    }
  })

  validThroughInput.addEventListener('input', () => { 
    let filteredInput = filterOnlyNumbersFromString(validThroughInput.value);

    validThroughInput.value = putSlashBetweenDates(filteredInput);

    writeCardHolderName(validThroughInput.value, expiryDate);

    if (validThroughInput.value=== "") {
      writeCardHolderName(expiryDateDefault, expiryDate);
    }
  })

  cvvInput.addEventListener('input', () => { 
    let filteredInput = filterOnlyNumbersFromString(cvvInput.value);

    cvvInput.value = filteredInput;
  })
}

// *** 3.3 ADAPTIVE CREDIT CARD ***

function resizeCreditCard() {
  const creditCardWrapper = document.querySelector('.payment-details__left-column');
  const creditCard = document.querySelector('.credit-card');

  // WIDTH: Wrapper 1.25 : 1 Card
  
  let creditCardScale = (creditCardWrapper.offsetWidth / creditCard.offsetWidth - 0.25) <= 1 ? creditCardWrapper.offsetWidth / creditCard.offsetWidth - 0.25 : 1;
  creditCard.style.transform = `scale(${creditCardScale})`;
}

// *** 3.4 FILLING CARD INFORMATION ***

function getCardNumberDefaultValues(cardNumber) {
  let result = '';
  cardNumber.querySelectorAll('span').forEach((fourNumbers, index) => {
    if (index === 0) result += fourNumbers.innerHTML;
    if (index !== 0) result += ' ' + fourNumbers.innerHTML;
  });
  return result;
}

function filterOnlyNumbersFromString(stringToFilter) {
  return (stringToFilter.match(/\d+/g)) ? stringToFilter.match(/\d+/g).join('') : null;
}

function putSpacesBetweenNumbers(filteredString) {
  if (!filteredString) return null;

  let positionInString = 0;
  let stringWithSpaces = '';

  for (let i = positionInString; i < filteredString.length; i++) {
    switch(positionInString) {
      case 4:
        stringWithSpaces += ' ';
        positionInString++;
        break;
      case 9:
        stringWithSpaces += ' ';
        positionInString++;
        break;
      case 14:
        stringWithSpaces += ' ';
        positionInString++;
        break;
    }
    stringWithSpaces += filteredString[i];
    positionInString++;
  }

  return stringWithSpaces;
}

function writeCreditCardNumber(inputValue, cardNumber) {
  const eachFourNumbersOnCard = cardNumber.querySelectorAll('span');
  let eachFourNumbersFromInput = inputValue.split(' ');

  for (let i = 0; i < eachFourNumbersOnCard.length; i++) {
    eachFourNumbersOnCard[i].innerHTML = eachFourNumbersFromInput[i] ? eachFourNumbersFromInput[i] : '';
  }
}

function chooseVisaOrMasterCardLogo(filteredInput, visaLogo, masterCardLogo) {
  if(isMasterCard(filteredInput, visaLogo, masterCardLogo)) {
    showMasterCardLogo(visaLogo, masterCardLogo);
    return 'MasterCard';
  }
  if(isVisa(filteredInput)) {
    showVisaLogo(visaLogo, masterCardLogo);
    return 'Visa';
  }
  return null;
  
  function isMasterCard(filteredInput) {
    return filteredInput ? filteredInput[0] === '5' : null;
  }
  function isVisa(filteredInput) {
    return filteredInput ? filteredInput[0] === '4' : null;
  }
  function showVisaLogo(visaLogo, masterCardLogo) {
    masterCardLogo.style.display = 'none';
    visaLogo.removeAttribute('style');
  }
  function showMasterCardLogo(visaLogo, masterCardLogo) {
    visaLogo.style.display = 'none';
    masterCardLogo.removeAttribute('style');
  }
}

// Card Holder Name

function filterOnlyLettersFromString(stringToFilter) {
  if (stringToFilter[0] == ' ') return null;

  let result;

  if (hasDoubleSpacesInLastTwoCharacters(stringToFilter)) {
    result = removeDoubleSpaces(stringToFilter)
  }

  if (result) {
    return result.match(/[ a-zA-Z]+/g) ? result.match(/[ a-zA-Z]+/g).join('') : null;
  }
  return stringToFilter.match(/[ a-zA-Z]+/g) ? stringToFilter.match(/[ a-zA-Z]+/g).join('') : null;
}

function hasDoubleSpacesInLastTwoCharacters(stringToCheck) {
  if (stringToCheck.length < 2) return false;
  if (stringToCheck[stringToCheck.length - 1] == ' '
  && stringToCheck[stringToCheck.length - 1] == stringToCheck[stringToCheck.length - 2]) return true;
  return false;
}

function removeDoubleSpaces(stringToFilter) {
  let result = stringToFilter.split('');
  result.pop();
  return result.join('');
}

function writeCardHolderName(inputValue, name) {
  name.innerHTML = inputValue;
}

// Expiry Date

function putSlashBetweenDates(filteredString) {
  if (!filteredString) return null;

  let positionInString = 0;
  let stringWithSlash = '';  

  for (let i = positionInString; i < filteredString.length; i++) {
    if (positionInString == 2) {
      stringWithSlash += '/';
      positionInString++;
    }

    stringWithSlash += filteredString[i];
    positionInString++;
  }

  return stringWithSlash;
}