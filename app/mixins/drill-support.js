import Mixin from '@ember/object/mixin';
import { get, computed } from '@ember/object';

const ROOTS = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];
const MAJOR_ROOTS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const INTERVALS = ['b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', '8'];
const MAJOR_INTERVALS = ['2', '3', '4', '5', '6', '7', '8'];

export default Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    const duration = get(this, 'config.duration');
    this.onStart(duration * 10);
  },

  root: computed('selectedRoot', 'globalRoot', {
    get() {
      const globalRoot = get(this, 'globalRoot');
      if (globalRoot) {
        return globalRoot;
      }

      return get(this, 'selectedRoot');
    }
  }).readOnly(),

  majorRoots: MAJOR_ROOTS,
  allRoots: ROOTS,

  roots: computed('config.nonMajorRoots', {
    get() {
      const nonMajorRoots = get(this, 'config.nonMajorRoots');
      return nonMajorRoots ?
        ROOTS :
        MAJOR_ROOTS;
    }
  }).readOnly(),

  majorInvervals: MAJOR_INTERVALS,
  allIntervals: INTERVALS,

  intervals: computed('config.nonMajors', {
    get() {
      const nonMajors = get(this, 'config.nonMajors');
      return nonMajors ? 
        INTERVALS :
        MAJOR_INTERVALS;
    }
  }).readOnly(),

  getKeyForInterval(root, interval) {
    const rootIdx = ROOTS.indexOf(root);
    const intervalIdx = INTERVALS.indexOf(interval);

    const keyIdx = rootIdx + intervalIdx + 1;     
    const answer = ROOTS[keyIdx % ROOTS.length];
    return answer;
  }
});
