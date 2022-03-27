import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  let spectator: SpectatorService<ChatService>;
  const createService = createServiceFactory(ChatService);

  beforeEach(() => {
    spectator = createService();

    spectator.service.sendMessage('new message');
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should send message', () => {
    // given
    let emitMessagespy = spyOn(
      spectator.service.socket,
      'emit'
    ).and.callThrough();

    // when
    spectator.service.sendMessage('hello');

    // then
    expect(emitMessagespy).toHaveBeenCalledOnceWith('message', 'hello');
  });

  it('should get new message', (done: DoneFn) => {
    // when
    spectator.service.message$.next('new message');
    // then
    spectator.service.getNewMessage$().subscribe((value) => {
      expect(value).toContain('new message');

      done();
    });

    // spectator.service.sendMessage('new message');
  });
});
