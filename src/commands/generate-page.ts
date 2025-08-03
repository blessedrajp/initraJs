// src/commands/generate-page.ts
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { 
  reactPageTemplate, 
  nextPageTemplate, 
  nextLayoutTemplate,
  pageScssTemplate,
  pageTestTemplate,
  PageTemplateOptions 
} from '../templates/page-templates.js';
import { ensureDirectoryExists, toPascalCase } from '../utils/client-utils.js';

export interface GeneratePageOptions {
  react?: boolean;
  next?: boolean;
  ts?: boolean;
  js?: boolean;
  css?: boolean;
  test?: boolean;
  path?: string;
}

export function generatePage(name: string, options: GeneratePageOptions) {
  try {
    // Determine page type (default to React if neither specified)
    const isNext = options.next;
    const isReact = options.react || !isNext; // Default to React
    
    // Determine file type (default to tsx if neither ts nor js is specified)
    const isTypeScript = options.js ? false : true; // Default to TypeScript
    const fileExtension = isTypeScript ? 'tsx' : 'jsx';
    
    // Convert name to PascalCase
    const pageName = toPascalCase(name.replace(/page$/i, '')); // Remove 'Page' suffix if present
    
    // Template options
    const templateOptions: PageTemplateOptions = {
      name: pageName,
      typescript: isTypeScript,
      isNext,
      isReact
    };
    
    if (isNext) {
      generateNextPage(pageName, templateOptions, options, fileExtension);
    } else {
      generateReactPage(pageName, templateOptions, options, fileExtension);
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Error generating page:'), error);
    process.exit(1);
  }
}

function generateReactPage(
  pageName: string, 
  templateOptions: PageTemplateOptions, 
  options: GeneratePageOptions,
  fileExtension: string
) {
  // Determine the output directory
  const baseDir = options.path || 'src/pages';
  const pageDir = path.join(process.cwd(), baseDir);
  
  // Ensure directory exists
  ensureDirectoryExists(pageDir);
  
  // Generate page content
  const pageContent = reactPageTemplate(templateOptions);
  const pageFileName = `${pageName}Page.${fileExtension}`;
  const pageFilePath = path.join(pageDir, pageFileName);
  
  fs.writeFileSync(pageFilePath, pageContent);
  console.log(chalk.green(`✅ React page created: ${pageFilePath}`));
  
  // Generate additional files
  generateAdditionalFiles(pageName, pageDir, options, templateOptions.typescript!, false);
  
  // Success message
  console.log(chalk.cyan.bold(`\n🎉 ${pageName}Page generated successfully!`));
  console.log(chalk.yellow(`📁 Location: ${pageDir}`));
  
  // Show import example
  const relativePath = path.relative(process.cwd(), pageFilePath);
  console.log(chalk.gray(`\n💡 Import with: import ${pageName}Page from './${relativePath.replace(/\\/g, '/')}';`));
}

function generateNextPage(
  pageName: string, 
  templateOptions: PageTemplateOptions, 
  options: GeneratePageOptions,
  fileExtension: string
) {
  // Determine the output directory (Next.js app directory structure)
  const baseDir = options.path || 'app';
  const pageRoute = pageName.toLowerCase().replace(/page$/i, ''); // Convert to lowercase for route
  const pageDir = path.join(process.cwd(), baseDir, pageRoute);
  
  // Ensure directory exists
  ensureDirectoryExists(pageDir);
  
  // Generate page content
  const pageContent = nextPageTemplate(templateOptions);
  const pageFilePath = path.join(pageDir, `page.${fileExtension}`);
  
  fs.writeFileSync(pageFilePath, pageContent);
  console.log(chalk.green(`✅ Next.js page created: ${pageFilePath}`));
  
  // Generate loading component
  const loadingContent = `export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}`;
  const loadingFilePath = path.join(pageDir, `loading.${fileExtension}`);
  fs.writeFileSync(loadingFilePath, loadingContent);
  console.log(chalk.green(`✅ Loading component created: ${loadingFilePath}`));
  
  // Generate error component
  const errorContent = `'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`;
  const errorFilePath = path.join(pageDir, `error.${fileExtension}`);
  fs.writeFileSync(errorFilePath, errorContent);
  console.log(chalk.green(`✅ Error component created: ${errorFilePath}`));
  
  // Generate additional files
  generateAdditionalFiles(pageName, pageDir, options, templateOptions.typescript!, true);
  
  // Success message
  console.log(chalk.cyan.bold(`\n🎉 ${pageName} Next.js page generated successfully!`));
  console.log(chalk.yellow(`📁 Location: ${pageDir}`));
  console.log(chalk.yellow(`🌐 Route: /${pageRoute}`));
  
  // Show usage example
  console.log(chalk.gray(`\n💡 Visit: http://localhost:3000/${pageRoute}`));
}

function generateAdditionalFiles(
  pageName: string,
  pageDir: string,
  options: GeneratePageOptions,
  isTypeScript: boolean,
  isNext: boolean
) {
  // Generate CSS file if requested
  if (options.css) {
    const cssContent = pageScssTemplate(pageName);
    const cssFileName = isNext ? `${pageName.toLowerCase()}.scss` : `${pageName}Page.scss`;
    const cssFilePath = path.join(pageDir, cssFileName);
    fs.writeFileSync(cssFilePath, cssContent);
    console.log(chalk.green(`✅ CSS file created: ${cssFilePath}`));
  }
  
  // Generate test file if requested
  if (options.test) {
    const testContent = pageTestTemplate(pageName, isTypeScript, isNext);
    const testExtension = isTypeScript ? 'test.tsx' : 'test.jsx';
    const testFileName = isNext ? `page.${testExtension}` : `${pageName}Page.${testExtension}`;
    const testFilePath = path.join(pageDir, testFileName);
    fs.writeFileSync(testFilePath, testContent);
    console.log(chalk.green(`✅ Test file created: ${testFilePath}`));
  }
}