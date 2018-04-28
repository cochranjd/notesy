import Component from '@ember/component';
import { set } from '@ember/object';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'multi-note-config'],

  init() {
    this._super(...arguments);
    set(this, 'defaults', {
      duration: 500,
      crossOctave: false,
      nonMajors: false,
      withRoot: true,
      nonMajorRoots: false
    });
  }
});
