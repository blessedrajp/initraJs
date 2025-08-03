// src/commands/generate-component.ts
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { 
  tsxComponentTemplate, 
  jsxComponentTemplate, 
  cssTemplate, 
  scssTemplate, 
  testTemplate, 
  storyTemplate,
  ComponentTemplateOptions 
} from '../templates/component-templates.js';
import { ensureDirectoryExists, toPascalCase } from '../utils/client-utils.js';

export interface GenerateComponentOptions {
  server?: boolean;
  client?: boolean;
  layout?: boolean;
  props?: string;
  path?: string;
  ts?: boolean;
  js?: boolean;
  css?: boolean;
  test?: boolean;
  story?: boolean;
}

export function generateComponent(name: string, options: GenerateComponentOptions) {
  try {
    // Determine file type (default to tsx if neither ts nor js is specified)
    const isTypeScript = options.js ? false : true; // Default to TypeScript
    const fileExtension = isTypeScript ? 'tsx' : 'jsx';
    
    // Parse props
    const props = options.props ? options.props.split(',').map(p => p.trim()) : [];
    
    // Convert name to PascalCase
    const componentName = toPascalCase(name);
    
    // Determine the output directory
    const baseDir = options.path || 'src/components';
    const componentDir = path.join(process.cwd(), baseDir, componentName);
    
    // Ensure directory exists
    ensureDirectoryExists(componentDir);
    
    // Template options
    const templateOptions: ComponentTemplateOptions = {
      name: componentName,
      props,
      isLayout: options.layout,
      isServer: options.server,
      isClient: options.client,
      typescript: isTypeScript,
      includeCSS: !!options.css
    };
    
    // Generate component file
    const componentContent = isTypeScript 
      ? tsxComponentTemplate(templateOptions)
      : jsxComponentTemplate(templateOptions);
    
    const componentFilePath = path.join(componentDir, `${componentName}.${fileExtension}`);
    fs.writeFileSync(componentFilePath, componentContent);
    
    console.log(chalk.green(`✅ Component created: ${componentFilePath}`));
    
    // Generate CSS file if requested
    if (options.css) {
      const cssContent = scssTemplate(componentName, !!options.layout);
      const cssFilePath = path.join(componentDir, `${componentName}.scss`);
      fs.writeFileSync(cssFilePath, cssContent);
      console.log(chalk.green(`✅ CSS file created: ${cssFilePath}`));
    }
    
    // Generate test file if requested
    if (options.test) {
      const testContent = testTemplate(componentName, isTypeScript, !!options.css);
      const testExtension = isTypeScript ? 'test.tsx' : 'test.jsx';
      const testFilePath = path.join(componentDir, `${componentName}.${testExtension}`);
      fs.writeFileSync(testFilePath, testContent);
      console.log(chalk.green(`✅ Test file created: ${testFilePath}`));
    }
    
    // Generate story file if requested
    if (options.story) {
      const storyContent = storyTemplate(componentName, isTypeScript);
      const storyExtension = isTypeScript ? 'stories.tsx' : 'stories.jsx';
      const storyFilePath = path.join(componentDir, `${componentName}.${storyExtension}`);
      fs.writeFileSync(storyFilePath, storyContent);
      console.log(chalk.green(`✅ Story file created: ${storyFilePath}`));
    }
    
    // Generate index file for easier importing
    const indexContent = `export { default } from './${componentName}';`;
    const indexExtension = isTypeScript ? 'ts' : 'js';
    const indexFilePath = path.join(componentDir, `index.${indexExtension}`);
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(chalk.green(`✅ Index file created: ${indexFilePath}`));
    
    // Success message
    console.log(chalk.cyan.bold(`\n🎉 ${componentName} component generated successfully!`));
    console.log(chalk.yellow(`📁 Location: ${componentDir}`));
    
    // Show import example
    const relativePath = path.relative(process.cwd(), componentDir);
    console.log(chalk.gray(`\n💡 Import with: import ${componentName} from './${relativePath}';`));
    
  } catch (error) {
    console.error(chalk.red('❌ Error generating component:'), error);
    process.exit(1);
  }
}