import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/models/users.model';
import { FirebaseService } from 'src/app/services/firebase.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  userList = [];



  constructor(private fb:FirebaseService) { }

  ngOnInit() {
    
    this.userList = this.fb.getAllUsers();
    
  }

  deleteUser(user:UsersModel, index:any){
    Swal.fire({
      title: "Esta seguro?",
      text: `Esta seguro que desea borrar a ${user.email}`,
      type: "question",
      showCancelButton:true,
      showConfirmButton: true
    }).then(res => {
      if(res.value){
        this.fb.deleteUser(user.id);
        this.userList.splice(index, 1);
      }
    });
  }


  changeType(user:UsersModel){
    this.fb.changeUserType(user);
  }

}
