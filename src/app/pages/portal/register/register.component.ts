
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplicationUser } from '@core/application-user';
import { Constants } from '@core/constants';
import { EFieldType, Field, Form, SelectField, SelectOption, SubmitEvent } from '@ezzabuzaid/ngx-form-factory';
import { PortalModel } from '@shared/models';
import { Between, ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase } from '@shared/validators';
import { merge, Observable, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form = new Form<PortalModel.IRegister>({
    username: new Field({
      label: 'Username',
      autocomplete: 'username',
      validatorOrOpts: Validators.required
    }),
    email: new Field({
      type: EFieldType.EMAIL,
      autocomplete: 'email',
      label: 'Email',
      validatorOrOpts: [Validators.required, Validators.email],
    }),
    password: new Field({
      type: EFieldType.PASSWORD,
      label: 'Passowrd',
      autocomplete: 'new-password',
      hint: 'at least 8 character',
      validatorOrOpts: [
        Validators.required,
        Between(8, 16),
        ContainsUppercase(),
        ContainsLowercase(),
        ContainsSpecialCharacter(),
        ContainsNumber()
      ]
    }),
    mobile: new Field({
      type: EFieldType.TEL,
      autocomplete: 'mobile',
      label: 'Mobile',
      value: '792807794',
      validatorOrOpts: Validators.required
    }),
    fullName: new Field({
      label: 'Fullname',
      section: 'General',
      validatorOrOpts: Validators.required,
    }),
    role: new SelectField({
      label: 'Gender',
      section: 'General',
      options: of(Object.entries(PortalModel.Roles).map(([key, value]) => new SelectOption(value, key))),
      validatorOrOpts: Validators.required
    }),
  });


  $passwordVisible: Observable<boolean> = null;
  constructor(
    private readonly router: Router,
    private readonly applicationUser: ApplicationUser,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.$passwordVisible = merge(
      this.form.get('password').on('focus').pipe(mapTo(true)),
      this.form.get('password').on('blur').pipe(mapTo(false))
    );
  }

  register({ valid, value }: SubmitEvent<PortalModel.IRegister>) {
    if (valid) {
      this.applicationUser.register(value)
        .subscribe(({ message }) => {
          this.snackbar.open(message, 'Close', { duration: Number.MAX_VALUE });
          this.router.navigate([Constants.Routing.LOGIN.withSlash]);
        });
    }
  }


}


