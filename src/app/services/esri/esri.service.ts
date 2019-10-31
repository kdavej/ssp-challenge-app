import { Injectable } from '@angular/core';
import { loadModules } from 'esri-loader';

const EsriModules: any = {
    Map:            'esri/Map',
    MapView:        'esri/views/MapView',
    FeatureLayer:   'esri/layers/FeatureLayer',
};

@Injectable()
export class EsriService {
    constructor() {}

    public getMap(mapConfig: any): any {
        const[Map] = loadModules([EsriModules.Map]).then[0];
        return new Map(mapConfig);
    }

    public getMapView(mapConfig: any): any {
        const[MapView] = loadModules([EsriModules.MapView]).then[0];
        return new MapView(mapConfig);
    }

    public getFeatureLayer(featureLayerConfig: any): any {
        const[FeatureLayer] = loadModules([EsriModules.MapFeatureLayerView]).then[0];
        return new FeatureLayer(featureLayerConfig);
    }
}
