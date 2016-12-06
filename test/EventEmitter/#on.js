import test from 'ava';
import sinon from 'sinon';
import EventEmitter from '../../src/EventEmitter';

let spy;
let eventEmitter;

test.beforeEach(() => {
  eventEmitter = new EventEmitter();
  spy = sinon.spy();

  eventEmitter.on('event', spy);
});

test('assigns a subscription to a particular event', (t) => {
  eventEmitter.emit('event');

  t.true(spy.called === true);
});

test('passes all arguments from the emit() call', (t) => {
  eventEmitter.emit('event', 'some', 'thing');

  t.true(spy.calledWith('some', 'thing') === true);
});

test('calls every time the event is emitted', (t) => {
  eventEmitter.emit('event');
  eventEmitter.emit('event');

  t.true(spy.calledTwice === true);
});

test('emits to multiple listeners', (t) => {
  const spyA = sinon.spy();
  const spyB = sinon.spy();

  eventEmitter.on('event', spyA);
  eventEmitter.on('event', spyB);
  eventEmitter.emit('event');

  t.true(spyA.called === true);
  t.true(spyB.called === true);
});
