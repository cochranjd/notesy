import Component from '@ember/component';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'multi-note-config'],

  defaults: {
    duration: 500,
    crossOctave: false,
    nonMajors: false,
    withRoot: true,
    nonMajorRoots: false
  },
});
