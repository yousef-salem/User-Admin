import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/Model/iuser';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, PatternValidator, ValidatorFn, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { patternValidator } from 'src/app/Custom Validators/customValidators';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  currentUserId : number ;
  currentUser! :IUser ; 
  userForm!: FormGroup;
  isEdit = false ;
  
  constructor(private activatedRoute : ActivatedRoute , private userService : UserServiceService
              ,private fb: FormBuilder) {
                this.currentUserId =Number(this.activatedRoute.snapshot.paramMap.get('uId'));
            }
  ngOnInit(): void {

    // this.activatedRoute.paramMap.subscribe((paraMap)=>{
    //   this.currentUserId =Number(this.activatedRoute.snapshot.paramMap.get('uId'));
    //   this.prd = this.prdsrvc.getProductByID(this.currentUserId);
    // });
       this.userService.getUserById(this.currentUserId).subscribe({
        next:(response)=>{
          this.currentUser = response ; 
          this.createform(this.currentUser) ;
          this.userService.onResponseSuccess('User Details',`opened successfully`) ;
        },error: (error: any) => {
          this.userService.onResponsefaild(error.message) ;
        }
       });
  }

  createform(user : IUser){
    this.userForm = this.fb.group({
      id:[`${user.id}`],
      firstName: [`${user.firstName}`],
      lastName: [`${user.lastName}`,[Validators.required, patternValidator(/^[A-Za-z]{3,15}$/)]],
      maidenName: [`${user.maidenName}`,[Validators.required, patternValidator(/^[A-Za-z]{3,15}$/)]],
      age: [`${user.age}`],
      gender: [`${user.gender}`],
      email: [`${user.email}`],
      phone: [`${user.phone}`],
      username: [`${user.username}`],
      password: [`${user.password}`],
      birthDate: [`${user.birthDate}`],
      image: [`${user.image}`],
      bloodGroup: [`${user.bloodGroup}`],
      height: [`${user.height}`],
      weight: [`${user.weight}`],
      eyeColor: [`${user.eyeColor}`],
      hair: this.fb.group({
        color: [`${user.hair.color}`],
        type: [`${user.hair.type}`]
      }),
      domain: [`${user.domain}`],
      ip: [`${user.ip}`],
      address: this.fb.group({
        address: [`${user.address.address}`],
        city: [`${user.address.city}`],
        coordinates: this.fb.group({
          lat: [`${user.address.coordinates.lat}`],
          lng: [`${user.address.coordinates.lng}`]
        }),
        postalCode: [`${user.address.postalCode}`],
        state: [`${user.address.state}`]
      }),
      macAddress: [`${user.macAddress}`],
      university: [`${user.university}`],
      bank: this.fb.group({
        cardExpire: [`${user.bank.cardExpire}`],
        cardNumber: [`${user.bank.cardNumber}`],
        cardType: [`${user.bank.cardType}`],
        currency: [`${user.bank.currency}`],
        iban: [`${user.bank.iban}`]
      }),
      company: this.fb.group({
        address: this.fb.group({
          address: [`${user.company.address.address}`],
          city: [`${user.company.address.city}`],
          'coordinates': this.fb.group({
            lat: [`${user.company.address.coordinates.lat}`],
            lng: [`${user.company.address.coordinates.lng}`]
          }),
          postalCode: [`${user.company.address.postalCode}`],
          state: [`${user.company.address.state}`]
        }),
        department: [`${user.company.department}`],
        name: [`${user.company.name}`],
        title: [`${user.company.title}`]
      }),
      ein: [`${user.ein}`],
      ssn: [`${user.ssn}`],
      userAgent: [`${user.userAgent}`],
    });
    this.userForm.disable();
  }
  get idInput(){
    return this.userForm.get('id') ;
  }
  toggleForm() {
    this.isEdit = !this.isEdit;
    if(this.isEdit){
      this.userForm.enable();
      this.idInput?.disable();
      
    }else{
      this.userForm.disable();
      this.updateUser();
    }
  }
  updateUser(){
    let updatedUser : IUser = this.userForm.value as IUser ;
    
    if (this.equal(updatedUser,this.currentUser)){
      this.userService.onResponsefaild('not updated, no changes') ;
    }else{
      this.userService.updateUser(updatedUser).subscribe({
        next:(response)=>{
          this.currentUser = response ; 
          this.createform(this.currentUser) ;
          this.userService.onResponseSuccess('User Details',`updated successfully`) ;
        },error: (error: any) => {
          this.userService.onResponsefaild(error.message+'not updated') ;
        }
      });
    }
  }

  equal(user: IUser  ,other: IUser): boolean {
    return (
      user.id == other.id &&
      user.firstName == other.firstName &&
      user.lastName == other.lastName &&
      user.maidenName == other.maidenName &&
      user.age == other.age &&
      user.gender == other.gender &&
      user.email == other.email &&
      user.phone == other.phone &&
      user.username == other.username &&
      user.password == other.password &&
      user.birthDate == other.birthDate &&
      user.image == other.image &&
      user.bloodGroup == other.bloodGroup &&
      user.height == other.height &&
      user.weight == other.weight &&
      user.eyeColor == other.eyeColor &&
      user.hair.color == other.hair.color &&
      user.hair.type == other.hair.type &&
      user.domain == other.domain &&
      user.ip == other.ip &&
      user.address.address == other.address.address &&
      user.address.city == other.address.city &&
      user.address.coordinates.lat == other.address.coordinates.lat &&
      user.address.coordinates.lng == other.address.coordinates.lng &&
      user.address.postalCode == other.address.postalCode &&
      user.address.state == other.address.state &&
      user.macAddress == other.macAddress &&
      user.university == other.university &&
      user.company.address.address == other.company.address.address &&
      user.company.address.city == other.company.address.city &&
      user.company.address.coordinates.lat == other.company.address.coordinates.lat &&
      user.company.address.coordinates.lng == other.company.address.coordinates.lng &&
      user.company.address.postalCode == other.company.address.postalCode &&
      user.company.address.state == other.company.address.state &&
      user.company.department == other.company.department &&
      user.company.name == other.company.name &&
      user.company.title == other.company.title &&
      user.ein == other.ein &&
      user.ssn == other.ssn &&
      user.userAgent == other.userAgent &&
      user.bank.cardExpire == other.bank.cardExpire &&
      user.bank.cardNumber == other.bank.cardNumber &&
      user.bank.cardType == other.bank.cardType &&
      user.bank.currency == other.bank.currency &&
      user.bank.iban == other.bank.iban
    );
  }
}


