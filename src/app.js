
export class App {
  configureRouter(config, router) {
    config.map([
      {
        moduleId: 'components/home/home',
        route: [''],
        name: 'home'
      },
      {
        moduleId: 'components/category/category',
        route: 'categories/:id',
        name: 'category'
      },
      {
        moduleId: 'components/tool/tool',
        route: 'tools/:id',
        name: 'tool'
      }
    ]);
    this.router = router;
  }
}
