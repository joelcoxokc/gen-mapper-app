import { FileService } from 'services/fileservice';
import { inject, Factory } from 'aurelia-framework';
import { GenMapper } from './genmapper';

@inject(FileService, Factory.of(GenMapper))
export class MapViewModel {

    constructor(fileService: FileService, GenMapper:Factory<genmapper>) {
        this.fileService = fileService;
        this.GenMapper = GenMapper;
    }

    activate(params) {
        this.format = params.type;
        this.model = this.fileService.current;
        
        this.genmapper = this.GenMapper({
            model: this.model,
            format: this.format
        });
    }

    save() {
        let content = this.genmapper.outputString();
        
        console.log(content);
        // this.fileService.update(this.model);
    }
}