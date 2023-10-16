import { Component } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { ContentService } from '../content.service';
import { Detail, Remove } from '../details';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent {
  constructor(private dataService: ContentService, private confirmService: NgConfirmService) {

  }
  sucessMssg!: string;
  editMssg!:string;
  hide: boolean = true;
  hideUpdate:boolean=true;
  
  remove() {
    this.confirmService.showConfirm("Do you want to delete this detail?",
      () => {
        let id = document.getElementById('remove') as HTMLInputElement;
        let value = id && id.value;
        this.dataService.deleteRooms(value).subscribe((data) => {
          this.hide = false;
          this.sucessMssg = 'Detail deleted sucessfully';
          setTimeout(() => {
            this.sucessMssg = '';
            this.hide = true;

          }, 3000)
          id.value='';
        })
      },
      () => {}
    )
  }

  data: Detail = {
    name: '',
    phone: "",
    email: '',
    id: ''
  }

  updateDetail() {
    this.dataService.editdata(this.data).subscribe((data) => {
      console.log('data updated');
      this.hideUpdate = false;
          this.editMssg = 'Detail edited sucessfully';
          setTimeout(() => {
            this.sucessMssg = '';
            this.hideUpdate = true;

          }, 3000)
    })

  }

}
