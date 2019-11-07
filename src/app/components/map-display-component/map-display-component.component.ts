import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MapService } from 'src/app/services/map-service.service';
import esri = __esri;
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map-display-component',
  templateUrl: './map-display-component.component.html',
  styleUrls: ['./map-display-component.component.scss']
})
export class MapDisplayComponentComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapService: MapService) {}

  public ngOnInit(): void {
    this.mapService.generateMap(this.mapViewEl.nativeElement, 'topo-vector');
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // private async initializeMap() {
  //   try {
  //     const [
  //       Map,
  //       MapView,
  //       Featurelayer,
  //       GalleryWidget,
  //       Expand,
  //     ] = await loadModules([
  //       MapType,
  //       SceneViewType,
  //       FeatureLayerType,
  //       BasemapGalleryType,
  //       ExpandWidgetType,
  //       ]);

  //     const map: __esri.Map = new Map({
  //       basemap: 'topo-vector',

  //     });

  //     const mapViewProperties: __esri.SceneViewProperties = {
  //       container: this.mapViewEl.nativeElement,
  //       map,
  //       extent: {
  //         // autocasts as new Extent()
  //         xmin: -12930236.2087,
  //         ymin: 5599660.4409,
  //         xmax: -12919377.7567,
  //         ymax: 5611241.2475,
  //         spatialReference: { wkid: 102100 },
  //       }
  //     };

  //     const popUpWetlands: any = {
  //       title: 'Wetlands',
  //       content: '<ul><li><b>Attribute:</b> {ATTRIBUTE}</li><li><b>Type:</b> {WETLAND_TY}</li><li><b>Acres:</b> {ACRES}</li></ul>',
  //     };

  //     const featureLayer = new Featurelayer({
  //       url:
  //           'https://services.arcgis.com/2QghPZBp8XY0vd0D/arcgis/rest/services/Wetlands/FeatureServer/0',
  //         outFields: ['ATTRIBUTE', 'WETLAND_TY', 'ACRES'],
  //         popupTemplate: popUpWetlands,
  //     });

  //     map.add(featureLayer);

  //     this.view = new MapView(mapViewProperties);

  //     const basemapGallery = new GalleryWidget({
  //       view: this.view,
  //       container: document.createElement('div'),
  //     });

  //     const expand1 = new Expand({
  //       view: this.view,
  //       content: basemapGallery,
  //     });


  //     this.view.ui.add(expand1, {position: 'top-right'});

  //     return this.view;
  //   } catch (error) {
  //     console.log('Esri error: ', error);
  //   }
  // }
}
