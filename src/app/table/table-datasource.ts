import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ContentService } from '../content.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

export interface Detail {
  name:string;
  phone:string;
  email:string;
  id:string;
}

export class TableDataSource extends DataSource<Detail>  {
  data!:Detail[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private dataService:ContentService) {
    super();
    this.dataService.getData().subscribe((data)=>{
      this.data=data;
    })
  }
 
 
  
  connect(): Observable<Detail[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }
  disconnect(): void {}

  private getPagedData(data: Detail[]): Detail[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: Detail[]): Detail[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id':  return compare( +a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string  | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
