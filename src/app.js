import { Redirect } from 'aurelia-router';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    var step = new AuthorizeStep;
    config.addAuthorizeStep(step)
    config.map([
      {
        moduleId: 'components/map/map',
        route: ['', 'map', 'map/:id'],
        name: 'map',
      },
      {
        moduleId: 'components/login/login',
        route: 'login',
        name: 'login'
      },
      {
        moduleId: 'components/signup/signup',
        route: 'signup',
        name: 'signup'
      }
    ])
    this.router = router;
    console.log(this.router)
  }
}



class AuthorizeStep {
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      var isLoggedIn = !!sessionStorage.getItem('auth_token');
      console.log(isLoggedIn)
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}