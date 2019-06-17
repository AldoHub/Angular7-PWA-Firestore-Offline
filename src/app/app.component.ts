import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {RealtimeService} from "./realtime.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'realtimeoffline';
  phrasesArray: any [];

  constructor(private realtimeService: RealtimeService){
    
  }

  public phrasesForm = new FormGroup({
    quote: new FormControl('', Validators.required),
    author: new FormControl('',  Validators.required),
  });

  addPhrase(formData: FormData){
    this.realtimeService.addPhrase(formData);
    this.phrasesForm.reset();
  }




  ngOnInit(): void {
      this.phrasesArray = this.realtimeService.phrasesCollection;
      
  }

}
