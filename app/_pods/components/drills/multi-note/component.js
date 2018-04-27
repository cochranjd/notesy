import Component from '@ember/component';
import { get, set } from '@ember/object';
import DrillSupportMixin from 'notesy/mixins/drill-support';

export default Component.extend(DrillSupportMixin, {
  classNames: ['row', 'w-100', 'multi-note'],

  start: null,
  end: null,

  timeInMs: 5000,

  didInsertElement() {
    const intervals = get(this, 'intervals');

    const crossOctave = get(this, 'config.crossOctave');
    let start = 0;
    let end = 0;

    if (crossOctave) {
      start = intervals[Math.floor(Math.random() * intervals.length)];
      do {
        end = intervals[Math.floor(Math.random() * intervals.length)];
      } while (start === end);
    } else {
      const startIdx = Math.floor(Math.random() * (intervals.length - 1));
      start = intervals[startIdx];
      const remaining = intervals.length - startIdx - 1;
      end = intervals[startIdx + Math.ceil(Math.random() * remaining)];
    }
    set(this, 'start', start);
    set(this, 'end', end);

    const roots = get(this, 'roots');
    const selectedRoot = roots[Math.floor(Math.random() * roots.length)];
    set(this, 'selectedRoot', selectedRoot);

    set(this, 'startKey', this.getKeyForInterval(get(this, 'root'), start));
    set(this, 'endKey', this.getKeyForInterval(get(this, 'root'), end));

    this._super(...arguments);
  }
});
