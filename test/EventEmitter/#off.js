import test from 'ava';
import sinon from 'sinon';
import EventEmitter from '../../src/EventEmitter';

let spyA;
let spyB;
let eventEmitter;

test.beforeEach(() => {
  eventEmitter = new EventEmitter();

  spyA = sinon.spy();
  spyB = sinon.spy();

  eventEmitter.on('event', spyA);
  eventEmitter.on('event', spyB);
});

test('removes the specificed listener', (t) => {
  eventEmitter.off('event', spyA);
  eventEmitter.emit('event');

  t.true(spyA.called === false);
  t.true(spyB.called === true);
});

test('removes all listeners when no listener is specified', (t) => {
  eventEmitter.off('event');
  eventEmitter.emit('event');

  t.true(spyA.called === false);
  t.true(spyB.called === false);
});
