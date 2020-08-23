# Authentication/Authorization in Web Application

## Prolog

After reading a lot about security, authentication, authorization For restfull Web API, I decided to code what I read so anyone can benefit from and to spread my knowledge.

the code and documentation still under development. 

## Getting Started

1. Clone the project.
2. run `npm install`
3. run `npm run start:ssr` or `npm start`

## What's There

1. Login
2. Refresh Token
3. Signup
4. Forget/Reset Password
5. Two Factor Authentication
6. Single Sign-On
7. Session Management

### Rules

* Login
    - Will be using username and password
    - The response should consist of access_token and refresh_token
    - access_token claims will be {ITokenClaim}
    - an email will be sent after each successful login attempt
    - Each login should have a session
    - The session is a set of information about the client that used to login with
    - A user will have only 3 sessions which means in order to log in after that he needs to logout from a device
    - logout will deactivate the login session, thus the active session number will decrease.

* Signup
    - A user will enter at least a username, password, email, mobile.
    - Account uniqueness should be based on email, username, mobile.
    - The password should have strict validation rules.
    - The client should validate each field before calling the server.
    - an email must be sent after successful creation to verify the email
    - the email should include a link with token
    - the token expiry date should be less than 5 min

* Verification
    - The user somehow will receive a link with token
    - the link will request the server to update the email verification status
    - if the token is well, then the update should be done and redirect to website login page
    - otherwise, the server must reject the request

### Explanation

* **Login**
1. A user will send his credentials (username and password) to the server
2. server looks up to the database to check if there's a user with that username
3. server will reject the request if there's no match
4. if there's a match, the server will check the equality of the entered password and the password from the database and reject the request if not the same hash
5. if they're equal then the server will ask the database to get the count of the active sessions for this valid-user
6. if the active sessions count is more than the maximum then the server will reject the request
7. if they are below the count, the server creates a session to label the login, send an email confirming the user that a login attempt happened successfully and send back {RefreshToken} DTO
8. the client will save the token to use in subsequent requests
9. the client will navigate the user to the Dashboard page

``` typescript
export class RefreshToken {
    public token: string;
    public refreshToken: string;
}
```

* **Create Account**

1. user fill up his information which mainly is {CreateUserDto} that will adhere to the following rules
    - username, email, mobile must be unique otherwise the server will reject the request
    - password should be between 8 and 16 characters and have at least
        * one uppercase character
        * one lowercase character
        * one special character
        * one number
    - the role should be one of the specified Roles attributes
2. after passing the above criteria, the server will send the user verification email contains a link that includes the token as query and will return verification message to the client to show it up
3. the user will click on that link to verify his identity, the server will decode the token and check that is valid and not expired
4. if the token is well, then the `emailVerified` attribute will be updated and the user will be redirected to the website

``` typescript
class CreateUserDto {
    @IsString()
    public username: string = null;

    @IsString()
    public password: string = null;

    @IsEmail()
    public email: string = null;

    @IsString()
    public mobile: string = null;

    @IsString()
    public fullName: string = null;

    @IsIn(Object.values(Roles))
    public role: Roles = null;
}

export class Roles {
    static SUPERADMIN = 'SUPERADMIN';
    static ADMIN = 'ADMIN';
    static CLIENT = 'CLIENT';
    static CUSTOMER = 'CUSTOMER';
}

```

please note that the verification step is not required to log in and it's possible to make it, but as for the implementation it's not and the user can verify after then.
you can also limit the features for unverified users

the frontend will also perform each verification step stated above and will show message corresponds to each rule on an error and will navigate to the login page after creating the account

the token claims will be as following, the verified attribute will only be true after the user verify his email and mobile

``` typescript
export interface IClaim {

    id: PrimaryKey;
    readonly iat?: number;
    readonly exp?: number;

}

export interface I
