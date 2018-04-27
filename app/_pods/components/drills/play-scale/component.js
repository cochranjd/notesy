import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import DrillSupportMixin from 'notesy/mixins/drill-support';

export default Component.extend(DrillSupportMixin, {
  classNames: ['row', 'w-100', 'play-scale'],

  _scales: [
    { name: 'Major', form: [2, 2, 1, 2, 2, 2, 1] },
    { name: 'Minor', form: [2, 1, 2, 2, 1, 2, 2] }],

  capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  scales: computed({
    get() {
      const _scales = get(this, '_scales');
      const config = get(this, 'config');

      return _scales.map((scale) => {
        if (get(config, `include${this.capFirstLetter(scale.name)}`)) {
          return scale;
        }
        return null;
      }).filter(s => s !== null);
    }
  }).readOnly(),

  notes: null,

  timeInMs: 5000,

  didInsertElement() {
    try {
      const scales = get(this, 'scales');
      const scale = scales[Math.floor(Math.random() * scales.length)];

      const roots = get(this, 'allRoots');
      const selectedRoot = roots[Math.floor(Math.random() * roots.length)];
      set(this, 'selectedRoot', selectedRoot);

      const root = get(this, 'root');
      const rootIdx = roots.indexOf(root);

      let currentPosition = rootIdx;
      const notes = scale.form.map((interval) => {
        currentPosition = (currentPosition + interval) % roots.length;
        return roots[currentPosition];
      });
      notes.unshift(root);

      set(this, 'notes', notes);
      set(this, 'scaleName', scale.name);

      this._super(...arguments);
    } catch (e) {
      console.log(e);
    }
  }
});
