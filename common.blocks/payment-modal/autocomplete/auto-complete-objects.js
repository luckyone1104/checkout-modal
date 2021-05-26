// API KEY: AIzaSyBF7HYJG7izO0HylFM1UqI8OTlSGRp9ZpE - REGISTER AND USE YOURS!
let ukrainianCities;
let countryAutoComplete;

fetch('https://api.visicom.ua/data-api/4.0/en/search/adm_settlement.json?&c=ua&key=eb75e86ee245c07d002a84b413e84dc2')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const citiesData = [];
    data.features.forEach(obj => {
      citiesData.push(obj.properties.name);
    });

    ukrainianCities = [...citiesData];
  });

function initCityAutoComplete() {
  countryAutoComplete = new autoComplete({
    selector: ".ukrainianCityAutoComplete",
    placeHolder: "Kyiv",
    threshold: 3,
    data: {
      src: [],
    },
    resultItem: {
      highlight: {
        render: true,
      },
    },
    onSelection: (feedback) => {
      document.querySelector(countryAutoComplete.selector).value = feedback.selection.value;
    },
  });

  autoCompleteHover();
}