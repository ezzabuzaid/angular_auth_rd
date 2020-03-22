import { Component, OnInit, HostListener } from '@angular/core';
import { ChatCardManager } from '../chat-card.manager';
import { IChatCard } from '../index';
import { UserCardComponent } from '../conversation-chat-card/conversation-chat-card.component';
import { UsersModel } from '@shared/models';

@Component({
  selector: 'app-chat-floating-button',
  templateUrl: './chat-floating-button.component.html',
  styleUrls: ['./chat-floating-button.component.scss']
})
export class ChatFloatingButtonComponent implements OnInit, IChatCard<UsersModel.IUser>{

  data: UsersModel.IUser;
  id: string;

  constructor(
    private chatCardManager: ChatCardManager
  ) { }

  ngOnInit(): void {
  }

  @HostListener('click') floatingButton() {
    this.chatCardManager.toogleCard(UserCardComponent, this.data, this.id);
  }

}
