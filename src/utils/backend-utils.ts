// src/utils/backend-utils.ts

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export type FileType = 'js' | 'ts';
export type FileCategory = 'api' | 'controller' | 'service' | 'model' | 'dto' | 'middleware' | 'route';
export type MiddlewareType = 'default' | 'jwt';

export interface BackendOptions {
  all?: boolean;
  ts?: boolean;
  js?: boolean;
  jwt?: boolean;
  middlewareType?: MiddlewareType;
}

export interface TemplateOptions {
  middlewareType?: MiddlewareType;
}

// Validation
export function validateName(name: string): boolean {
  return /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name);
}

// Directory management
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// File path creation
export function createFilePath(
  type: Exclude<FileCategory, 'api'>,
  name: string,
  fileType: FileType
): { dirPath: string; fileName: string; filePath: string } {
  const baseDir = 'src';
  const dirMap: Record<Exclude<FileCategory, 'api'>, string> = {
    controller: path.join(baseDir, 'controllers'),
    service: path.join(baseDir, 'services'),
    model: path.join(baseDir, 'models'),
    dto: path.join(baseDir, 'dto'),
    middleware: path.join(baseDir, 'middleware'),
    route: path.join(baseDir, 'routes')
  };

  const dirPath = dirMap[type];
  const fileName = `${toKebabCase(name)}.${type}.${fileType}`;
  const filePath = path.join(dirPath, fileName);

  return { dirPath, fileName, filePath };
}

// Content generation
export function generateFileContent(template: string, name: string): string {
  const replacements = {
    '{{PascalName}}': toPascalCase(name),
    '{{camelName}}': toCamelCase(name),
    '{{kebabName}}': toKebabCase(name),
    '{{lowerName}}': name.toLowerCase(),
    '{{UPPER_NAME}}': name.toUpperCase()
  };

  let content = template;
  Object.entries(replacements).forEach(([placeholder, replacement]) => {
    content = content.replace(new RegExp(placeholder, 'g'), replacement);
  });

  return content;
}

// String transformation utilities
function toPascalCase(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace(/\s/g, '');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase()
    .replace(/^-/, '');
}

// Logging utilities
export function logError(message: string): void {
  console.log(chalk.red(message));
}

export function logWarning(message: string): void {
  console.log(chalk.yellow(message));
}

export function logGenerationStart(type: FileCategory, name: string, fileType: FileType): void {
  if (type === 'api') {
    console.log(chalk.cyan(`\n🚀 Generating full API for "${name}" (${fileType.toUpperCase()})...\n`));
  } else {
    console.log(chalk.cyan(`\n🚀 Generating ${type} for "${name}" (${fileType.toUpperCase()})...\n`));
  }
}

export function logFileCreated(fileName: string, dirPath: string): void {
  console.log(chalk.green(`✅ Created: ${fileName} in ${dirPath}`));
}

export function logApiStructure(name: string, fileType: FileType): void {
  const kebabName = toKebabCase(name);
  const ext = fileType;
  
  console.log(chalk.magenta.bold(`\n📁 Generated API structure for "${name}":`));
  console.log(chalk.gray(`├── controllers/${kebabName}.controller.${ext}`));
  console.log(chalk.gray(`├── services/${kebabName}.service.${ext}`));
  console.log(chalk.gray(`├── models/${kebabName}.model.${ext}`));
  console.log(chalk.gray(`├── dto/${kebabName}.dto.${ext}`));
  console.log(chalk.gray(`└── routes/${kebabName}.route.${ext}`));
  
  console.log(chalk.cyan.bold(`\n🎉 API "${name}" generated successfully!`));
  console.log(chalk.yellow(`\n💡 Don't forget to register your routes in your main app file:`));
  console.log(chalk.white(`   import ${toCamelCase(name)}Router from './routes/${kebabName}.route.${ext === 'ts' ? '' : '.js'}';`));
  console.log(chalk.white(`   app.use('/api/${kebabName}', ${toCamelCase(name)}Router);`));
}

export function logGenerationComplete(type: FileCategory, name: string): void {
  console.log(chalk.green.bold(`\n🎉 ${type} "${name}" generated successfully!`));
  
  if (type === 'route') {
    const kebabName = toKebabCase(name);
    console.log(chalk.yellow(`\n💡 Don't forget to register your route in your main app file:`));
    console.log(chalk.white(`   import ${toCamelCase(name)}Router from './routes/${kebabName}.route';`));
    console.log(chalk.white(`   app.use('/api/${kebabName}', ${toCamelCase(name)}Router);`));
  }
}