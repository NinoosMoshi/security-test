import { AuthenticationService } from './../../../services/security/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpaceValidator } from 'src/app/model/SpaceValidator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formParentGroup : FormGroup;


  constructor(private formChildGroup: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.mySignupForm();
  }

  mySignupForm(){
    this.formParentGroup = this.formChildGroup.group({
      user: this.formChildGroup.group({
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('',[Validators.required,
                                   SpaceValidator.onlyContainSpace,
                                   Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ]),
        password: new FormControl('', [Validators.required])
      })

     })
  }


  get name(){
    return this.formParentGroup.get('user.name')
  }

  get username(){
    return this.formParentGroup.get('user.username')
  }


  get email(){
    return this.formParentGroup.get('user.email')
  }

  get password(){
    return this.formParentGroup.get('user.password')
  }


  signup(){
    if(this.formParentGroup.invalid){
      this.formParentGroup.markAllAsTouched()
      return;
   }

    this.spinner.show();
    this.authenticationService.createUser(
      this.formParentGroup.controls['user'].value.name,
      this.formParentGroup.controls['user'].value.username,
      this.formParentGroup.controls['user'].value.email,
      this.formParentGroup.controls['user'].value.password
    ).subscribe({
      next:response =>{
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
        if(response.result == 1){
          this.toastr.success('Success', 'You Register Successfully');
          this.router.navigateByUrl("/login")
        }else{
          // alert("This Email is Exists")
          this.toastr.error('This Email is Exists')
        };
      },
      error:err =>{
        // alert('there is something wrong');
        this.toastr.error('there is something wrong')
        this.spinner.hide();
      }
    })


  }


}
