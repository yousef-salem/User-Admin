import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserDto } from 'src/app/DTO/user-dto';
import { UserMapper } from 'src/app/Mapper/user-mapper';
import { IUser } from 'src/app/Model/iuser';
import { ResponseApi } from 'src/app/Response/response';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { Route, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion } from '@angular/material/expansion';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { patternValidator , notInValidator, passwordMatch } from 'src/app/Custom Validators/customValidators';
import { MatSelectModule } from '@angular/material/select';
import { DialogAddUser } from './DialogAddUser/DialogAddUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'age' ,'city' ,'info','del'];
  dataSource! : MatTableDataSource<UserDto>;
  usersData : any[] = [];
  usersView : UserDto[] = [] ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  // limit! : number;
  // skip! :number ;

  constructor(private userService:UserServiceService , private router : Router ,
              private dialog : MatDialog) {
    // this.dataSource = new MatTableDataSource(this.users); 
  }
  ngOnInit(): void {
    // this.limit = this.paginator.pageSize ;
    //     this.skip = (this.limit * (this.paginator.pageIndex+1) );
    this.userService.getAllUsers().subscribe({
      next:(response)=>{ 
        console.log(response)
        this.usersData = response;
        this.usersView = this.usersData.map(it=>UserMapper.mapUserToUserDto(it)) ;
        this.updateViewData() ;
        // this.toastr.success('data loaded successfully', 'Done', { timeOut: 2000 });
        this.userService.onResponseSuccess('Done','data loaded successfully') ;
    },error: (error: any) => {
      this.userService.onResponsefaild(error.message) ;
    }
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // onPageChange(event: any) {
  //   // Update the limit and skip values based on the paginator's values
  //   this.limit = event.pageSize;
  //   this.skip = event.pageIndex * this.limit;
  
  //   // Call your API method with the updated limit and skip values
  //   this.userService.getAllUsers(this.limit, this.skip).subscribe({
  //     next: (response: ResponseApi<IUser[]>) => {
  //       this.users = response.users.map(it => UserMapper.mapUserToUserDto(it));
  //       this.dataSource = new MatTableDataSource(this.users);
  //       this.dataSource.sort = this.sort;
  //       // this.toastr.success('Data loaded successfully', 'Done', { timeOut: 2000 });
  //     },
  //     error: (error: any) => {
  //       this.toastr.error(error.message, 'Error', { timeOut: 4000 });
  //       console.log(error);
  //     }
  //   });
  // }

  openUserDetails(uId:number){
    this.router.navigateByUrl('/User/'+uId);  
    // this.router.navigate(['User/',uId]);
    }

  deleteUser(id : number){
    this.userService.deleteUser(id).subscribe({
      next:(response)=>{
        const indexToRemove = this.usersView.findIndex(user => user.id === id); // this code for 
        if (indexToRemove !== -1)                                           // delete the user from ui 
        this.usersView.splice(indexToRemove, 1);                                // to simulate the delete 
        //should the list of data update even change or request from api 
        this.updateViewData()
        this.userService.onResponseSuccess('Delete',`${response.message}`) ;
      },error: (error: any) => {
        this.userService.onResponsefaild(error.message) ;
      }
    })
  }

  updateViewData(){
      this.dataSource = new MatTableDataSource(this.usersView);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
    }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUser, {
      data: {List : this.usersData},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      console.log('The dialog was closed');
      console.log(result);
      this.userService.addUser(result).subscribe({
        next:(response)=>{ 
            this.usersView.push(UserMapper.mapUserToUserDto(response)) ;
            this.updateViewData() ;
            // this.toastr.success('data loaded successfully', 'Done', { timeOut: 2000 });
            this.userService.onResponseSuccess('Done','data Added successfully') ;
        },error: (error: any) => {
          this.userService.onResponsefaild(error.message) ;
        }
        }) ;
      }
      // else{
        // this.userService.onResponsefaild('Canceled') ;
      // }
    });
  }
  

}

