#!/usr/bin/env node
// src/cli/index.ts
import chalk from 'chalk'; // Ensure chalk is imported at the top
import { Command } from 'commander';
import { initProject } from '../commands/init.js';
import { generateComponent } from '../commands/generate-component.js';
import { generateBackendFile } from '../commands/generate-backend.js';
import { FileType } from '../utils/backend-utils.js';
import { generatePage } from '../commands/generate-page.js';

const program = new Command();

program
  .name('initrajs')
  .description('⚡ InitraJS - Scaffold fullstack apps with ease')
  .version('1.0.9');

// Initialize project command
program
  .command('init')
  .description('Initialize a new project from a template')
  .action(() => initProject({}));

// Generate component command
program
  .command('component <name>')
  .alias('c')
  .description('Generate a new React component')
  .option('--server', 'Generate server-side component (SSR)')
  .option('--client', 'Generate client-side component (CSR)')
  .option('--layout', 'Generate layout component with header/footer')
  .option('--props <props>', 'Component props (comma-separated)')
  .option('--path <path>', 'Custom path for component')
  .option('--ts', 'Generate TypeScript component (.tsx)')
  .option('--js', 'Generate JavaScript component (.jsx)')
  .option('--css', 'Generate CSS/SCSS file along with component')
  .option('--test', 'Generate test file for component')
  .option('--story', 'Generate Storybook story file')
  .action((name, options) => {
    generateComponent(name, options);
  });

// Generate page command
program
  .command('page <name>')
  .alias('p')
  .description('Generate a new page component')
  .option('--react', 'Generate React page component (default)')
  .option('--next', 'Generate Next.js page with folder structure')
  .option('--ts', 'Generate TypeScript page (.tsx)')
  .option('--js', 'Generate JavaScript page (.jsx)')
  .option('--css', 'Generate CSS/SCSS file along with page')
  .option('--test', 'Generate test file for page')
  .option('--path <path>', 'Custom path for page')
  .action((name, options) => {
    generatePage(name, options);
  });

// Generate API (all backend files including routes)
// Generate API (all backend files including routes)
program
  .command('api <name>')
  .description('Generate API with controller, service, model, DTO, and routes')
  .option('-a, --all', 'Generate all files (default)', true)
  .option('--ts', 'Generate TypeScript files (default)')
  .option('--js', 'Generate JavaScript files')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    generateBackendFile('api', name, fileType, options);
  });

// Generate Routes
program
  .command('route <name>')
  .alias('r')
  .description('Generate a route file')
  .option('--ts', 'Generate TypeScript file (default)')
  .option('--js', 'Generate JavaScript file')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    generateBackendFile('route', name, fileType, options);
  });

// Generate Model
program
  .command('model <name>')
  .alias('m')
  .description('Generate a model file')
  .option('--ts', 'Generate TypeScript file (default)')
  .option('--js', 'Generate JavaScript file')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    generateBackendFile('model', name, fileType, options);
  });

// Generate Controller
program
  .command('controller <name>')
  .alias('ctrl')
  .description('Generate a controller file')
  .option('--ts', 'Generate TypeScript file (default)')
  .option('--js', 'Generate JavaScript file')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    generateBackendFile('controller', name, fileType, options);
  });

// Generate Service
program
  .command('service <name>')
  .alias('svc')
  .description('Generate a service file')
  .option('--ts', 'Generate TypeScript file (default)')
  .option('--js', 'Generate JavaScript file')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    generateBackendFile('service', name, fileType, options);
  });

// Generate DTO
program
  .command('dto <name>')
  .description('Generate a DTO (Data Transfer Object) file')
  .option('--ts', 'Generate TypeScript file (default)')
  .option('--js', 'Generate JavaScript file')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    generateBackendFile('dto', name, fileType, options);
  });

// Generate Middleware
program
  .command('middleware <name>')
  .alias('mw')
  .description('Generate a middleware file')
  .option('--ts', 'Generate TypeScript file (default)')
  .option('--js', 'Generate JavaScript file')
  .option('--jwt', 'Generate JWT authentication middleware')
  .action((name, options) => {
    const fileType: FileType = options.js ? 'js' : 'ts';  // Changed: default to 'ts'
    // Pass the middleware type in options
    const backendOptions = {
      ...options,
      middlewareType: options.jwt ? 'jwt' as const : 'default' as const
    };
    generateBackendFile('middleware', name, fileType, backendOptions);
  });

  // help 
program
  .command('help')
  .description('Show help and examples for InitraJS CLI')
  .action(() => {
    console.log(chalk.cyan.bold('\n⚡ InitraJS CLI Usage Examples:\n'));

    // --- Frontend Help ---
    console.log(chalk.magenta.bold('Frontend (React Components & Pages):\n'));

    console.log(chalk.yellow('Initialize Project:'));
    console.log('  npx initrajs init\n');

    console.log(chalk.yellow('Generate Components:'));
    console.log('  initrajs c Header');
    console.log('  initrajs c Button --props "text,onClick,variant" --css --test');
    console.log('  initrajs c Layout --layout --ts');
    console.log('  initrajs c ProductCard --server --css');
    console.log('  initrajs c UserModal --client --props "isOpen,onClose" --js --test\n');

    console.log(chalk.yellow('Generate Pages:'));
    console.log('  initrajs page Home --react --css --test');
    console.log('  initrajs page Dashboard --next --ts --css');
    console.log('  initrajs page Profile --next --path "app/user" --test');
    console.log('  initrajs page About --react --js --css --test\n');

    // --- Backend Help ---
    console.log(chalk.magenta.bold('Backend (API, Models, Controllers, Services, Routes, Middleware):\n'));

    console.log(chalk.yellow('Generate Full API (Controller, Service, Model, DTO, Routes):'));
    console.log('  initrajs api User');
    console.log('  initrajs api Product --ts\n');

    console.log(chalk.yellow('Generate Routes:'));
    console.log('  initrajs route User');
    console.log('  initrajs route ProductRoutes --ts\n');

    console.log(chalk.yellow('Generate Controller:'));
    console.log('  initrajs ctrl User');
    console.log('  initrajs controller Product --ts\n');

    console.log(chalk.yellow('Generate Service:'));
    console.log('  initrajs svc User');
    console.log('  initrajs service ProductService --ts\n');

    console.log(chalk.yellow('Generate Model:'));
    console.log('  initrajs m User');
    console.log('  initrajs model ProductModel --ts\n');

    console.log(chalk.yellow('Generate Middleware:'));
    console.log('  initrajs mw AuthMiddleware');
    console.log('  initrajs middleware JwtAuth --ts --jwt\n');

    console.log(chalk.green.bold('📝 Additional Options:\n'));
    console.log('  --css    Generate CSS/SCSS file');
    console.log('  --test   Generate test file');
    console.log('  --story  Generate Storybook story (components only)');
    console.log('  --path   Specify custom path');
    console.log('  --ts     Generate TypeScript files');
    console.log('  --js     Generate JavaScript files\n');

    console.log(chalk.cyan.bold('\n🔗 For more, visit: https://github.com/your-repo/initrajs-cli\n'));
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}