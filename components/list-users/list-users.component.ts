import { OnInit, Component, ViewChild} from '@angular/core';
import { ApiService } from './../../service/api.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


export interface UserInfo {
  name: string;
  id: number;
  username: number;
  gender: string;
  email: string;
  designation: string;
  phoneNumber: number;
  birthDate: number;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})


export class ListUsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'username', 'name', 'designation','email','gender','phone number', 'birth date', 'update'];
  dataSource:any;

  User:any = [];

  constructor(private apiService: ApiService) {}
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
  
    this.apiService.getUsers().subscribe((data) => {
      this.User = data;
      this.dataSource = new MatTableDataSource(this.User);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     })
  }

  removeUser(id, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteUser(id).subscribe((data) => {
        }) 
        this.apiService.getUser(id).subscribe((data) => {
          const user_log = {
            username: data["username"],
            activity: "user removed",
            date: Date.now()
          }
          this.apiService.createUserLog(user_log).subscribe({
            error: (e) => {
              console.log(e);
              window.location.reload();
            }
          });
        })
    }
  }
}

