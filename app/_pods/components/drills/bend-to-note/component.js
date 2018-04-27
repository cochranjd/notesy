import Component from '@ember/component';
import { get, set } from '@ember/object';
import DrillSupportMixin from 'notesy/mixins/drill-support';

export default Component.extend(DrillSupportMixin, {
  classNames: ['row', 'w-100', 'bend-to-note'],

  stepSizes: null,

  stepSize: null,

  config: null,

  timeInMs: 4000,

  init() {
    this._super(...arguments);
    set(this, 'stepSizes', ['1/2 Step', 'Whole Step']);
  },

  didInsertElement() {
    const stepIdx = Math.floor(Math.random() * 2);
    const selectedStepSize = get(this, 'stepSizes')[stepIdx];
    set(this, 'selectedStep', selectedStepSize);

    const roots = get(this, 'roots');
    const selectedRoot = roots[Math.floor(Math.random() * roots.length)];
    set(this, 'selectedRoot', selectedRoot);

    set(this, 'selectedStepKey', this.getKeyForInterval(get(this, 'root'), stepIdx === 0 ? 'b2' : '2'));
    this._super(...arguments);
  }
});
