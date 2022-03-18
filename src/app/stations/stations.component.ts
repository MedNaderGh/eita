import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {FormControl, FormGroup, Validators,} from '@angular/forms';
import * as L from 'leaflet';
import { ModalService } from '../_modal';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  map!: L.Map | L.LayerGroup<any>;
  waypointlat: any;
  waypointlng: any;
  data:any
  constructor(private admin:AdminService,private modalService: ModalService) { }
  loginForm = new FormGroup({
  Numero : new FormControl('', [Validators.required]),
  Type : new FormControl('', [Validators.required]),
  Nom : new FormControl('', [Validators.required]),
  Transmission : new FormControl('', [Validators.required]),
  Capacite : new FormControl('', [Validators.required]),
  Bande : new FormControl('', [Validators.required]),
  Configuration : new FormControl('', [Validators.required]),
  Acceptance : new FormControl('', [Validators.required])
  })
  
  

  ngOnInit(): void {
    this.map= L.map("map").setView([34.009508,9.4289231],7)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on("click", <LeafletMouseEvent>(e: { latlng: { lat: number; lng: number; }; }) => {
      L.marker([e.latlng.lat, e.latlng.lng] ).addTo(
        this.map
      );
      this.waypointlat = e.latlng.lat
      this.waypointlng = e.latlng.lng
    })
  }
  submit(form: any) {
    form.value.Lat = this.waypointlat
    form.value.Lng = this.waypointlng
    console.log(form.value)
    this.admin.postStation(form.value).subscribe(
      res => {alert("ajout de station avec succes")},
      err => {alert("echec d'ajout de station avec succes")}
    )
  }
  delete(id:any){

  }
  update(data:any){
    
  }
  async getStations(){
    this.admin.getStations().subscribe(
      res => {
        this.data=res;
        console.log(this.data);
      },
      err => {
      }
    );
  }
  async stations(){
    await this.getStations();
    this.modalService.open('custom-modal-1');
    }
    closeModal(id: string) {
      this.modalService.close(id);
  }
}
