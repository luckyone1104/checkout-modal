export class Utils {
  createHTMLOptions(optionsArray) {
    let result = '';
    optionsArray.forEach(option => {
      result += `<option value="${option}">${option}</option>\n`;
    });
    return result;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
}

