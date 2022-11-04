import { OnInit, Component, ViewChild, AfterViewInit} from '@angular/core';
import { ApiService } from './../../service/api.service';
import {MatSort,} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PageEvent} from "@angular/material/paginator";


export interface UserLogs {
  username: string;
  activity: string;
  date: number;
}

@Component({
  selector: 'app-list-user-logs',
  templateUrl: './list-user-logs.component.html',
  styleUrls: ['./list-user-logs.component.css']
})
export class ListUserLogsComponent implements OnInit {

  displayedColumns: string[] = ['username', 'activity', 'date'];
  dataSource:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(PageEvent) pageEvent: PageEvent;


  UserLogs:any = [];
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
  
    this.apiService.getUserLogs().subscribe((data) => {
      this.UserLogs = data;
      this.dataSource = new MatTableDataSource(this.UserLogs);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     }) 
  }

  onChangePage(pe:PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }
}
