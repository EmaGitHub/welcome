import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/service/user.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerService} from './shared/service/spinner.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('fadeFromTop', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translate(0,-40%)' }),
                animate(500, style({ opacity: 1, transform: 'translate(0,0%)' }))]),
            transition(':leave', [animate(500, style({ opacity: 0, transform: 'translate(0,-10%)' }))])
        ])
    ]
})
export class AppComponent implements OnInit {

    elements = [];

    constructor(private userService: UserService , private router: Router, private translate: TranslateService, private spinnerService: SpinnerService) { }

    setLanguage() {
        this.translate.use('en');
    }

    ngOnInit(): void {
        this.userService.getCurrentUser(true);
        this.userService.retrieveRoleForUser();
        this.spinnerService.getErrorMessage().pipe().subscribe(message => {
            if(message !== 'none'){
                this.elements.push(message);
                setTimeout(() => {
                    this.elements.pop();
                }, 3000);
            }
        });
    }
}
