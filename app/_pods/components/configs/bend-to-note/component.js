import Component from '@ember/component';
import ConfigMixin from 'notesy/mixins/config-support';

export default Component.extend(ConfigMixin, {
  classNames: ['row', 'bend-to-note-config'],

  defaults: {
    duration: 500,
    withRoot: true
  }
});
