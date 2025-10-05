import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePoints } from './game-points';

describe('GamePoints', () => {
  let component: GamePoints;
  let fixture: ComponentFixture<GamePoints>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePoints]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePoints);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
