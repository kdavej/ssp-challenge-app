import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/map-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import esri = __esri;
import { MatSlideToggleChange } from '@angular/material';
import { LayerService } from 'src/app/services/layer-service.service';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss']
})
export class MapControlsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapService: MapService,
              private layerService: LayerService) { }

  public ngOnInit(): void {
    this.mapService.loadComplete$
    .pipe(takeUntil(this.destroy$))
    .subscribe((loadComplete: boolean) => {
      if (!loadComplete) { return; }
      const spatialReference: esri.SpatialReference = {wkid: 102100} as esri.SpatialReference;
      const wetlandsExtent: esri.Extent = {
        // autocasts as new Extent()
        xmin: -12930236.2087,
        ymin: 5599660.4409,
        xmax: -12919377.7567,
        ymax: 5611241.2475,
        spatialReference,
      } as esri.Extent;

      this.mapService.animateToMapExtent(wetlandsExtent);
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public addWetlandsLayerToMap(event: MatSlideToggleChange): void {
    if (event.checked) {
      const wetLandsLayer: esri.FeatureLayer = {
        id: 'wetlands',
        url: 'https://services.arcgis.com/2QghPZBp8XY0vd0D/arcgis/rest/services/Wetlands/FeatureServer/0',
      } as esri.FeatureLayer;

      this.layerService.addLayerToMap(wetLandsLayer);
    } else {
      this.layerService.hideLayer('wetlands');
    }
  }

  public addBasemapWidget(event: MatSlideToggleChange): void {
    if (event.checked) {

    }
  }
}
