import Mixin from '@ember/object/mixin';
import EmberObject, { set, get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

export default Mixin.create({
  defaults: null,

  serializeConfig(config) {
    const defaults = get(this, 'defaults');
    return config.getProperties(Object.keys(defaults));
  },

  prefsKey: null,

  prefs: service(),

  config: null,

  range: {
    'min': 50,
    'max': 1000
  },

  step: 25,

  init() {
    this._super(...arguments);
    let defaults = get(this, 'defaults');

    const prefsKey = get(this, 'prefsKey');
    if (prefsKey) {
      const savedPrefs = get(this, 'prefs').load(prefsKey);
      defaults = Object.assign(defaults, savedPrefs);
    }

    set(this, 'config', EmberObject.create(defaults));
  },

  didInsertElement() {
    this._super(...arguments);
    next(this, () => {
      const config = get(this, 'config');
      this.saveAndNotifyConfig(config);
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

  saveAndNotifyConfig(config) {
    this.onChange(config);
    const prefsKey = get(this, 'prefsKey');
    get(this, 'prefs').save(prefsKey, this.serializeConfig(config));
  },

  actions: {
    durationChanged(value) {
      const config = get(this, 'config');
      config.set('duration', value);
      this.saveAndNotifyConfig(config);
    },

    configChanged(key, evt) {
      const config = get(this, 'config');
      config.set(key, evt.target.checked);
      this.saveAndNotifyConfig(config);
    }
  }
});
