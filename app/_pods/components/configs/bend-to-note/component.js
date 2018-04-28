import Component from '@ember/component';
import { set } from '@ember/object';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'bend-to-note-config'],

  init() {
    set(this, 'defaults', {
      duration: 500,
      withRoot: true
    });
    this._super(...arguments);
  }
});
