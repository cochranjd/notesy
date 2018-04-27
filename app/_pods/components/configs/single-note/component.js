import Component from '@ember/component';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'single-note-config'],

  defaults: {
    duration: 500,
    nonMajors: false,
    withRoot: true,
    nonMajorRoots: false
  }
});
