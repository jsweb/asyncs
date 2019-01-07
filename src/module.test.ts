import { instance } from '@jsweb/truetype';
import { strictEqual as equal } from 'assert';
import { asap, exec, execAll, execRace, task } from './module';

const fnNoArgs = () => null;
const fnWithArgs = (...args: any[]) => args.join(' ');
const tasks = [1, fnWithArgs(2, 3), exec(fnNoArgs)];

describe('@jsweb/asyncs', () => {
  it('exec(fn, ...args) should return a Promise', () => {
    const p1 = exec(fnNoArgs);
    const p2 = exec(fnWithArgs, 1, 2, 3);

    equal(instance(p1), 'Promise');
    equal(instance(p2), 'Promise');
  });

  it('task(any) should return a Promise', () => {
    const prom = task('msg');

    equal(instance(prom), 'Promise');
  });

  it('execAll(any[]) should return a Promise.all', () => {
    const all = execAll(tasks);

    equal(instance(all), 'Promise');
  });

  it('execRace(any[]) should a Promise.race', () => {
    const race = execRace(tasks);

    equal(instance(race), 'Promise');
  });

  it('asap(fn, ...args) should execute "fn(...args)" async ASAP', () => {
    const asap1 = asap(fnNoArgs);
    const asap2 = asap(fnWithArgs, 1, 2, 3);

    equal(instance(asap1), 'Immediate');
    equal(instance(asap2), 'Immediate');
  });
});
