import { TestBed } from '@angular/core/testing';

import { CardjsonService } from './cardjson.service';

describe('CardjsonService', () => {
  let service: CardjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
