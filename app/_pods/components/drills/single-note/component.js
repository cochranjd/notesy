import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { later } from '@ember/runloop';
import DrillSupportMixin from 'notesy/mixins/drill-support';

export default Component.extend(DrillSupportMixin, {
  classNames: ['row', 'w-100', 'single-note'],

  selectedInterval: null,

  config: null,

  didInsertElement() {
    const intervals = get(this, 'intervals');
    
    const selectedInterval = intervals[Math.floor(Math.random() * intervals.length)];
    set(this, 'selectedInterval', selectedInterval);

    const roots = get(this, 'roots');
    const selectedRoot = roots[Math.floor(Math.random() * roots.length)];
    set(this, 'selectedRoot', selectedRoot);

    set(this, 'selectedIntervalKey', this.getKeyForInterval(get(this, 'root'), selectedInterval));
    this._super(...arguments);
  }
});
