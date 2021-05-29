export class HTML {
  constructor() {
    this.pages = {
      order: 
         `<div class="payment-modal__order-page order-page">
            <div class="order-page__product-titles-wrapper">
              <div class="order-page__product-title">Item</div>
              <div class="order-page__quantity-title ">Quantity</div> 
              <div class="order-page__price-title">Price</div>
            </div>

            <div class="order-page__product-wrapper">
              <div class="order-page__product-photo-wrapper">
                <img class="order-page__product-photo" src="images/products/monitors.jpg" alt="">
              </div>
              <div class="order-page__product-description">
                <div class="order-page__product-name">
                  PreSonus Eris 3.5
                </div>
                <div class="order-page__product-info">
                  Studio monitors
                </div>
                <div class="order-page__remove-button">
                  Remove
                </div>
              </div>
              <div class="order-page__quantity">1</div>
              <div class="order-page__price">$590</div>
            </div>

            <div class="order-page__product-wrapper">
              <div class="order-page__product-photo-wrapper">
                <img class="order-page__product-photo" src="images/products/audio-interface.jpg" alt="">
              </div>
              <div class="order-page__product-description">
                <div class="order-page__product-name">
                  PreSonus c24
                </div>
                <div class="order-page__product-info">
                  2-channel audio-interface
                </div>
                <div class="order-page__remove-button">
                  Remove
                </div>
              </div>
              <div class="order-page__quantity">1</div>
              <div class="order-page__price">$260</div>
            </div>

            <div class="order-page__product-wrapper">
              <div class="order-page__product-photo-wrapper">
                <img class="order-page__product-photo" src="images/products/studio-mic.jpg" alt="">
              </div>
              <div class="order-page__product-description">
                <div class="order-page__product-name">
                  PreSonus PD-70
                </div>
                <div class="order-page__product-info">
                  Condenser microphone
                </div>
                <div class="order-page__remove-button">
                  Remove
                </div>
              </div>
              <div class="order-page__quantity">1</div>
              <div class="order-page__price">$320</div>
            </div>

            <div class="order-page__total-sum-row">
              <div class="order-page__total-sum-wrapper">
                <span class="order-page__total-title">Total</span>
                <span class="order-page__total-sum"></span>
              </div>
            </div>

            <div class="order-page__button-container">
                <a href="#shipping" class="order-page__next-page-button next-page-button">
                  <span class="next-page-button__title">NEXT STEP</span>
                </a>
            </div>
          </div>`,
      shipping:
         `<div class="payment-modal__shipping-details shipping-details"">
            <div class="shipping-details__left-column">
              <img class="shipping-details__left-image" src="common.blocks/payment-modal/shipping-details/truck.svg" alt="">
            </div>

            <div class="shipping-details__right-column">
              <div class="shipping-details__input-info">
                <div class="shipping-details__title-wrapper">
                  <div class="shipping-details__title">
                    Shipping Details
                  </div>
                </div>
      
                <div class="shipping-details__inputs-wrapper">
                  <div class="shipping-details__input-form">
                    <label class="shipping-details__label" >Country *</label>
                    <div class="shipping-details__select-wrapper">
                      <div class="shipping-details__select-placeholder">Zimbabwe</div>
                      <select class="shipping-details__select-country validationSensitive sessionInput" name="countries" id="countries" placeholder="Zimbabwe">
                        <option></option>
                      </select>
                    </div>
                    <div class="shipping-details__bottom-line"></div>
                  </div>

                  <div class="autoComplete_wrapper">
                    <label class="shipping-details__label shipping-details__input-form">City *</label>
                    <div class="shipping-details__city-input-wrapper">
                      <input class="checkout-input cityInput defaultCityInput validationSensitive sessionInput"  type="text" maxlength="19" placeholder="Harare" filter="onlyLetters">
                      <div class="shipping-details__bottom-line"></div>
                    </div>
                  </div>
      
                  <div class="shipping-details__input-form">
                    <label class="shipping-details__label" >Street *</label>
                    <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="19" placeholder="Independence Str">
                    <div class="shipping-details__bottom-line"></div>
                  </div>
      
                  <div class="shipping-details__input-row">
                    <div class="shipping-details__input-form shipping-details__house-number-wrapper">
                      <label class="shipping-details__label" >House *</label>
                      <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="8" placeholder="23">
                      <div class="shipping-details__bottom-line"></div>
                    </div>
      
                    <div class="shipping-details__input-form shipping-details__apartment-number--wrapper">
                      <label class="shipping-details__label">Apartment</label>
                      <input class="checkout-input sessionInput" type="text"  maxlength="8" placeholder="201">
                      <div class="shipping-details__bottom-line"></div>
                    </div>
                  </div>
                </div>

                <div class="shipping-details__buttons-wrapper">
                  
                  <a href="#payment"class="shipping-details__next-page-button next-page-button">
                    <span class="next-page-button__title">NEXT STEP</span>
                  </a>

                  <a href="#order" class="shipping-details__previous-page-button previous-page-button">
                    <span class="previous-page-button__title">← Previous Step</span>
                  </a>
                </div>
              </div>
            </div>
            
          </div>`,
      payment:
         `<div class="payment-modal__payment-details payment-details"">
            <div class="payment-details__left-column">
              <div class="payment-details__credit-card credit-card">
                <div class="credit-card__first-row">
                  <div class="credit-card__payment-system-logo">
                    <img class="master-card-logo" style="display:none;"  src="common.blocks/payment-modal/payment-details/master-card-logo.svg" alt="">
                    <img class="visa-logo" src="common.blocks/payment-modal/payment-details/visa-logo.svg" alt="">
                  </div>
                </div>
    
                <div class="credit-card__second-row">
                  <div class="credit-card__bank-chip-image">
                    <img class="card-chip" src="common.blocks/payment-modal/payment-details/credit-card-chip.svg" alt="">
                  </div>
                </div>
    
                <div class="credit_card__third-row">
                  <div class="credit-card__card-number card-number">      
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
    
                <div class="credit-card__fourth-row">
                  <div class="credit-card__card-holder-name card-holder-name"></div>
                  <div class="credit-card__card-expiry-date expiry-date"></div>
                </div>
              </div>
            </div>
    
            <div class="payment-details__right-column">
              <div class="payment-details__input-info">
                <div class="payment-details__title-wrapper">
                  <div class="payment-details__title">Payment Details</div>
                </div>
        
                <div class="payment-details__inputs-wrapper">
                  <div class="payment-details__input-form">
                    <label class="payment-details__label" for="name-on-card">Name on card *</label>
                    <input class="payment-details__name-on-card checkout-input validationSensitive sessionInput" id="name-on-card" type="text" maxlength="19" placeholder="Arjun Kunwar" filter="onlyLetters">
                    <div class="payment-details__bottom-line"></div>
                  </div>
                  <div class="payment-details__input-form">
                    <label class="payment-details__label" for="card-number">Card Number *</label>
                    <input class="payment-details__card-number checkout-input validationSensitive sessionInput" id="card-number" type="text" minlength="19" maxlength="19" placeholder="5465 3232 4152 5931" filter="onlyNumbers">
                    <div class="payment-details__bottom-line"></div>
                  </div>
                  <div class="payment-details__input-row">
                    <div class="payment-details__input-form payment-details__valid-through-wrapper">
                      <label class="payment-details__label" for="valid-through">Valid Through *</label>
                      <input class="payment-details__valid-through checkout-input validationSensitive sessionInput" id="valid-through" type="text" minlength="5" maxlength="5" placeholder="02/24" filter="onlyNumbers">
                      <div class="payment-details__bottom-line"></div>
                    </div>
                    <div class="payment-details__input-form payment-details__cvv-wrapper">
                      <label class="payment-details__label" for="card-cvv">CVV *</label>
                      <input class="payment-details__cvv checkout-input validationSensitive sessionInput" type="text" id="card-cvv" minlength="3" maxlength="3" placeholder="512" filter="onlyNumbers">
                      <div class="payment-details__bottom-line"></div>
                    </div>
                  </div> 
                </div>
                
                <div class="payment-details__buttons-wrapper">

                  <a href="#confirmation"class="payment-details__next-page-button next-page-button">
                    <span class="next-page-button__title">NEXT STEP</span>
                  </a>

                  <a href="#shipping"class="payment-details__previous-page-button previous-page-button">
                    <span class="previous-page-button__title">← Previous Step</span>
                  </a>
                </div>
              </div>
            </div>
            
    
    
          </div>`,
      confirmation:
         `<div class="payment-modal__confirmation-page confirmation-page">
            <div class="confirmation-page__left-column">
              <img class="confirmation-page__left-image" src="common.blocks/payment-modal/confirmation-page/confirmation.svg" alt="">
            </div>
    
            <div class="confirmation-page__right-column">
              <div class="confirmation-page__input-info">
    
                <div class="confirmation-page__title-wrapper">
                  <div class="confirmation-page__title">
                    Confirmation
                  </div>
                </div>
            
                <div class="confirmation-page__inputs-wrapper">
                  <div class="confirmation-page__input-row">
                    <div class="confirmation-page__input-form confirmation-page__customer-name-wrapper">
                      <label class="confirmation-page__label">Name *</label>
                      <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="8" placeholder="Manuel" filter="onlyLetters">
                      <div class="confirmation-page__bottom-line"></div>
                    </div>
            
                    <div class="confirmation-page__input-form confirmation-page__customer-surname-wrapper">
                      <label class="confirmation-page__label">Surname *</label>
                      <input class="checkout-input validationSensitive sessionInput" type="text"  maxlength="10" placeholder="Cornelien" filter="onlyLetters">
                      <div class="confirmation-page__bottom-line"></div>
                    </div>
                  </div>
                  <div class="confirmation-page__input-form">
                    <label class="confirmation-page__label" >E-Mail *</label>
                    <input class="checkout-input validationSensitive sessionInput"  type="text" maxlength="24" placeholder="manuel-corniel@mail.com">
                    <div class="confirmation-page__bottom-line"></div>
                  </div>
            
                  <div class="confirmation-page__input-form">
                    <label class="confirmation-page__label">Phone Number *</label>
                    <input class="checkout-input validationSensitive sessionInput" type="text" maxlength="15" placeholder="312-412-34-76" filter="onlyNumbers">
                    <div class="confirmation-page__bottom-line"></div>
                  </div>
                </div>
      
                <div class="confirmation-page__buttons-wrapper">
                  <a href="#success" class="confirmation-page__pay-button pay-button next-page-button">
                    <span>PAY</span>
                    <span class="pay-button__total-sum">$450.00</span>
                  </a>

                  <a href="#payment" class="shipping-details__previous-page-button previous-page-button">
                    <span class="previous-page-button__title">← Previous Step</span>
                  </a>
                </div>
    
              </div>
            </div>        
          </div>`,
      success:
         `<div class="payment-modal__success-page success-page"">
            <div class="success-page__svg-icon">
              <?xml version="1.0" encoding="iso-8859-1"?>
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 507.2 507.2" style="enable-background:new 0 0 507.2 507.2;" xml:space="preserve">
              <circle style="fill:#73afc4;" cx="253.6" cy="253.6" r="253.6"/>
              <path style="fill:#618aa0;" d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"/>
                <g>
                  <path style="fill:#FFFFFF;" d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8
                    c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"/>
                  <path style="fill:#FFFFFF;" d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2
                    c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"/>
                </g>
              </svg>
            </div>
          </div>`,
    };
  }
}