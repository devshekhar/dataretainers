/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainservicesService } from './mainservices.service';

describe('MainservicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainservicesService]
    });
  });

  it('should ...', inject([MainservicesService], (service: MainservicesService) => {
    expect(service).toBeTruthy();
  }));
});
