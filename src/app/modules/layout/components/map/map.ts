import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { Nasapd } from '../../../../services/nasa-power-dav/nasapd';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit {
  map!: L.Map;

  constructor(private nasaPd: Nasapd) {}

  ngOnInit() {
    const lat = -12.3856;
    const lon = -76.7815;

    this.initMap(lat, lon);
    this.loadNasaData(lat, lon);
  }

  initMap(lat: number, lon: number) {
    const bounds = L.latLngBounds(
      [-12.4000, -76.8000],
      [-12.3700, -76.7600]
    );

    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 15,
      maxZoom: 18,
      minZoom: 14,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    L.marker([lat, lon])
      .addTo(this.map)
      .bindPopup('<b>Santa María del Mar</b><br>Distrito costero de Lima, Perú.')
      .openPopup();
  }

loadNasaData(lat: number, lon: number) {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  const dateStr = `${y}${m}${d}`;

  // Bounding box pequeño alrededor de Santa María del Mar
  const bbox = `${lat - 0.1},${lon - 0.1},${lat + 0.1},${lon + 0.1}`;

  this.nasaPd.getRegionalData({
    parameters: 'T2M',
    start: dateStr,
    end: dateStr,
    bbox,
    resolution: 0.05, // más detallado
  }).subscribe({
    next: (data) => {
      console.log('NASA REGIONAL DATA:', data);
      this.renderHeatmap(data);
    },
    error: (err) => console.error('Error NASA POWER DAV:', err)
  });
}

renderHeatmap(data: any) {
  if (!data?.features) {
    console.warn('Sin features en respuesta:', data);
    return;
  }

  const heatPoints: [number, number, number][] = [];

  data.features.forEach((feature: any) => {
    const [lon, lat] = feature.geometry.coordinates;
    const value = feature.properties.T2M;
    if (value !== null && value !== undefined) {
      // Escala temperatura para intensidad
      const intensity = Math.min(Math.max((value - 10) / 25, 0), 1);
      heatPoints.push([lat, lon, intensity]);
    }
  });

  (L as any).heatLayer(heatPoints, {
    radius: 20,
    blur: 15,
    maxZoom: 17,
  }).addTo(this.map);

  }

}
