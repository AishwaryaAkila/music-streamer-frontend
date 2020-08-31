import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongModel } from '../song-model';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';


let pako = require('pako');
let fileupload=require('fuctbase64');
declare var $:any;

@Component({
  selector: 'app-manage-files',
  templateUrl: './manage-files.component.html',
  styleUrls: ['./manage-files.component.css']
})
export class ManageFilesComponent implements OnInit {
  songModel = new SongModel();
  selectedFile: File;
  selectedImage:File;
  user:string=localStorage.getItem("username");
  


   
  
  constructor(private http:HttpService,private httpClient: HttpClient) { }

  ngOnInit(): void {
    $("#alert").hide();
  }

  public onFileChanged(event) {
    this.selectedFile=event.target.files[0];
    
    // this.file = encode(this.selectedFile);
    // console.log(this.file);
    // this.fileresult=fileupload(event).then((data)=>{
    //   this.file=data["base64"];
      
    //   console.log(data);
    //   let check = pako.deflate(this.file,{to:'string'});
    //   console.log(check);
    // });
    
  }
  alertclose(){
    $("#alert").hide();
    
    
  }
  public OnImageChanged(event) {
    this.selectedImage=event.target.files[0];
    
    // this.imageresult=fileupload(event).then((data)=>{
    //   this.image=data["base64"];
    //   console.log(data);
    //   let check = pako.deflate(this.image,{to:'string'});
    //   console.log(check);

      
    // });
  
    
  }
  
  
  SongForm(form:NgForm){
    // this.tmppath1=URL.createObjectURL(this.selectedFile);
    // this.file = Base64.
    // this.file=Base64.encodeURL(this.tmppath1);
    // console.log(this.file);
    const uploadData = new FormData();
    
    uploadData.append('audiofile',this.selectedFile);
    uploadData.append('audioimage',this.selectedImage); 
    

    this.songModel.audio_name=form.controls["songname"].value
    this.songModel.artist=form.controls["singerinfo"].value;
    this.songModel.movie_name=form.controls["movie"].value;
    // this.songModel.category=form.controls["category"].value;
    // this.songModel.language=form.controls["language"].value;
    

    uploadData.append('songmodel',JSON.stringify(this.songModel));
    
    this.http.uploadSong(uploadData).subscribe((data)=>{
      
      if(data==1){

        $("#alert").show();
      }
    })


  }

  
    
}

  



