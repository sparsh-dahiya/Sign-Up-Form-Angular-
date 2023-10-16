import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detail } from './details';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<Detail[]>('http://localhost:3000/entry');
  }

  addData(detail:Detail){
    return this.http.post<Detail[]>('http://localhost:3000/entry' ,detail);
  }

  editdata(detail:Detail){
    return this.http.put<Detail[]>('http://localhost:3000/entry'+ `/${detail.id}`, detail );
  }

  deleteRooms(id:string){
    return this.http.delete<Detail[]>('http://localhost:3000/entry' + `/${id}` );
  }
}
