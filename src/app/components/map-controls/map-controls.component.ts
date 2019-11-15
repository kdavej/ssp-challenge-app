import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MapService } from 'src/app/services/map-service.service';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import esri = __esri;
import { MatSlideToggleChange } from '@angular/material';
import { LayerService } from 'src/app/services/layer-service.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrls: ['./map-controls.component.scss']
})
export class MapControlsComponent implements OnInit, OnDestroy {
  public featureType: string;
  public features: string[];
  public showFeatures = false;

  private wetlandsLayer: esri.FeatureLayer;

  public featureSelect: FormControl = new FormControl('');

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapService: MapService,
              private layerService: LayerService,
              private widgetService: WidgetsService) { }

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

    this.featureSelect.valueChanges.subscribe((value: string) => {
      const queryString = `WETLAND_TY = '${value}'`;
      this.layerService.queryLayerFeatures(this.wetlandsLayer, !value || value.length === 0 ? '' : queryString);
    });

    this.mapService.mapClicked$
    .pipe(takeUntil(this.destroy$))
    .subscribe((event: any) => {
      
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public addWetlandsLayerToMap(event: MatSlideToggleChange): void {
    if (event.checked) {
      this.layerService.queryResult$
      .pipe(take(1))
      .subscribe((features: esri.FeatureSet) => {
        this.populateFeaturesList(features);
      });
      this.layerService.layerAdded$
      .pipe(take(1))
      .subscribe((layer: esri.FeatureLayer) => {
        if (!layer) { return; }
        this.wetlandsLayer = layer;
        this.layerService.queryLayerFeatures(layer);
      });
      const wetLandsLayer: esri.FeatureLayer = {
        id: 'wetlands',
        url: 'https://services.arcgis.com/2QghPZBp8XY0vd0D/arcgis/rest/services/Wetlands/FeatureServer/0',
      } as esri.FeatureLayer;

      this.layerService.addLayerToMap(wetLandsLayer);
    } else {
      this.featureSelect.patchValue('');
      this.layerService.hideLayer('wetlands');
      this.showFeatures = false;
    }
  }

  public addBasemapWidget(event: MatSlideToggleChange): void {
      this.widgetService.addBaseMapGallery();
  }

  private populateFeaturesList(featureSet: esri.FeatureSet) {
    const allFeatureTypes: string[] = featureSet.features.map((feature: any) => feature.attributes.WETLAND_TY);
    const distinctFeatures = allFeatureTypes.filter((v, i, l) => {
      return l.indexOf(v) === i;
    });
    this.features = distinctFeatures;
    this.showFeatures = true;
  }
}
