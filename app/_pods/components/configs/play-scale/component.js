import Component from '@ember/component';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'play-scale-config'],

  defaults: {
    duration: 500,
    nonMajorRoots: false,
    includeMajor: true,
    includeMinor: false,
  },
});
