import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApplicationUser } from '@core/application-user';
import { Constants } from '@core/constants';
import { TokenHelper } from '@core/helpers/token';
import { ListEntityQuery, ListEntityResponse, PlainQuery } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private readonly http: HttpClient,
        private readonly tokenService: TokenHelper
    ) { }

    public getUsers(query: ListEntityQuery) {
        const plainQuery = new PlainQuery(query);
        return this.http.get<ListEntityResponse<IApplicationUser>>(`${ Constants.API.USERS.base }?${ plainQuery.asString }`);
    }

    public currentUser() {
        return this.http.get<IApplicationUser>(`${ Constants.API.USERS.base }/${ this.tokenService.decodedToken.id }`);
    }

}

