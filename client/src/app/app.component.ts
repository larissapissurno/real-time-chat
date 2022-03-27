import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil, tap } from 'rxjs';
import { ChatService } from './src/_shared/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  newMessage: string = '';
  messageList: string[] = [];

  private readonly ngUnsubscribe: Subject<void> = new Subject();

  constructor(private readonly chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService
      .getNewMessage$()
      .pipe(
        filter((message) => !!message),
        tap((message) => this.messageList.push(message))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
