import 'mocha';
import { describe, it } from 'node:test';

import { expect } from 'chai';

import { Channel, CommandContext, Member, User, YorClient } from '../../src';
import { commandInteraction } from '../objects/interactions';

void describe('Genereate a mocked CommandContext', () => {
  const client = new YorClient({
    token: 'test',
    application: {
      id: 'test',
      publicKey: 'test',
    },
  });

  const context = new CommandContext(client.api, commandInteraction);

  void it('should be an instance of CommandContext', () => {
    expect(context).to.be.an.instanceOf(CommandContext);
  });

  void it('properties are accessible', () => {
    expect(context.channel).to.be.instanceOf(Channel);
    expect(context.id).to.be.a('string');
    expect(context.token).to.be.a('string');
    expect(context.user).to.be.instanceOf(User);
    expect(context.member).to.be.instanceOf(Member);

    expect(context.deferred).to.be.a('boolean');
    expect(context.replied).to.be.a('boolean');

    expect(context.raw).to.equal(commandInteraction);
  });
});
