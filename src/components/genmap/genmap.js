export class GenMapViewModel {

    showDocumentList = false;

    activate(params) {
        this.mapType = params.type;
    }
    
    configureRouter(config, router) {
        config.map([
            {
                moduleId: 'components/documents/documents',
                route: ['', 'documents'],
                name: 'documents',
                auth: true,
            },
            {
                moduleId: 'components/import/import',
                route: ['import'],
                name: 'import',
                auth: true,
            },
            {
                moduleId: 'components/map/map',
                route: [':id'],
                name: 'map',
                auth: true,
            }
        ]);

        this.router = router;
    }
}