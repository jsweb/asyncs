import { instance } from '@jsweb/truetype';
import { strictEqual as equal } from 'assert';
import { asap, exec, execAll, execRace, task } from './module';

const tasks = [1, () => 2, exec(() => 3)];

function log(...args: any[]) {
  console.log(...args);
}

describe('@jsweb/asyncs', () => {
  it('exec(fn, ...args) should return a Promise', () => {
    const fn = (...args: any[]) => args.join(' ');
    const prom = exec(fn, '     ', 'test', 'exec', 'method', 'OK', '\n').then(log);
    equal(instance(prom), 'Promise');
  });

  it('task(any) should return a Promise', () => {
    const msg = ['     ', 'test task method OK', '\n'].join(' ');
    const prom = task(msg).then(log);
    equal(instance(prom), 'Promise');
  });

  it('execAll(any[]) should return a Promise.all', () => {
    const all = execAll(tasks)
      .then((result) => ['     ', 'test execAll method OK:', result, '\n'].join(' '))
      .then(log);
    equal(instance(all), 'Promise');
  });

  it('execRace(any[]) should a Promise.race', () => {
    const race = execRace(tasks)
      .then((result) => ['     ', 'test execRace method OK:', result, '\n'].join(' '))
      .then(log);
    equal(instance(race), 'Promise');
  });

  it('asap(fn, ...args) should execute "fn(...args)" async ASAP', () => {
    const soon = asap(log, '     ', 'test', 'asap', 'method', 'OK');
    equal(instance(soon), 'Immediate');
  });
});
