import 'mocha';
import { describe, it } from 'node:test';

import { expect } from 'chai';

import { WebhookClient } from '../src';

void describe('Genereate a mocked WebhookClient', () => {
  const webhook = new WebhookClient({
    id: 'test',
    token: 'test',
  });

  void it('should be an instance of WebhookClient', () => {
    expect(webhook).to.be.an.instanceOf(WebhookClient);
  });

  void it('properties are accessible', () => {
    expect(webhook.id).to.equal('test');
    expect(webhook.token).to.equal('test');
  });
});
