#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from '../commands/init.js';
import { generate } from '../commands/generate.js';



const program = new Command();

program
  .name('genzo')
  .description('⚡ Genzo - Scaffold fullstack apps in seconds')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a project from a template')
  .action(initProject);

// Generate command
program
  .command('generate <type> <name>')
  .alias('g')
  .description('Generate code components')
  .option('-f, --framework <framework>', 'Specify framework (react, next, node)', 'react')
  .option('--client', 'Generate client-side code')
  .option('--server', 'Generate server-side code')
  .option('--props <props>', 'Comma-separated list of props')
  .option('--path <path>', 'Subfolder path')
  .option('--ts, --typescript', 'Generate TypeScript files')
  .option('--js, --javascript', 'Generate JavaScript files')
  .action(generate);

program.parse(process.argv);
