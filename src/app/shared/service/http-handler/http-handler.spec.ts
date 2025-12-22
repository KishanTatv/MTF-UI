import { TestBed } from '@angular/core/testing';

import { HttpHandler } from './http-handler';

describe('HttpHandler', () => {
  let service: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
