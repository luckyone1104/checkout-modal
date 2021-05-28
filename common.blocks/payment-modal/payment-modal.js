// ==================CONTENT================== //
// () Payment Modal Module Initialization      //
//                                             //
// I. CREATING GLOBAL DOM VARIABLES            //
//                                             //
// II. CONTROLLER                              //
//  2.1 Global DOM Variables Initialization    //
//  2.2 Invoking Page Functions                //
//  2.3 Event Listeners Initialization         //
//                                             //
// III. COMMON FUNCTIONS                       //
//  3.1 Global DOM Variables                   //
//  3.2 Event Listeners                        //
//  3.3 Pages Switching                        //
//  3.4 Input Validation                       //
//  3.5 Inputs' Styling                        //
// =========================================== //

// *** Payment Modal Module Initialization ***
window.onload = function() {
  // paymentModalController();
};

// I. CREATING GLOBAL DOM VARIABLES 
// ==================================================================================================================================================================================

let checkoutPages;
let orderPage, 
    shippingDetails, 
    paymentDetails, 
    confirmationPage,
    successPage;
let currentlyVisiblePage;
let checkoutMenu,
    menuButtons,
    menuSelectLine;
let nextPageButtons,
    previousPageButtons;
let orderRemoveButtons;
let checkoutInputs;
let selectBox;
let citiesInputWrapper;

// II. CONTROLLER
// ==================================================================================================================================================================================

function paymentModalController() {
  // *** 2.1 Global DOM Variables Initialization ***

  initGlobalVariables();

  // *** 2.2 Invoking Page Functions ***
  findVisiblePage();
  changeTotalSum();
  fillCountriesSelectBoxHtml();
  creditCardInteractionsController();
  
  // *** 2.3 Event Listeners Initialization ***
  initEventListeners();
}

// III. PAYMENT MODAL FUNCTIONS
// ==================================================================================================================================================================================

// *** 3.1 Global DOM Variables Initialization ***

function initGlobalVariables() {
  checkoutPages = findCheckoutPages();
  [
    orderPage, 
    shippingDetails, 
    paymentDetails, 
    confirmationPage,
    successPage
  ] = checkoutPages;

  menuButtons = findMenuButtons();
  [
    orderPageLink, 
    shippingDetailsLink, 
    paymentDetailsLink, 
    confirmationPageLink
  ] = menuButtons;

  checkoutMenu = document.querySelector('.payment-modal__menu');
  menuSelectLine = document.querySelector('.payment-modal__menu-selected-line-wrapper');
  nextPageButtons = document.querySelectorAll('.next-page-button');
  previousPageButtons = document.querySelectorAll('.previous-page-button');
  orderRemoveButtons = document.querySelectorAll('.order-page__remove-button');
  checkoutInputs = findCheckoutInputs();
  selectBox = document.querySelector('.shipping-details__select-country');
  citiesInputWrapper = document.querySelector('.shipping-details__city-input-wrapper');

  // Local Functions / Helpers

  function findCheckoutPages() {
    return [
      document.querySelector('.order-page'),
      document.querySelector('.shipping-details'),
      document.querySelector('.payment-details'),
      document.querySelector('.confirmation-page'),
      document.querySelector('.success-page')
    ];
  }

  function findMenuButtons() {
    return [
      document.querySelector('.menu-element__order-page'),
      document.querySelector('.menu-element__shipping-details'),
      document.querySelector('.menu-element__payment-details'),
      document.querySelector('.menu-element__confirmation-page')
    ];
  }

  function findCheckoutInputs() {
    return document.querySelectorAll('.checkout-input')
  }
}

// *** 3.2 EVENT LISTENERS ***

function initEventListeners() {
  window.addEventListener('resize', resizeCreditCard);

  checkoutMenu.addEventListener('click', event => {
    menuButtonClick(event.target);
  });

  nextPageButtons.forEach(nextPageButton => {
    nextPageButton.addEventListener('click', () => {
      if (isValidatableForPageSwitching(nextPageButton)) {
        switchToNextPage(nextPageButton);
      }
    });
  })

  previousPageButtons.forEach(previousPageButton => {
    previousPageButton.addEventListener('click', switchToPreviousPage);
  })

  orderRemoveButtons.forEach(orderRemoveButton => {
    orderRemoveButton.addEventListener('click', () => {
      removeOrderItem(orderRemoveButton.parentNode.parentNode);
    });
  });

  checkoutInputs.forEach(inputField => {
    changeInputBottomLineStyle(inputField);
  })

  selectBox.addEventListener('change', () => {
    changeInputBottomLineStyleAfterSelect(selectBox);

    selectBox.previousElementSibling.style.display = "none";
    if (selectBox.value === 'Ukraine' && document.querySelector('.defaultCityInput')) {
      whenSelectedCountryIsUkraine(selectBox);
    }
    if (selectBox.value !== 'Ukraine' && document.querySelector('.ukrainianCityAutoComplete')) {
      whenSelectedCountryIsOtherThanUkraine();
    }
  })
}

// *** 3.3 PAGES SWITCHING ***

function findVisiblePage() {
  for (let page of checkoutPages) {
    if (page.offsetParent) {
      currentlyVisiblePage = page;
      return page;
    }
  }
}

function switchToNextPage() {
  let nextPage = checkoutPages[checkoutPages.indexOf(currentlyVisiblePage) + 1]
  switchPages(nextPage);
}

function switchToPreviousPage() {
  let previousPage = checkoutPages[checkoutPages.indexOf(currentlyVisiblePage) - 1]
  switchPages(previousPage);
}

function switchPages(pageToShow, pageToHide = currentlyVisiblePage) {
  pageToHide.style.display = "none";
  pageToShow.removeAttribute('style');

  if (checkoutPages.indexOf(pageToShow) === checkoutPages.length - 1) {
    checkoutMenu.style.display = 'none';
    return null;
  }

  removeMenuElementSelectedStyle(menuButtons[checkoutPages.indexOf(pageToHide)]);
  addMenuElementSelectedStyle(menuButtons[checkoutPages.indexOf(pageToShow)]);

  findVisiblePage(checkoutPages);

  if (currentlyVisiblePage === paymentDetails) {
    resizeCreditCard();
  }
}

// *** 3.4 INPUT VALIDATION ***
function isValidatableForPageSwitching(nextPageButton) {
  let validationResult = true;

  if (currentlyVisiblePage === shippingDetails) {
    validationResult = validationTest(shippingDetails);
  }
  if (currentlyVisiblePage ===  paymentDetails) {
    validationResult = validationTest(paymentDetails);
  }
  if (currentlyVisiblePage === confirmationPage) {
    validationResult = validationTest(confirmationPage);
  }

  return validationResult;

  // Local Functions / Helper

  function validationTest(pageForValidationCheck) {
    let isValid = true;

    let validateableInputs = findValidateableInputs(pageForValidationCheck);
    
    for (input of validateableInputs) {
      let inputMinLength = +input.getAttribute('minlength') || null;
      if ((input.value === '') || (inputMinLength && (input.value.length !== inputMinLength))) {
        isValid = false;
        // In case bottom line is not placed right after an input, but is located in a wrapper
        // Try to use CLOSEST
        input.nextElementSibling ? input.nextElementSibling.style.borderBottomColor = '#ff6666' : input.parentNode.nextElementSibling.style.borderBottomColor = '#ff6666';
      }
    }

    if (!isValid) {
      nextPageButton.classList.add('next-page-button_disabled');
    }
    if (isValid) {
      if (nextPageButton.classList.contains('next-page-button_disabled')) {
        nextPageButton.classList.remove('next-page-button_disabled');
      }
      
      let nextMenuButton = menuButtons[checkoutPages.indexOf(pageForValidationCheck) + 1] || null;

      if (nextMenuButton && nextMenuButton.classList.contains('menu-element_disabled')) {
        nextMenuButton.classList.remove('menu-element_disabled');
      }
    }

    return isValid;
  }

  function findValidateableInputs(pageForValidationCheck) {
    return pageForValidationCheck.querySelectorAll('.validationSensitive');
  }
}


// *** 3.5 INPUTS' STYLING ***

function changeInputBottomLineStyle(inputField) {
  inputField.addEventListener('focus', () => {
    changeInputBottomLineStyleOnFocus(inputField);
  });
  inputField.addEventListener('blur', () => {
    changeInputBottomLineStyleOnBlur(inputField);
  }); 

  function changeInputBottomLineStyleOnFocus(inputField) {
    let inputBottomLine = inputField.nextElementSibling;
    inputBottomLine.style.borderBottomColor = "#71b1ce";
  }
  
  function changeInputBottomLineStyleOnBlur(inputField) {
    let inputBottomLine = inputField.nextElementSibling;
    inputBottomLine.removeAttribute('style');
  }
}

