import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
describe('AppComponent', () => {
  let app:AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents().then(() => { 
      fixture = TestBed.createComponent(AppComponent);
      app = fixture.debugElement.componentInstance;
    });

  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it('createItem', async(() => {
    expect(app.createItem(1)).toEqual({ id: 1, name: 'Item 1', details: 'item 1 details' });
  }));
  it('onRemoveAll', async(() => {
    app.onRemoveAll();
    expect(app.data).toEqual([]) ;
  }));
  it('onSelected', async(() => {
    const item = { id: 1, name: 'Item 1', details: 'item 1 details' };
    app.onSelected(item);
    expect(app.item).toEqual({ id: 1, name: 'Item 1', details: 'item 1 details' });
  }));
  it('isSelected when true', async(() => {
    app.item = 'item1';
    expect(app.isSelected('item1')).toBeTruthy();
  }));
  it('isSelected when false', async(() => {
    app.item = 'item2';
    expect(app.isSelected('item1')).toBeFalsy();
  }));
  it('onAddItem', async(() => {
    fixture.detectChanges();
    spyOn(app, 'createRandomItem').and.returnValue({ id: 2, name: 'Item 2', details: 'item 2 details' });
    app.data = [{ id: 1, name: 'Item 1', details: 'item 1 details' }];
    app.onAddItem();
    expect(app.createRandomItem).toHaveBeenCalled();
    expect(app.data).toEqual([{ id: 1, name: 'Item 1', details: 'item 1 details' }, { id: 2, name: 'Item 2', details: 'item 2 details' }]);
  }));
  it('onRemoveItem', async(() => {
    fixture.detectChanges(); 
    app.data = ["item1","item2","item3"];
    app.onRemoveItem("item2");
    expect(app.data).toEqual(["item1","item3"]);
  }));
});