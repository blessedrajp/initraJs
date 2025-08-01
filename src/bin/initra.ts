#!/usr/bin/env node

import { Command } from 'commander';
import { initProject } from '../commands/init.js';
import { generateComponent } from '../commands/generate-component.js';
import { generateRoute } from '../commands/generate-route.js';
import { generateService } from '../commands/generate-service.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('initrajs')
  .description('⚡ InitraJS - Scaffold fullstack apps')
  .version('1.0.5');

// Initialize project command
program
  .command('init')
  .description('Initialize a project from a template')
  .action(() => initProject({}));

// Generate component command
program
  .command('component <name>')
  .alias('c')
  .description('Generate a new component')
  .option('--server', 'Generate server-side component (SSR)')
  .option('--client', 'Generate client-side component (CSR)')
  .option('--layout', 'Generate layout component with header/footer')
  .option('--props <props>', 'Component props (comma-separated)')
  .option('--path <path>', 'Custom path for component')
  .action((name, options) => {
    generateComponent(name, options);
  });

// Generate route command
program
  .command('route <name>')
  .alias('r')
  .description('Generate a new route')
  .option('--api', 'Generate API route')
  .option('--page', 'Generate page route (default)')
  .option('--path <path>', 'Custom path for route')
  .option('--method <method>', 'HTTP method for API route (GET, POST, PUT, DELETE)')
  .action((name, options) => {
    generateRoute(name, options);
  });

// Generate service command
program
  .command('service <name>')
  .alias('s')
  .description('Generate a new service')
  .option('--client', 'Generate client service')
  .option('--server', 'Generate server service')
  .option('--path <path>', 'Custom path for service')
  .action((name, options) => {
    generateService(name, options);
  });

// Help command
program
  .command('help')
  .description('Show help and examples')
  .action(() => {
    console.log(chalk.cyan.bold('\n⚡ InitraJS CLI Examples:\n'));
    
    console.log(chalk.yellow('Initialize Project:'));
    console.log('  npx initrajs init\n');
    
    console.log(chalk.yellow('Generate Components:'));
    console.log('  initrajs c Header');
    console.log('  initrajs c Button --props "text,onClick,variant"');
    console.log('  initrajs c Layout --layout');
    console.log('  initrajs c ProductCard --server');
    console.log('  initrajs c UserModal --client --props "isOpen,onClose"\n');
    
    console.log(chalk.yellow('Generate Routes:'));
    console.log('  initrajs r dashboard');
    console.log('  initrajs r users --api --method POST');
    console.log('  initrajs r products --path "shop"\n');
    
    console.log(chalk.yellow('Generate Services:'));
    console.log('  initrajs s auth --client');
    console.log('  initrajs s api --server');
    console.log('  initrajs s database --server --path "lib"\n');
  });

program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}