import { TestBed } from '@angular/core/testing';

import { LayerServiceService } from './layer-service.service';

describe('LayerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LayerServiceService = TestBed.get(LayerServiceService);
    expect(service).toBeTruthy();
  });
});
