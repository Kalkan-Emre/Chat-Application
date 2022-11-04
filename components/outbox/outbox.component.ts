import { OnInit, Component, ViewChild} from '@angular/core';
import { ApiService } from './../../service/api.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {

  displayedColumns: string[] = ['to', 'message', 'date','update'];
  dataSource:any;

  Message:any = [];
  constructor(private apiService: ApiService) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
  
    let jsonObject = sessionStorage.getItem('user');
    let username = JSON.parse(jsonObject)["username"];
    this.apiService.getOutbox(username).subscribe((data) => {
     this.Message = data;
     this.dataSource = new MatTableDataSource(this.Message);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
    })    
  }

  deleteMessage(message) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteMessage(message._id).subscribe((data) => {
          window.location.reload();
        }
      )    
    }
  }

}
