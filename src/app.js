
export class App {
  configureRouter(config, router) {
    config.map([
      {
        moduleId: 'views/home/home',
        route: [''],
        name: 'home'
      },
      {
        moduleId: 'views/category/category',
        route: 'categories/:id',
        name: 'category'
      },
      {
        moduleId: 'views/tool/tool',
        route: 'tools/:id',
        name: 'tool'
      }
    ]);
    this.router = router;
  }
}
