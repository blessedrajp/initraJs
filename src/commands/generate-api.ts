
// import path from 'path';
// import chalk from 'chalk';
// import {
//   validateName,
//   kebabToPascal,
//   kebabToCamel,
//   getBackendPaths,
//   ensureDirectories,
//   BackendOptions
// } from '../utils/backend-utils.js';
// import {
//   getControllerTemplate,
//   getServiceTemplate,
//   getModelTemplate,
//   getDTOTemplate,
//   getRouteTemplate
// } from '../templates/backend/backend-ts-templates.js';

// export const generateAPI = async (
//   name: string,
//   options: BackendOptions
// ): Promise<void> => {
//   try {
//     // Validate name
//     if (!validateName(name)) {
//       console.error(chalk.red('❌ Invalid API name. Use only letters, numbers, hyphens and underscores. Must start with a letter.'));
//       return;
//     }

//     // Process naming
//     const pascalCase = kebabToPascal(name);
//     const camelCase = kebabToCamel(name);
    
//     // Get paths
//     const paths = getBackendPaths(name, options.path);
    
//     // Ensure directories exist
//     await ensureDirectories([
//       paths.controllers,
//       paths.services,
//       paths.models,
//       paths.routes,
//       paths.dto
//     ]);
    
//     console.log(chalk.blue('🚀 Generating complete API structure...'));
    
//     // Generate templates
//     const controllerContent = getControllerTemplate(name, camelCase, pascalCase);
//     const serviceContent = getServiceTemplate(name, camelCase, pascalCase);
//     const modelContent = getModelTemplate(name, camelCase, pascalCase);
//     const dtoContent = getDTOTemplate(name, camelCase, pascalCase);
//     const routeContent = getRouteTemplate(name, camelCase, pascalCase);
    
//     // Write files
//     const files = [
//       {
//         path: path.join(paths.controllers, `${camelCase}Controller.ts`),
//         content: controllerContent,
//         type: 'Controller'
//       },
//       {
//         path: path.join(paths.services, `${camelCase}Service.ts`),
//         content: serviceContent,
//         type: 'Service'
//       },
//       {
//         path: path.join(paths.models, `${pascalCase}.ts`),
//         content: modelContent,
//         type: 'Model'
//       },
//       {
//         path: path.join(paths.dto, `${camelCase}DTO.ts`),
//         content: dtoContent,
//         type: 'DTO'
//       },
//       {
//         path: path.join(paths.routes, `${camelCase}Routes.ts`),
//         content: routeContent,
//         type: 'Routes'
//       }
//     ];
    
//     for (const file of files) {
//       await fs.writeFile(file.path, file.content);
//       console.log(chalk.green(`✅ ${file.type} created: ${path.relative(process.cwd(), file.path)}`));
//     }
    
//     // Success message
//     console.log(chalk.green(`\n🎉 Complete API structure for '${pascalCase}' created successfully!`));
//     console.log(chalk.blue(`📁 Files created:`));
    
//     files.forEach(file => {
//       console.log(chalk.blue(`   - ${path.relative(process.cwd(), file.path)}`));
//     });
    
//     // Usage instructions
//     console.log(chalk.yellow(`\n📋 Next steps:`));
//     console.log(chalk.gray(`1. Import the route in your main app:`));
//     console.log(chalk.gray(`   import ${camelCase}Routes from './routes/${camelCase}Routes.js';`));
//     console.log(chalk.gray(`   app.use('/api', ${camelCase}Routes);`));
//     console.log(chalk.gray(`\n2. Update the model schema in ${pascalCase}.ts as needed`));
//     console.log(chalk.gray(`3. Customize the DTOs in ${camelCase}DTO.ts`));
//     console.log(chalk.gray(`4. Add business logic to ${camelCase}Service.ts`));
//     console.log(chalk.gray(`5. Test the endpoints:`));
//     console.log(chalk.gray(`   POST   /api/${camelCase}s`));
//     console.log(chalk.gray(`   GET    /api/${camelCase}s`));
//     console.log(chalk.gray(`   GET    /api/${camelCase}s/:id`));
//     console.log(chalk.gray(`   PUT    /api/${camelCase}s/:id`));
//     console.log(chalk.gray(`   DELETE /api/${camelCase}s/:id`));
    
//   } catch (error) {
//     console.error(chalk.red('❌ API generation failed'));
//     if (error instanceof Error) {
//       console.error(chalk.red(error.message));
//     }
//     process.exit(1);
//   }
// };