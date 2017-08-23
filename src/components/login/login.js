import {AuthService} from 'services/authservice';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(AuthService, Router)
export class Login {
    
    email = null;
    password = null;

    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }

    onSubmit(event: Event = null): void {
        event.preventDefault();
        this.login();
    }

    login() {

        const email = this.email; 
        const password = this.password;
        let user = {email, password};
        this.auth.login(user)
            .then(()=> {
                this.router.navigate('');
            })
    }
}