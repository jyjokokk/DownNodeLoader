// import { resolve } from 'path';
import { hauskaa } from './cli';

describe('cli', () => {
  it('should have hauskaa', () => {
    const r = hauskaa('world');
    expect(r).toBe('WORLD');
  });

  // it('should exist', () => {
  //   const cli = require(resolve(__dirname, './cli'));

  //   expect(cli).toBeTruthy();
  // });
});
