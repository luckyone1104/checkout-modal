export class Model {
  constructor() {
    this.citiesUrl = 'https://api.visicom.ua/data-api/4.0/en/search/adm_settlement.json?&c=ua&key=eb75e86ee245c07d002a84b413e84dc2';
    this.firebaseConfig = {
      apiKey: "AIzaSyBEyr9GBrH9cKj0qYu-2v55DLzkIyDNZu4",
      authDomain: "checkout-modal-4a540.firebaseapp.com",
      databaseURL: "https://checkout-modal-4a540-default-rtdb.firebaseio.com",
      projectId: "checkout-modal-4a540",
      storageBucket: "checkout-modal-4a540.appspot.com",
      messagingSenderId: "499882402690",
      appId: "1:499882402690:web:1c2e1715d7fbbc66f8e59b"
    };
    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  init() {
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
    this.ready = true;

    // firebase.database().ref('ukrainianCities').set(['1', '2']);
  }

  async getData() {  
    const data = await this.queryData();

    this.modifyData(data);

    return data;
  }

  queryData() {
    return this.database.ref().get().then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  modifyData(data) {
    data.countries = this.createHTMLOptions(data.countries);

    let modifiedCardNumber = data.creditCardDefaults.number.split(' ');
    data.creditCardDefaults.number = modifiedCardNumber;
  }

  createHTMLOptions(optionsArray) {
    let result = '';
    optionsArray.forEach(option => {
      result += `<option value="${option}">${option}</option>\n`;
    });
    return result;
  }

  isValid(inputsForValidation) {
    let isValid = {
      status : true,
      inputs: []
    };

    for (let input of inputsForValidation) {
      if (this.isEmpty(input) || !this.isMinLegth(input)) {
        isValid.status = false;
        isValid.inputs.push(input);
      }
    }
    return isValid;
  }

  isMinLegth(input) {
    return input.getAttribute('minlength') ? input.value.length >= +input.getAttribute('minlength') : true;
  }

  isEmpty(input) {
    return input.value === '';
  }

  filterOnlyNumbers(stringToFilter) {
    return (stringToFilter.match(/\d+/g)) ? stringToFilter.match(/\d+/g).join('') : null;
  }

  putSpacesInCreditCardNumber(filteredString) {
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

  putSlashBetweenDates(filteredString) {
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

  isEmailValid(stringToFilter) {
    //const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  }

  filterLettersAndSpaces(stringToFilter) {
    // Filters Letters And Single Spaces Beween Them
    if (stringToFilter[0] == ' ') return null;
  
    let result;
  
    if (this.hasDoubleSpacesInLastTwoCharacters(stringToFilter)) {
      result = this.removeDoubleSpaces(stringToFilter)
    }
  
    if (result) {
      return result.match(/[ a-zA-Z]+/g) ? result.match(/[ a-zA-Z]+/g).join('') : null;
    }
    return stringToFilter.match(/[ a-zA-Z]+/g) ? stringToFilter.match(/[ a-zA-Z]+/g).join('') : null;
  }

  hasDoubleSpacesInLastTwoCharacters(stringToCheck) {
    if (stringToCheck.length < 2) return false;
    if (stringToCheck[stringToCheck.length - 1] == ' '
    && stringToCheck[stringToCheck.length - 1] == stringToCheck[stringToCheck.length - 2]) return true;
    return false;
  }

  removeDoubleSpaces(stringToFilter) {
    let result = stringToFilter.split('');
    result.pop();
    return result.join('');
  }
}