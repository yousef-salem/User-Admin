import { CommonModule } from "@angular/common";
import { Component, Inject, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { notInValidator, passwordMatch, patternValidator } from "src/app/Custom Validators/customValidators";
import { IUser } from "src/app/Model/iuser";

export interface DialogData {
    List : IUser[]
  }
  
  @Component({
    selector: 'dialog-add-user',
    templateUrl: 'dialog-add-user.html',
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule,MatExpansionModule,
          MatIconModule, MatButtonModule,CommonModule, MatFormFieldModule ,ReactiveFormsModule,MatStepperModule,
          MatSelectModule],
  })
  export class DialogAddUser {
    @ViewChild(MatAccordion) accordion!: MatAccordion;
    form : FormGroup ;
    isEditable = false;
    constructor(
      public dialogRef: MatDialogRef<DialogAddUser>
      ,@Inject(MAT_DIALOG_DATA) public data: DialogData
      ,private fb: FormBuilder) {
        let nameExp :RegExp = /^[A-Za-z]{3,15}$/ ;
        let phoneExp :RegExp = /^\+\d{1,4}\d{10}$/ ;
        let emailExp :RegExp = /^[A-Za-z0-9_]+@[A-Za-z0-9]+\.[A-Za-z]{2,4}(?:\.[A-Za-z]{2,4})?$/ ;
        let passwordExp :RegExp =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;
      this.form = this.fb.group({
        id:[``],
        firstName: [``,[Validators.required, patternValidator(nameExp , "at least 3 letters and max 15 letter")]],
        lastName: [``,[Validators.required, patternValidator(nameExp , "at least 3 letters and max 15 letter")]],
        maidenName: [``,[Validators.required, patternValidator(nameExp ,"at least 3 letters and max 15 letter")]],
        age: ['', [Validators.required, Validators.min(18), Validators.max(50)]],
        gender: [``,[Validators.required]],
        email: [``,[Validators.required
                  , patternValidator(emailExp, "should in form : example@example.example")
                  ,notInValidator(data.List.map(it=>it.email))]
                ],
        phone: [``,[Validators.required
                  , patternValidator(phoneExp,'be in the format "+x-xxx-xxx-xxxx,"')
                  ,notInValidator(data.List.map(it=>it.phone))]],
        username: [``],
        password: [``,[Validators.required
                      , patternValidator( passwordExp , "a password to have at least one letter, one digit, and be a minimum of 8 characters")]
                  ],
        confirmPassword:[''],
        birthDate: [``],
        image: [``],
        bloodGroup: [``],
        height: [``],
        weight: [``],
        eyeColor: [``],
        hair: this.fb.group({
          color: [``],
          type: [``]
        }),
        domain: [``],
        ip: [``],
        address: this.fb.group({
          address: [``],
          city: [``],
          coordinates: this.fb.group({
            lat: [``],
            lng: [``]
          }),
          postalCode: [``],
          state: [``]
        }),
        macAddress: [``],
        university: [``],
        bank: this.fb.group({
          cardExpire: [``],
          cardNumber: [``],
          cardType: [``],
          currency: [``],
          iban: [``]
        }),
        company: this.fb.group({
          address: this.fb.group({
            address: [``],
            city: [``],
            'coordinates': this.fb.group({
              lat: [``],
              lng: [``]
            }),
            postalCode: [``],
            state: [``]
          }),
          department: [``],
          name: [``],
          title: [``]
        }),
        ein: [``],
        ssn: [``],
        userAgent: [``],
      },{validators: passwordMatch});
    }
    
    get getFormValue():IUser{
      return this.form.value as IUser ;
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }