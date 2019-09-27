import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    data: DataElement[] = [];
    item: DataElement;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public actionSheetController: ActionSheetController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        for (let i = 1; i <= 10; i++) {
            this.data.push(this.createRandomItem());
        }
    }

    createItem(id: number): DataElement {
        return new DataElement(id, 'item ' + id + ' details');
    }

    createRandomItem(): DataElement {
        const int: number = parseInt((Math.random() * 100) + '', 10);
        return this.createItem(int);
    }

    onSelected(item: any): void {
        this.item = item;
    }

    isSelected(item: any): boolean {
        return this.item === item;
    }

    onAddItem(): void {
        this.data.push(this.createRandomItem());
    }

    onRemoveItem(item: any): void {
        this.data.splice(this.data.indexOf(item), 1);
    }

    onRemoveAll(): void {
        this.data = [];
    }
    async selectAction(item: any) {
        const actionSheet = await this.actionSheetController.create({
            'cssClass': 'bottomsheet',
            buttons: [{
                text: 'Edit Details',
                icon: 'create',
                handler: () => { }
            }, {
                text: 'Remove',
                icon: 'close-circle',
                handler: () => {
                    this.onRemoveItem(item);
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => { }
            }]
        });
        await actionSheet.present();
    }
}

class DataElement {
    constructor(public id: number, public details: string) {
    }
}
