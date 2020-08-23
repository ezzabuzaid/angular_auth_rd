export namespace Constants {
  export class Application {
    static readonly TOKEN_KEY = 'token';
    static readonly APPLICATION_NAME = 'Angular Buildozer';
    static readonly ONE_TIME = 'oneTime';
    static readonly REFRESH_TOKEN_KEY = 'refresh_token';
    static readonly DEVICE_UUID = 'x-device-uuid';
    static readonly REDIRECT_URL = 'redirectUrl';
  }

  export class Routing {
    static readonly FORGOT_PASSWORD = {
      withSlash: '/portal/forgot',
      withoutSlash: 'forgot'
    };
    static readonly LOGIN = {
      withSlash: '/portal/login',
      withoutSlash: 'login'
    };

    static readonly REGISTER = {
      withSlash: '/portal/login',
      withoutSlash: 'register'
    };

    static readonly USERS = {
      withSlash: '/users',
      withoutSlash: 'users'
    };
    static readonly NOT_FOUND = {
      withSlash: '/404',
      withoutSlash: '404'
    };
    static Portal = {
      withSlash: '/portal',
      withoutSlash: 'portal',
    };
    static SESSIONS = {
      withSlash: '/sessions',
      withoutSlash: 'sessions',
    };
    static DEFAULT = Routing.USERS;
  }

  export class API {

    static readonly PORTAL = {
      base: 'portal',
      get refreshtoken() {
        return this.base + '/refreshtoken';
      },
      get SEND_PINCODE() {
        return this.base + '/sendpincode/';
      },
      get CHECK_PINCODE() {
        return this.base + '/checkpincode/';
      },
      get RESET_PASSWORD() {
        return this.base + '/resetpassword/';
      },
      get sendverificationemail() {
        return this.base + '/sendverificationemail';
      },
      get ACCOUNT_VERIFIED() {
        return this.base + '/checkaccountverification';
      },
      get login() {
        return this.base + '/login';
      },
      get logout() {
        return this.base + '/logout';
      }
    };
    static readonly USERS = {
      base: 'users',
      get search() {
        return this.base + '/search';
      }
    };
    static readonly SESSIONS = {
      base: 'sessions',
      get deactivate() {
        return this.base + '/deactivate';
      }
    };
  }

}
