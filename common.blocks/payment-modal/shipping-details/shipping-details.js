function fillCountriesSelectBoxHtml() {
  const countries = ['Ukraine','Poland', 'Czech Republic', 'Romania'];
   
  const optionsFragment = document.createDocumentFragment();

  countries.forEach(function(countries, index) {
      const options = document.createElement('option');
      options.innerHTML = countries;
      options.value = countries;
      optionsFragment.appendChild(options);
  });

  selectBox.appendChild(optionsFragment);
}

function changeInputBottomLineStyleAfterSelect(selectBox) {
  let inputBottomLine = selectBox.parentNode.nextElementSibling;
  inputBottomLine.removeAttribute('style');
}

function whenSelectedCountryIsUkraine() {
  citiesInputWrapper.firstElementChild.remove();
  const inputFragment = `<input class="ukrainianCityAutoComplete autoComplete checkout-input cityInput validationSensitive" 
  type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off" autocapitalize="off" id="autoComplete">`;
  citiesInputWrapper.insertAdjacentHTML('afterBegin', inputFragment);
  initCityAutoComplete();
  countryAutoComplete.data.src = ukrainianCities;
  changeInputBottomLineStyle(citiesInputWrapper.firstChild);
}

function whenSelectedCountryIsOtherThanUkraine() {
  citiesInputWrapper.firstElementChild.remove();
  const inputFragment = `<input class="checkout-input cityInput defaultCityInput validationSensitive"  
  type="text" maxlength="19" placeholder="Harare">`;
  citiesInputWrapper.insertAdjacentHTML('afterBegin', inputFragment);
  changeInputBottomLineStyle(citiesInputWrapper.firstChild);
}