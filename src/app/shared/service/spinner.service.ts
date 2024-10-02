import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {HttpRequest} from '@angular/common/http';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    errorMessage = new ReplaySubject<string>();

    isLoading = new BehaviorSubject(false);

    private loadingDisabled = false;

    private requests: HttpRequest<any>[] = [];

    constructor(private liveAnnouncer: LiveAnnouncer) { }

    disableLoading(): void {
        this.loadingDisabled = true;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    appendRequest(request: HttpRequest<any>): void {
        if (this.loadingDisabled) {
            this.loadingDisabled = false;
            return;
        }

        this.requests.push(request);
        this.isLoading.next(true);
        this.liveAnnouncer.announce('Loading');
    }

    removeRequest(request: HttpRequest<any>): void {
        const i = this.requests.indexOf(request);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.isLoading.next(this.requests.length > 0);
        if (!(this.requests.length > 0)) {
            this.liveAnnouncer.announce('Loading end');
        }
    }
}
