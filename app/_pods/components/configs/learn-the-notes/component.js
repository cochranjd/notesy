import Component from '@ember/component';
import { set, get } from '@ember/object';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'learn-the-notes-config'],

  _strings: ['1', '2', '3', '4', '5', '6'],

  init() {
    set(this, 'defaults', {
      duration: 500,
      nonMajorRoots: false,
      strings: ['1', '2', '3', '4', '5', '6']
    });
    this._super(...arguments);
  },

  actions: {
    stringChanged(_string, evt) {
      const config = get(this, 'config');
      const checked = evt.target.checked;

      if (config.strings.includes(_string) && !checked) {
        const idx = config.strings.indexOf(_string);
        config.strings.splice(idx, 1);
      } else if (!config.strings.includes(_string) && checked) {
        config.strings.push(_string);
      }
      this.saveAndNotifyConfig(config);
    }
  }
});
