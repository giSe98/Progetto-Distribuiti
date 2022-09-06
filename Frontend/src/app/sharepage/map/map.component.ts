import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: L.Map;
  private centroid: L.LatLngExpression = [42.3601, -71.0589]; 
  lat:number;
  lon:number;

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
   })
};
  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lon],
      attributionControl:false,
      zoom: 14
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://1938.com.es">Web Inteligencia Artificial</a>'
    });

    // create 5 random jitteries and add them to map
    const marker = L.marker([this.lat,this.lon],this.icon).addTo(this.map);

    tiles.addTo(this.map);
  
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<MapComponent>) { 
    if(data){
      this.lat=data.lat;
      this.lon=data.lon;
    }
  }
  onNoClick(){
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.initMap();
  }
}
