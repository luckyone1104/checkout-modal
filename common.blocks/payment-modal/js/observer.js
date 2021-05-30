export class Observer {
  constructor() {
    this.subscribers = {};
  }

  subscribeEvent(name, subscriber) {
    this.subscribers[name] = this.subscribers[name] || [];

    if (typeof subscriber === 'function') {
      this.subscribers[name].push(subscriber);
    }
  }

  callEvent(name, data) {
    if (!this.subscribers[name]) return null;
    this.subscribers[name].forEach(subscriber => subscriber(data));
  }
};