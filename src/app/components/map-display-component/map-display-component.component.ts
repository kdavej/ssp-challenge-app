import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { loadModules } from 'esri-loader';
import { EsriService } from 'src/app/services/esri/esri.service';

@Component({
  selector: 'app-map-display-component',
  templateUrl: './map-display-component.component.html',
  styleUrls: ['./map-display-component.component.scss']
})
export class MapDisplayComponentComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;
  view: any;

  constructor(private esriService: EsriService) {}

  public ngOnInit(): void {
    this.initializeMap();
  }

  public ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  initializeMap() {
    const map = this.esriService.getMap({
      basemap: 'topo-vector'
    });

    const mapViewProperties = {
      container: this.mapViewEl.nativeElement,
      map,
      extent: {
        // autocasts as new Extent()
        xmin: -12930236.2087,
        ymin: 5599660.4409,
        xmax: -12919377.7567,
        ymax: 5611241.2475,
        spatialReference: 102100
      }
    };

    const popUpWetlands: any = {
      title: 'Wetlands',
      content: '<ul><li><b>Attribute:</b> {ATTRIBUTE}</li><li><b>Type:</b> {WETLAND_TY}</li><li><b>Acres:</b> {ACRES}</li></ul>',
    };

    const featureLayer = this.esriService.getFeatureLayer({
      url:
          'https://services.arcgis.com/2QghPZBp8XY0vd0D/arcgis/rest/services/Wetlands/FeatureServer/0',
        outFields: ['ATTRIBUTE', 'WETLAND_TY', 'ACRES'],
        popupTemplate: popUpWetlands,
    });

    map.add(featureLayer);

    this.view = this.esriService.getMapView(mapViewProperties);

    return this.view;
  }
}
