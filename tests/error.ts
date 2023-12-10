import 'mocha';
import { describe } from 'node:test';

import { expect } from 'chai';

import { YorClientError } from '../src';

void describe('Verify YorClientError', () => {
  expect(new YorClientError('error')).to.be.an.instanceOf(YorClientError);
});
