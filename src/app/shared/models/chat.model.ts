import { IModel } from './response.model';
import { UsersModel } from './users.model';
import { AppUtils } from '@core/helpers/utils';

export namespace ChatModel {
    export interface IMember extends IModel {
        isAdmin: boolean;
        user: UsersModel.IUser;
    }
    export interface IGroup extends IModel {
        title: string;
        logo: string;
    }

    export interface ICreateGroup extends IGroup {
        members: string[];
        title: string;
        logo: string;
    }

    export interface IConversation extends IModel {
        user1: UsersModel.IUser;
        user2: UsersModel.IUser;
        folder: string;
    }

    export class Message extends IModel {
        user: string;
        conversation: string;
        text: string;
        constructor(content: Partial<Message>) {
            super();
            this.user = content.user;
            this.conversation = content.conversation;
            this.text = content.text;
            this._id = content._id;
        }
    }

}