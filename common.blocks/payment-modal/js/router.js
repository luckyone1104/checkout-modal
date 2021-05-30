import {Utils} from './utils.js'

import {OrderView} from './order/orderView.js'
import {OrderController} from './order/orderController.js'

import {ShippingView} from './shipping/shippingView.js'
import {ShippingController} from './shipping/shippingController.js'

import {PaymentView} from './payment/paymentView.js'
import {PaymentController} from './payment/paymentController.js'

import {ConfirmationView} from './confirmation/confirmationView.js'
import {ConfirmationController} from './confirmation/confirmationController.js'


export class Router {
  constructor() {
    this.utils = new Utils();
  
    this.routeConfig = {
      "order" : {
        build : () => {
          const view = new OrderView();
          const controller = new OrderController(view);

          this.utils.removePage();
          this.utils.renderPage('order');

          controller.init();
        }
      },
      "shipping" : {
        build : () => {
          const view = new ShippingView();
          const controller = new ShippingController(this.model, view);

          this.utils.removePage();
          this.utils.renderPage('shipping');

          controller.init();
        }
      },
      "payment" : {
        build : () => {
          const view = new PaymentView();
          const controller = new PaymentController(this.model, view);

          this.utils.removePage();
          this.utils.renderPage('payment');

          controller.init();
        }
      },
      "confirmation" : {
        build : () => {
          const view = new ConfirmationView();
          const controller = new ConfirmationController(this.model, view);

          this.utils.removePage();
          this.utils.renderPage('confirmation');

          controller.init();
        }
      },
      "success" : {
        build : () => {
          this.utils.removePage()
          this.utils.renderPage('success');
        }
      },
      
    }
  }

  init(model) {
    this.model = model;

    this.updateRoute();
  }

  updateRoute() {
    let routeName = document.location.hash.replace('#', '');

    let route = this.routeConfig[routeName];
      if (route) {
        route.build();
      } else {
        document.location.hash = '#order';
      }
  }
}