#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from '../commands/init.js';

const program = new Command();

program
  .name('initrajs')
  .description('⚡ Blazeup - Scaffold fullstack apps')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a project from a template')
  .action(() => initProject({}));

program.parse(process.argv);
