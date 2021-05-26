export class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribeEvent(subscriber) {
    this.subscribers.push(subscriber);
  }

  callEvent(data) {
    this.subscribers.forEach(subscriber => subscriber(data))
  }
};