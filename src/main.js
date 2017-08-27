import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources('components/icon/icon');
    // .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
