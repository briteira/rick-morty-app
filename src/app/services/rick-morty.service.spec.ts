/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RickMortyService } from './rick-morty.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: RickMorty', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RickMortyService],
      imports: [ 
        HttpClientModule,
      ]
    });
  });

  it('should ...', inject([RickMortyService], (service: RickMortyService) => {
    expect(service).toBeTruthy();
  }));
});
