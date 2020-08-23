export namespace PortalModel {
    export class Roles {
        static SUPERADMIN = 'SUPERADMIN';
        static ADMIN = 'ADMIN';
        static CLIENT = 'CLIENT';
        static CUSTOMER = 'CUSTOMER';
    }

    export interface IRegister {
        role: Roles;
        password: string;
        mobile: string;
        username: string;
        email: string;
        fullName: string;
    }
    export class IProfile {
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        nationality: string;
        placeOfBirth: string;
        dateOfBrith: Date;
        gender: string;
        occupation: string;
    }
    export interface IForgotPassword {
        username: string;
        fullName: string;
    }
    export interface ILoginRequest {
        username: string;
        password: string;
    }
    export interface ITokenClaim {
        role: string;
        id: string;
        verified: boolean;
    }
    export class RefreshToken {
        constructor(
            public token: string,
            public refreshToken: string,
        ) { }
    }

    export interface ILoginResponse {
        refreshToken: string;
        token: string;
    }

    export interface AccountVerifiedResponse {
        emailVerified: boolean;
        mobileVerified: boolean;
        id: string;
    }

    export interface ISendPincode {
        type: 'email' | 'sms';
        mobile?: string;
        email?: string;
        id: string;
    }

    export interface ICheckPincode {
        pincode: string;
        id: string;
    }

    export interface IResetPassword extends ICheckPincode {
        password: string;
    }

}
