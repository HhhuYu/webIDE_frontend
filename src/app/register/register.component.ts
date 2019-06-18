import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

import { FileHandlerService } from "./../../services/file-handler/file-handler.service"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private fileService: FileHandlerService
  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.email, Validators.required]],
          username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = '/login';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.register(this.f.email.value ,this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  if(data.message === "success"){
                    this.fileService.generateUserPath(this.f.username.value)
                    .subscribe(data => {});
                    this.router.navigate([this.returnUrl]);
                  }
                  else {
                    this.error = data.message;
                    this.loading = false;
                  }
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

}
