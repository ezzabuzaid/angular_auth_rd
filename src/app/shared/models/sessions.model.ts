import { IApplicationUser } from '@core/application-user';
import { BaseModel } from './response.model';

export namespace SessionsModel {
    export interface ISession extends BaseModel {
        active: boolean;
        user: IApplicationUser;
        device_uuid: string;
    }

}
