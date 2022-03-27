import { TestBed } from '@angular/core/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let spectator: SpectatorService<ChatService>;
  const createService = createServiceFactory(ChatService);

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should send message', () => {
    // given
    // when
    // then
  });

  it('should get new message');
});
