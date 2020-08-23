import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplicationUser } from '@core/application-user';
import { Constants } from '@core/constants';
import { AppUtils } from '@core/helpers/utils';
import { EFieldType, Field, Form, SubmitEvent } from '@ezzabuzaid/ngx-form-factory';
import { PortalModel } from '@shared/models';
import { AllEqual, Between, ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase, EqualTo } from '@shared/validators';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  host: {
    class: 'bg--primary d-block h-100'
  }
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  verificationForm = new Form<PortalModel.IForgotPassword>({
    username: new Field({
      label: 'Username',
      autocomplete: 'username',
      validatorOrOpts: Validators.required
    }),
    fullName: new Field({
      label: 'Full name',
      autocomplete: 'given-name',
      validatorOrOpts: Validators.required
    }),
  });

  sendPincodeForm = new Form<{ email: string, mobile: string }>({
    email: new Field({
      type: EFieldType.EMAIL,
      autocomplete: 'email',
      label: 'Email',
      validatorOrOpts: [Validators.required, Validators.email],
    }),
    mobile: new Field({
      type: EFieldType.TEL,
      autocomplete: 'mobile',
    })
  });

  resetPasswordForm = new Form<{ password: string, confirmPassword: string }>({
    password: new Field({
      type: EFieldType.PASSWORD,
      label: 'Passowrd',
      autocomplete: 'off',
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
    confirmPassword: new Field({
      type: EFieldType.PASSWORD,
      label: 'Confirm password',
      autocomplete: 'off',
      validatorOrOpts: [
        Validators.required,
        EqualTo('password')
      ]
    })
  }, {
    validators: AllEqual('password', 'confirmPassword')
  });

  accountVerificationResponse: PortalModel.AccountVerifiedResponse;
  pincode = null;
  steps = Array.from({ length: 4 });
  subscription = new Subject();

  constructor(
    private applicationUser: ApplicationUser,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.goToStep(1);
    this.resetPasswordForm.valueChanges
      .pipe(takeUntil(this.subscription))
      .subscribe(() => {
        this.resetPasswordForm.updateValueAndValidity({ emitEvent: false, onlySelf: false });
      });
  }

  checkUser(event: SubmitEvent) {
    if (event.valid) {
      this.applicationUser.checkIfAccountIsExist(event.value)
        .subscribe((response) => {
          this.nextStep();
          this.accountVerificationResponse = response;
        });
    }
  }

  sendPincode(event: SubmitEvent) {
    this.applicationUser
      .sendPincode({
        type: this.sendPincodeType,
        id: this.accountVerificationResponse.id,
        ...event.value
      })
      .subscribe(() => {
        this.nextStep();
        console.log(this.sendPincodeForm.value);
      });
  }

  get sendPincodeType() {
    return this.sendPincodeForm.get('email') ? 'email' : 'sms';
  }

  checkPincode(pincode: string) {
    this.pincode = pincode;
    this.applicationUser.checkPincode({
      pincode,
      id: this.accountVerificationResponse.id
    })
      .subscribe(() => {
        this.nextStep();
      });
  }

  resetPassword(event: SubmitEvent) {
    this.applicationUser.resetPassword({
      id: this.accountVerificationResponse.id,
      password: event.value.password,
      pincode: this.pincode
    })
      .pipe(finalize(() => {
        this.router.navigate([Constants.Routing.LOGIN.withSlash]);
      }))
      .subscribe(() => {
        this.snackbar.open('Password reset successfully', 'Close', {
          duration: Number.MAX_VALUE
        });
      });
  }

  goToStep(index: number) {
    this.steps.fill(false);
    this.sendPincodeForm.reset();
    this.verificationForm.reset();
    this.steps[index - 1] = true;
  }

  nextStep() {
    this.goToStep(this.steps.indexOf(true) + 2);
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.subscription);
  }

}
