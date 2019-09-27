import {Component} from '@angular/core';
import * as Colors from '@pxblue/colors';
import {Input} from '@angular/core';

@Component({
    selector: 'empty-state',
    template: `
        <div class="container" [style.color]="colors.gray[500]">
            <div style="line-height: 1">
                <ng-content select="[empty-icon]"></ng-content>
            </div>
            <h2>{{title}}</h2>
            <h4 *ngIf="description" [style.color]="colors.blue[500]">{{description}}</h4>
            <div>
                <ng-content select="[action]"></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {

    @Input() title: string;
    @Input() description: string;
    colors: object = Colors;

    constructor() {
    }
}
