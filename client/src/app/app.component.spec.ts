import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  Spectator,
  createComponentFactory,
  SpyObject,
} from '@ngneat/spectator';
import { ChatService } from './src/_shared/services/chat.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let chatServiceSpy: SpyObject<ChatService>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [ChatService],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();

    chatServiceSpy = spectator.inject(ChatService);
  });

  it('should subscribe to retrieve new messages', () => {
    // given
    chatServiceSpy.getNewMessage$.and.returnValue(of('new message'));

    // when
    spectator.detectChanges();

    // then
    expect(chatServiceSpy.getNewMessage$).toHaveBeenCalled();
  });

  it('should add a message on message list', fakeAsync(() => {
    // given
    chatServiceSpy.getNewMessage$.and.returnValue(of('new message'));

    // when
    spectator.detectChanges();
    tick();

    // then
    const expectedMessageList: string[] = ['new message'];
    expect(spectator.component.messageList).toEqual(expectedMessageList);
  }));

  it('should Not add a empty message on message list', fakeAsync(() => {
    // given
    chatServiceSpy.getNewMessage$.and.returnValue(of(''));

    // when
    spectator.detectChanges();
    tick();

    // then
    const expectedMessageList: string[] = [];
    expect(spectator.component.messageList).toEqual(expectedMessageList);
  }));

  it('should send a message through the message channel', () => {
    // given
    spectator.component.newMessage = 'brand new messge';

    // when
    spectator.component.sendMessage();

    // then
    expect(chatServiceSpy.sendMessage).toHaveBeenCalledOnceWith(
      'brand new messge'
    );
    expect(spectator.component.newMessage).toBe('');
  });
});
