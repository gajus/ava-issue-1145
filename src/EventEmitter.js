// @flow

/* eslint-disable promise/prefer-await-to-callbacks */

type SubscriberType = (data: any) => void;

type SubscriptionsType = {
  [key: string]: Array<SubscriberType>
};

export default class {
  _subscriptions: SubscriptionsType;

  constructor () {
    this._subscriptions = {};
  }

  emit (message: string, data: any): void {
    const subscribers = this._subscriptions[message] = this._subscriptions[message] || [];

    if (subscribers.length === 0) {
      return;
    }

    for (const subscriber of subscribers) {
      subscriber(data);
    }
  }

  off (message: string, callback: SubscriberType): void {
    const subscribers = this._subscriptions[message] = this._subscriptions[message] || [];

    if (callback) {
      const index = subscribers.indexOf(callback);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    } else {
      subscribers.length = 0;
    }
  }

  on (message: string, callback: SubscriberType): void {
    const subscribers = this._subscriptions[message] = this._subscriptions[message] || [];

    subscribers.push(callback);
  }

  once (message: string, callback: SubscriberType): void {
    const subscription = (data: any): void => {
      this.off(message, subscription);

      callback(data);
    };

    this.on(message, subscription);
  }
}
