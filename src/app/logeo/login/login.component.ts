import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserAction } from 'src/app/redux/app.actions';
import { Store } from '@ngrx/store';
import { USER } from 'src/app/redux/interfax/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public myForm_login: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private _userService: UserService,
    private _authSrvice: AuthService,
    private _store: Store<USER>,
    private router: Router,
  ) {
    this.myForm_login = this.create_form();
    if (this._authSrvice.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() { }

  create_form() {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      ip: ['', Validators.required],
      acceso: ['celular', Validators.required],
    });
  }

  submit_login() {
    let data = this.myForm_login.value;
    this._userService.login(data).subscribe(
      (response: any) => {
        if(response.success){
          localStorage.setItem('user', JSON.stringify(response.data));
          let accion:any = new UserAction(response.data, 'post');
          this._store.dispatch(accion);
          this.router.navigate(['home']);
        }

      });

  }

}
