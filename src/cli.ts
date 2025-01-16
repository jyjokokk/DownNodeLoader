import { Command } from 'commander';
import packageJson from '../package.json';

const version = packageJson.version;

const program = new Command();

export function hauskaa(arg = 'world'): string {
  return arg.toUpperCase();
}

program
  .version(version)
  .name('dnl')
  .option('-d, --debug', 'enables verbose logging', false)
  .option('-w, --watch', 'watch for file changes', true)
  .parse(process.argv);

// Function code for CLI goes here
