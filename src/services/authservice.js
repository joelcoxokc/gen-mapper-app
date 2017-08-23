import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { Http } from 'services/http'

const SUCCESS = 'success';
class User {
    entityType: string = 'users';
    email: string;
    password: string;
    constructor(options: {}) {
        Object.assign(this, options);
    }
}

@inject(Http)
export class AuthService {
    
    loggedIn: Boolean = false;

    constructor(handler) {
        this.handler = handler;
        this.http = handler.http;
    }

    onLogin() {
        return;
    }

    login(user: User) {
        user.entityType = 'auth'
        return this.handler.create(user)
            .then(response => {
                console.log('loggedIn')
                sessionStorage.setItem('auth_token', response.content.data);
                this.loggedIn = true;
                this.handler.configure();
                return this.onLogin();
            })
    }

    signup(user: User) {
        user = new User(user);
        return this.handler.create(user)
            .then( response => {
                if (response.status === SUCCESS) {
                    this.user = new User(response.data);
                    return this.login(user);
                }
            })
            
    }
}