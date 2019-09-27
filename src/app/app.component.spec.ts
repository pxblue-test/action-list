import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';

describe('AppComponent', () => {

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: StatusBar, useValue: statusBarSpy},
                {provide: SplashScreen, useValue: splashScreenSpy},
                {provide: Platform, useValue: platformSpy},
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should add an item when the add icon is clicked', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.data = [];
        expect(app.data.length).toBe(0);
        const addSpy = spyOn(app, 'onAddItem').and.callThrough();
        document.getElementById('add-icon').click();
        expect(addSpy).toHaveBeenCalled();
        expect(app.data.length).toBe(1);
    });

    it('should delete the item when the action bar remove button is clicked',  async() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.data = [app.createItem(99)];
        const actionListSpy = spyOn(app, 'selectAction').and.callFake(() => {
            app.onRemoveItem(app.data[0]);
        });

        fixture.detectChanges();
        const menuButton = document.getElementById('menu-icon-99');
        menuButton.click();
        expect(actionListSpy).toHaveBeenCalled();
        expect(app.data.length).toBe(0);
    });

    it('should delete all items when delete icon is clicked', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        app.data = [app.createItem(99)];

        expect(app.data.length).toBe(1);
        const addSpy = spyOn(app, 'onRemoveAll').and.callThrough();
        document.getElementById('delete-icon').click();
        expect(addSpy).toHaveBeenCalled();
        expect(app.data.length).toBe(0);
    });
});
