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
        init : () => {
          const view = new OrderView();
          const controller = new OrderController(this.mainView, this.model, view, this.utils);

          return () => {
            controller.init();
          };
        },

        render : (initController) => {
          this.utils.removePage()
          this.utils.renderPage('order');
          initController();
        }
      },
      "shipping" : {
        init : () => {
          const view = new ShippingView();
          const controller = new ShippingController(this.mainView, this.model, view, this.utils);

          return () => {
            controller.init();
          };
        },

        render : (initController) => {
          this.utils.removePage()
          this.utils.renderPage('shipping');
          initController();
        }
      },
      "payment" : {
        init : () => {
          const view = new PaymentView();
          const controller = new PaymentController(this.mainView, this.model, view, this.utils);

          return () => {
            controller.init();
          };
        },

        render : (initController) => {
          this.utils.removePage()
          this.utils.renderPage('payment');

          initController();
        }
      },
      "confirmation" : {
        init : () => {
          const view = new ConfirmationView();
          const controller = new ConfirmationController(this.mainView, this.model, view, this.utils);

          return () => {
            controller.init();
          };
        },

        render : (initController) => {
          this.utils.removePage()
          this.utils.renderPage('confirmation');

          initController();
        }
      },
      "success" : {
        init : () => {},
        render : () => {
          this.utils.removePage()
          this.utils.renderPage('success');
        },
      },
      
    }
  }

  init(model, view) {
    this.model = model;
    this.mainView = view;

    this.updateRoute();
  }

  updateRoute() {
    let routeName = document.location.hash.replace('#', '');

    let route = this.routeConfig[routeName];
      if (route) {
        const initController = route.init();
        route.render(initController);
      } else {
        document.location.hash = '#order';
      }
  }
}