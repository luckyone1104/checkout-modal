export class Model {
  constructor(citiesUrl, utils) {
    this.citiesUrl = citiesUrl;
    this.utils = utils;
    this.data = {};
  }

  async getData() {
    await this.getUkrainiansCities()
      .then(citiesData => {
        this.data.ukrainianCities = citiesData;
      });

    this.data.countries = this.getCountries();

    this.data.cardName = this.getCardDefaultName();
    this.data.cardNumber = this.getCardDefaultNumber();
    this.data.cardExpityDate = this.getCardDefaultExpiryDate();    

    this.modifyData();

    return this.data;
  }

  modifyData() {
    this.data.countries = this.utils.createHTMLOptions(this.data.countries);

    let modifiedCardNumber = this.data.cardNumber.split(' ');
    this.data.cardNumber = modifiedCardNumber;
  }

  getCountries() {
    return ['Ukraine','Poland', 'Czech Republic', 'Romania'];
  }

  getCardDefaultName() {
    return 'ARJUN KUNWAR';
  }

  getCardDefaultNumber() {
    return '0000 0000 0000 0000';
  }

  getCardDefaultExpiryDate() {
    return '09/23';
  }

  getUkrainiansCities() {
    return fetch(this.citiesUrl)
      .then(responce => (responce.ok) ? responce.json() : Promise.reject(responce))
      .then(data => {
        this.citiesData = [];
        data.features.forEach(obj => {
          this.citiesData.push(obj.properties.name);
        });
        return this.citiesData;
      })
      .catch(err => {
        console.error('Couldn\'t get Ukrainian cities from the server!');
        return null;
      })  
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