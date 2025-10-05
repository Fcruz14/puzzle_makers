import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOptions } from './game-options';

describe('GameOptions', () => {
  let component: GameOptions;
  let fixture: ComponentFixture<GameOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
