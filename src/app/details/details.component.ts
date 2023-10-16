import { Component } from '@angular/core';
import { ContentService } from '../content.service';
import { Detail } from '../details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private dataService:ContentService){}

sucessMssg!:string;
hide:boolean=true;

data:Detail={
  name:'',
  phone:"",
  email:'',
  id:''
}
addDetail(){
  this.dataService.addData(this.data).subscribe((data)=>{
    this.hide=false;
      this.sucessMssg='Detail added sucessfully';
      setTimeout(()=>{
        this.sucessMssg='';
        this.hide=true;
        
      },3000)
  })
}

}
