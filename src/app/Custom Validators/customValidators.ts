import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function patternValidator(mpattern : RegExp , ...description : string[]): ValidatorFn | null {
    return (control : AbstractControl)=>{
        let inputValue = control.value ;
        let validatorError = { 'Invalid': description[0] };
        return (!mpattern.test(inputValue)) ?  validatorError :null ; 
        
    }
  
}
export function notInValidator(range :string[]):ValidatorFn{
    return (control :AbstractControl)=>{
      let inputValue = control.value ; 
      let validatorError = {'ExistBefore':{'value':inputValue}};
      let foundEmail = range.includes(inputValue) ;
        return (foundEmail) ? validatorError :null ;
    }
}

// validator-cross-form
export const passwordMatch:ValidatorFn = (control:AbstractControl) : ValidationErrors| null =>{

    let passwordControl = control.get('password');   
    let passwordConfirmControl = control.get('confirmPassword');   
        if(!passwordControl || !passwordConfirmControl || !passwordConfirmControl.value ||!passwordControl.value)
            return null ;

    let validationError = {'unMatchedPassword':{'pass':passwordControl?.value , 'confirm':passwordConfirmControl?.value}}
    return (passwordConfirmControl?.value == passwordControl?.value)? null : validationError ;
}