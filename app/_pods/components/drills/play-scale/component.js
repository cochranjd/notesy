import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import DrillSupportMixin from 'notesy/mixins/drill-support';

const SCALES = [
    { name: 'Major', form: [2, 2, 1, 2, 2, 2, 1] },
    { name: 'Minor', form: [2, 1, 2, 2, 1, 2, 2] }];

const PATTERNS = [
    'Ascending',
    'Descending',
    'Alt. Ascending',
    'Alt. Descending'];

export default Component.extend(DrillSupportMixin, {
  classNames: ['row', 'w-100', 'play-scale'],

  _scales: null,
  _patterns: null,

  init() {
    this._super(...arguments);
    set(this, '_scales', SCALES);
    set(this, '_patterns', PATTERNS);
  },

  capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  _pattern: computed('config.withPatterns', {
    get() {
      if (get(this, 'config.withPatterns')) {
        const _patterns = get(this, '_patterns');
        return _patterns[Math.floor(Math.random() * _patterns.length)];
      }

      return null;
    }
  }).readOnly(),

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
    const scales = get(this, 'scales');
    const scale = scales[Math.floor(Math.random() * scales.length)];

    const roots = get(this, 'roots');
    const selectedRoot = roots[Math.floor(Math.random() * roots.length)];
    set(this, 'selectedRoot', selectedRoot);

    const root = get(this, 'root');
    const rootIdx = roots.indexOf(root);

    const allRoots = get(this, 'allRoots');

    let currentPosition = rootIdx;
    const notes = scale.form.map((interval) => {
      currentPosition = (currentPosition + interval) % allRoots.length;
      return allRoots[currentPosition];
    });
    notes.unshift(root);

    set(this, 'notes', notes);
    set(this, 'scaleName', scale.name);

    set(this, 'pattern', get(this, '_pattern'));
    this._super(...arguments);
  }
});
