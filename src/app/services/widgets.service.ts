import { Injectable } from '@angular/core';
import { MapService } from './map-service.service';
import esri = __esri;
import { loadModules } from 'esri-loader';
import { BasemapGalleryModule } from './modules.constants';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private baseMapGallery: esri.BasemapGallery;
  private baseMapGalleryProps: any = {
    position: 'top-right',
    closeOnSelect: true,
  };
  private mapChangedSubscriptionRef: Subscription;

  constructor(private mapService: MapService) { }

  public async addBaseMapGallery(galleryProps?: any) {
    if (galleryProps) {
      this.baseMapGalleryProps = {
        ...this.baseMapGalleryProps,
        ...galleryProps,
      };
    }
    if (!this.baseMapGallery) {
      try {
        const [BasemapGallery] = await loadModules([BasemapGalleryModule]);
        this.baseMapGallery = new BasemapGallery({
          view: this.mapService.view,
        });
        this.addGalleryToMapView(this.baseMapGalleryProps);
      } catch (err) {
        console.log(err);
      }
    } else {
      this.addGalleryToMapView(this.baseMapGalleryProps);
    }
  }

  public removeBaseMapGallery() {
    if (!this.baseMapGallery) { return; }
    this.mapService.view.ui.remove(this.baseMapGallery);
  }

  private addGalleryToMapView(galleryProps: any) {
    this.mapService.view.ui.add(this.baseMapGallery, galleryProps.position);

    if (galleryProps.closeOnSelect && !this.mapChangedSubscriptionRef) {
      this.mapChangedSubscriptionRef = this.mapService.baseMapChanged$.subscribe((newMap: string) => {
        this.removeBaseMapGallery();
      });
    }
  }
}
