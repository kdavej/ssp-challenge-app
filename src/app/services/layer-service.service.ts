import { Injectable } from '@angular/core';
import { MapService } from './map-service.service';
import { loadModules } from 'esri-loader';
import { FeatureLayerModule } from './modules.constants';
import esri = __esri;

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  public mapLayers: esri.Layer[] = [];

  constructor(private mapService: MapService) { }

  public async addLayerToMap(layer: esri.Layer) {
    if (this.mapService.map.findLayerById(layer.id)) {
      this.showLayer(layer.id);
      return;
    }

    try {
      const [FeatureLayer] = await loadModules([FeatureLayerModule]);
      const newLayer = new FeatureLayer(layer);
      this.mapLayers.push(newLayer);
      this.updateMapLayers();
    } catch (err) {
      console.log(err);
    }
  }

  public showLayer(layerId: string): void {
    this.updateLayerVisibility(layerId, true);
  }

  public hideLayer(layerId: string): void {
    this.updateLayerVisibility(layerId, false);
  }

  private updateLayerVisibility(layerId: string, visibility: boolean): void {
    const layer: esri.Layer = this.mapService.map.findLayerById(layerId);
    if (layer) {
      layer.visible = visibility;
    }
  }

  private updateMapLayers(): void {
    this.mapService.map.layers.removeAll();
    this.mapService.map.layers.addMany(this.mapLayers);
  }
}
