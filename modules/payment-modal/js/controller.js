export class Controller {

  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  async init() {
    this.initModel();
    await this.model.getData();

    this.router.init(this.model);
    
    this.initView();
    this.bindEvents();
    this.bindSubscribers();
  }

  async initModel() {
    this.model.isReady() || this.model.init();
  }

  initView() {
    this.view.isReady() || this.view.init();
  }

  bindEvents() {
    window.addEventListener('hashchange', () => {
      if (this.view.checkIfPageIsUnlocked()) {
        window.app.observer.callEvent('switchPage', this.view.getCurrentPage());
      }
    });

    this.view.DOMElements.menu.addEventListener('click', event => {
      if (this.view.isDisabled(event.target)) {
        event.preventDefault();
      }
      this.model.saveInputsData(this.view.getCurrentPage(), this.view.getInputsValues());
    })
  }

  bindSubscribers() {
    window.app.observer.subscribeEvent('updateData', () => {
      this.router.updateRoute();
    })

    window.app.observer.subscribeEvent('switchPage', nextPageIndex => {
      this.router.updateRoute();
      this.view.removeMenuElementSelectedStyle();
      this.view.addMenuElementSelectedStyle(nextPageIndex);
      this.view.moveMenuSelectedLine(nextPageIndex);
      this.view.unlockDisabledButton();
      this.view.removeMenu(); //after confirmation
    });

    window.app.observer.subscribeEvent('clickOnNextButton', pageToUnclock => {
      this.view.unlockedPages.add(pageToUnclock);
    });

    window.app.observer.subscribeEvent('failValidation', input => {
      this.view.colorInvalidBottomLine(input);
    });

    window.app.observer.subscribeEvent('focusOnInput', input => {
      this.view.changeInputBottomLineStyleOnFocus(input);
    });

    window.app.observer.subscribeEvent('blurOfInput', input => {
      this.view.changeInputBottomLineStyleOnBlur(input);
    });
  }
}