import Component from '@ember/component';
import { set } from '@ember/object';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'play-scale-config'],

  init() {
    set(this, 'defaults', {
      duration: 750,
      nonMajorRoots: false,
      includeMajor: true,
      includeMinor: false,
      withPatterns: true
    });
    this._super(...arguments);
  }
});
