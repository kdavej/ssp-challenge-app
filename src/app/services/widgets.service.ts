import { Injectable } from '@angular/core';
import { MapService } from './map-service.service';
import esri = __esri;
import { loadModules } from 'esri-loader';
import { BasemapGalleryModule } from './modules.constants';


@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private baseMapGallery: esri.BasemapGallery;

  constructor(private mapService: MapService) { }

  public async addBaseMapGallery() {
    if (!this.baseMapGallery) {
      try {
        const [BasemapGallery] = await loadModules([BasemapGalleryModule]);
        this.baseMapGallery = new BasemapGallery({
          view: this.mapService.view,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
}
