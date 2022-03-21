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
  marker!: L.Layer
  waypointlat: any;
  waypointlng: any;
  data:any
  id:any
  updating: boolean = false
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
      if (this.marker) { // check
        this.map.removeLayer(this.marker); // remove
      }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng] ).addTo(
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
    if (this.updating) {
      this.admin.updateStation(form.value,this.id).subscribe(
        res => {alert("Modification de station avec succes"); this.updating=false;this.map.off();this.map.remove();this.showmap();this.loginForm.reset();this.loginForm.markAsUntouched},
        err => {alert("echec de modification de station avec succes")}
      )
    } else {
      this.admin.postStation(form.value).subscribe(
        res => {alert("ajout de station avec succes");this.updating=false;location.reload()},
        err => {alert("echec d'ajout de station avec succes")}
      )
    }
  }
  delete(id:any){
    this.admin.deleteStation(id).subscribe(
      res => {alert("Suppression de station avec succes");},
      err => {alert("echec de modification de station avec succes")}
    )
    this.modalService.close('custom-modal-1');
  }
  showmap(){
    this.map= L.map("map").setView([34.009508,9.4289231],7)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on("click", <LeafletMouseEvent>(e: { latlng: { lat: number; lng: number; }; }) => {
      if (this.marker) { // check
        this.map.removeLayer(this.marker); // remove
      }
      this.marker = L.marker([e.latlng.lat, e.latlng.lng] ).addTo(
        this.map
      );
      this.waypointlat = e.latlng.lat
      this.waypointlng = e.latlng.lng
    })
  }
  update(data:any){
    this.id = data._id
    this.updating = true
    delete data._id
    this.waypointlat = data.Lat
    this.waypointlng = data.Lng
    this.modalService.close('custom-modal-1');
    this.marker = L.marker([this.waypointlat, this.waypointlng] ).addTo(
      this.map
    );
   this.loginForm.setValue(data) 
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
