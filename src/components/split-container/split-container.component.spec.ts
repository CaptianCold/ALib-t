import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitContainerComponent } from './split-container.component';

describe('SplitContainerComponent', () => {
  let component: SplitContainerComponent;
  let fixture: ComponentFixture<SplitContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should set the default ratio",()=>{
    expect(component["ratio"]).toEqual(0.5);
  })

  it("stop dragging",()=>{
    component["_stopDragging"]();
    expect(component.isDragging).toEqual(false);
  })
  var event: MouseEvent ;
it("Should get Client Point From Event",()=>{
  component["_getClientPointFromEvent"](event);
});
});
