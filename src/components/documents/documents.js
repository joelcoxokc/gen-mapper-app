import { FileService } from 'services/fileservice';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Http } from 'services/http';

const formats_types = {
    'church-circles': 'churchCircles',
    'four-fields': 'fourFields'
}

class Document {
    id: string;
    entityType: string = 'documents';
    title: string = 'New Document';
    format: string;
    content: string = `id,parentId,name,email,link,attenders,believers,baptized,newlyBaptized,church,churchType,elementBaptism,elementWord,elementPrayer,elementLordsSupper,elementGive,elementLove,elementWorship,elementLeaders,elementMakeDisciples,place,date,threeThirds,active
    0,,Leader's Name,,,0,0,0,0,0,newBelievers,0,0,0,0,0,0,0,0,0,Place,Date,1234567,1`;
    constructor(obj = {}) {Object.assign(this, obj)};
}

@inject(Router, Http, FileService)
export class DocumentsViewModel {
    
    constructor(router, http, fileService) {
        this.router = router;
        this.http = http;
        this.fileService = fileService;
    }

    activate(params) {
        this.formatId = params.type;
        this.formatId = formats_types[this.formatId];
        const d = new Document();
        this.fileService.all();
    }
    
    saveDoc(doc) {
        this.fileService.update(doc);
    }

    loadDoc(doc) {
        this.fileService.select(doc);
        this.router.navigate(doc.title);
    }

    createDocument() {
        let doc = new Document();
        doc.format = this.formatId;
        
        this.fileService.create(doc)
            .then(()=> this.fileService.all());
    }

    removeDocument(doc) {
        this.fileService.delete(doc)
            .then(()=> this.fileService.all());
    }
}

