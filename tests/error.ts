import 'mocha';
import { describe, it } from 'node:test';

import { expect } from 'chai';

import { YorClientError } from '../src';

void describe('Verify YorClientError', () => {
  void it('should be an instance of YorClientError', () => {
    expect(new YorClientError('error')).to.be.an.instanceOf(YorClientError);
  });
});
