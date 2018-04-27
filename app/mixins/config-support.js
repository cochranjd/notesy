import Mixin from '@ember/object/mixin';
import EmberObject, { set, get, computed } from '@ember/object';
import { next } from '@ember/runloop';

export default Mixin.create({
  defaults: {},

  config: null,

  range: {
    'min': 50,
    'max': 1000
  },

  step: 25,

  init() {
    this._super(...arguments);
    const defaults = get(this, 'defaults');
    set(this, 'config', defaults);
  },

  didInsertElement() {
    this._super(...arguments);
    next(this, () => {
      const defaults = get(this, 'defaults');
      this.attrs.onChange(EmberObject.create(defaults));
    });
  },

  seconds: computed('config.duration', {
    get() {
      const duration = get(this, 'config.duration');
      return duration / 100.0;
    }
  }).readOnly(),

  secondsStr: computed('seconds', {
    get() {
      const seconds = get(this, 'seconds');
      return seconds.toFixed(2);
    }
  }).readOnly(),

  actions: {
    durationChanged(value) {
      this.attrs.onDurationChange(value);
    }
  }
});
