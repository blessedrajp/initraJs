// src/utils/file-utils.ts
import fs from 'fs';
import path from 'path';

/**
 * Convert string to PascalCase
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^./, str => str.toUpperCase());
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * Ensure a directory exists, create it if it doesn't
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Check if a file exists
 */
export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

/**
 * Get filename without extension
 */
export function getFilenameWithoutExtension(filename: string): string {
  return path.basename(filename, path.extname(filename));
}

/**
 * Validate component/page name
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  // Check if name is empty
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name cannot be empty' };
  }

  // Check if name starts with a number
  if (/^\d/.test(name)) {
    return { isValid: false, error: 'Name cannot start with a number' };
  }

  // Check for invalid characters
  if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name)) {
    return { isValid: false, error: 'Name can only contain letters, numbers, hyphens, and underscores' };
  }

  // Check if name is a reserved word
  const reservedWords = [
    'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
    'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
    'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
    'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
    'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new',
    'null', 'package', 'private', 'protected', 'public', 'return', 'short',
    'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
    'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while',
    'with', 'yield'
  ];

  if (reservedWords.includes(name.toLowerCase())) {
    return { isValid: false, error: `"${name}" is a reserved word and cannot be used as a name` };
  }

  return { isValid: true };
}

/**
 * Create a relative import path
 */
export function createRelativeImportPath(from: string, to: string): string {
  const relativePath = path.relative(path.dirname(from), to);
  // Ensure the path starts with './' or '../'
  if (!relativePath.startsWith('.')) {
    return `./${relativePath}`;
  }
  return relativePath.replace(/\\/g, '/'); // Convert Windows paths to Unix format
}

/**
 * Get project root directory
 */
export function getProjectRoot(): string {
  let currentDir = process.cwd();
  
  // Look for package.json to determine project root
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  // If no package.json found, return current working directory
  return process.cwd();
}

/**
 * Check if project is using TypeScript
 */
export function isTypeScriptProject(): boolean {
  const projectRoot = getProjectRoot();
  return (
    fs.existsSync(path.join(projectRoot, 'tsconfig.json')) ||
    fs.existsSync(path.join(projectRoot, 'tsconfig.app.json')) ||
    fs.existsSync(path.join(projectRoot, 'jsconfig.json'))
  );
}

/**
 * Check if project is using Next.js
 */
export function isNextJsProject(): boolean {
  const projectRoot = getProjectRoot();
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return !!(
      packageJson.dependencies?.next ||
      packageJson.devDependencies?.next ||
      fs.existsSync(path.join(projectRoot, 'next.config.js')) ||
      fs.existsSync(path.join(projectRoot, 'next.config.mjs')) ||
      fs.existsSync(path.join(projectRoot, 'next.config.ts'))
    );
  } catch {
    return false;
  }
}

/**
 * Check if project is using Vite
 */
export function isViteProject(): boolean {
  const projectRoot = getProjectRoot();
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return !!(
      packageJson.dependencies?.vite ||
      packageJson.devDependencies?.vite ||
      fs.existsSync(path.join(projectRoot, 'vite.config.js')) ||
      fs.existsSync(path.join(projectRoot, 'vite.config.ts'))
    );
  } catch {
    return false;
  }
}

/**
 * Get recommended file extension based on project configuration
 */
export function getRecommendedExtension(isComponent: boolean = true): string {
  const isTS = isTypeScriptProject();
  
  if (isComponent) {
    return isTS ? 'tsx' : 'jsx';
  } else {
    return isTS ? 'ts' : 'js';
  }
}

/**
 * Create a backup of an existing file
 */
export function createBackup(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    return filePath;
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `${filePath}.backup.${timestamp}`;
  
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Safe file write with backup
 */
export function safeWriteFile(filePath: string, content: string, createBackupIfExists: boolean = true): void {
  if (createBackupIfExists && fs.existsSync(filePath)) {
    createBackup(filePath);
  }
  
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}