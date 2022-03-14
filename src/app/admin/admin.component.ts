import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import {saveAs as importedSaveAs} from "file-saver";
import { Document,Spacing, HorizontalPositionAlign, HorizontalPositionRelativeFrom, ImageRun, Packer, Paragraph, TextRun, UnderlineType, VerticalPositionAlign, VerticalPositionRelativeFrom,Underline, AlignmentType } from "docx";
import { AdminService } from "../../services/admin.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  consultants:any;
  pdffile:any;
  users:any;
  name:any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  constructor(private breakpointObserver: BreakpointObserver, private admin: AdminService,) { }
    base64toBlob(byteString:any) {
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: "octet/stream" });
    }
  ngOnInit(){
    this.admin.getAllUsers().subscribe(
      data =>{
        this.users=data
      }
    )
    console.log(this.users)
    }
  
  
}
