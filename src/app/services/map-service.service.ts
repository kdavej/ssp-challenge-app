import { Injectable } from '@angular/core';
import esri = __esri;
import { loadModules } from 'esri-loader';
import { MapModule, MapViewModule, ExtentModule, FeatureLayerModule } from './modules.constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public view: esri.MapView;
  public map: esri.Map;
  public baseMapGallery: esri.BasemapGallery;

  public loadComplete$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  public async generateMap(mapContainerElement: any, basemapType: string, extent?: esri.Extent) {
    try {
      const[Map, MapView] = await loadModules([MapModule, MapViewModule]);

      this.map = new Map({
        basemap: basemapType,
      });

      let mapViewProperties: esri.MapViewProperties = {
        container: mapContainerElement,
        map: this.map,
      };

      if (extent) {
        mapViewProperties = {
          ...mapViewProperties,
          extent,
        };
      }

      this.view = new MapView(mapViewProperties);

      this.loadComplete$.next(true);

      return this.view;
    } catch (err) {
      console.log(err);
    }
  }

  public async animateToMapExtent(extent: esri.Extent) {
    try {
      const [Extent] = await loadModules([ExtentModule]);

      const extentToGoTo = new Extent(extent);

      this.view.goTo(extentToGoTo, {duration: 5000, animate: true});
    } catch (err) {
      console.log(err);
    }
  }

  
}
