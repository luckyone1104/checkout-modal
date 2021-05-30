export class Model {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyBEyr9GBrH9cKj0qYu-2v55DLzkIyDNZu4",
      authDomain: "checkout-modal-4a540.firebaseapp.com",
      databaseURL: "https://checkout-modal-4a540-default-rtdb.firebaseio.com",
      projectId: "checkout-modal-4a540",
      storageBucket: "checkout-modal-4a540.appspot.com",
      messagingSenderId: "499882402690",
      appId: "1:499882402690:web:1c2e1715d7fbbc66f8e59b"
    };
    this.data = {};
    this.updateInterval = 7000;

    this.ready = false;
  }

  isReady() {
    return this.ready;
  }

  async init() {
    this.initFirebase();
    this.listenToDataUpdates();

    this.ready = true;
  }

  initFirebase() {
    firebase.initializeApp(this.firebaseConfig);
    this.database = firebase.database();
  }

  async getData() {
    this.doesSessionDataExist() ? this.setDataFromSessioinStorage() : await this.setDataFromServer();
  }

  doesSessionDataExist() {
    return sessionStorage.getItem('data') !== 'undefined' ? true : false;
  }

  setDataFromSessioinStorage() {
    console.log('Setting data from session storage...');
    this.data = JSON.parse(sessionStorage.getItem('data'));
  }

  async setDataFromServer() {
    console.log('Downloading data from server...');
    this.data = await this.getServerData();
  }

  async getServerData() {
    const serverData = await this.queryData();

    this.modifyData(serverData);
    this.saveDataToSessionStorage(serverData)

    return serverData;
  }

  saveDataToSessionStorage(data) {
    sessionStorage.setItem('data', JSON.stringify(data));
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

  modifyData(serverData) {
    serverData.countries = this.createHTMLOptions(serverData.countries);

    let modifiedCardNumber = serverData.creditCardDefaults.number.split(' ');
    serverData.creditCardDefaults.number = modifiedCardNumber;
  }

  saveInputsData(currentPage, values) {
    if (values && values.length > 0) {
      sessionStorage.setItem(currentPage, JSON.stringify(values));
    }
  }

  createHTMLOptions(optionsArray) {
    let result = '';
    optionsArray.forEach(option => {
      result += `<option value="${option}">${option}</option>\n`;
    });
    return result;
  }

  listenToDataUpdates() {
     setInterval(async () => {
      let serverData = await this.getServerData();
      this.compareData(serverData);
    }, this.updateInterval);
  }

  compareData(serverData) {
    if (JSON.stringify(serverData) !== JSON.stringify(this.data)) {
      console.log('Updating local data...');

      sessionStorage.setItem('data', JSON.stringify(serverData));
      this.data = JSON.parse(sessionStorage.getItem('data'));

      window.app.observer.callEvent('updateData');
    }
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