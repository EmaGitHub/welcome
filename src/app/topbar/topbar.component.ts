import {Component} from '@angular/core';
import {UserService} from '../shared/service/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

    user: string;
    brandMod = {
        preTitle: 'Solution SnoopWeb',
        icon: './assets/images/Hamburger.svg'
    };

    constructor(private userService: UserService) {

        this.userService.getCurrentUser(false).pipe().subscribe(res => {
            if (res && res.output) {
                this.user = res.output.user;
                localStorage.setItem('currentUser', this.user);
            }
        });
    }

}
