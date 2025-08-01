import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { 
  validateName, 
  detectFramework, 
  kebabToPascal, 
  parseProps,
  generatePropsInterface,
  generatePropsUsage
} from '../utils/component-utils.js';
import { 
  getBasicComponentTemplate, 
  getLayoutComponentTemplate 
} from '../templates/component-templates.js';
import { 
  getBasicComponentCSS, 
  getLayoutComponentCSS 
} from '../templates/css-templates.js';

interface ComponentOptions {
  server?: boolean;
  client?: boolean;
  layout?: boolean;
  props?: string;
  path?: string;
}

export const generateComponent = async (
  name: string,
  options: ComponentOptions
): Promise<void> => {
  try {
    // Validate component name
    if (!validateName(name)) {
      console.error(chalk.red('❌ Invalid component name. Use only letters, numbers, hyphens and underscores. Must start with a letter.'));
      return;
    }

    // Detect framework
    const framework = detectFramework();
    
    // Process component name
    const componentName = kebabToPascal(name);
    
    // Parse props
    const props = parseProps(options.props);
    
    // Determine component type
    const isLayout = options.layout || false;
    const isServer = options.server || false;
    const isClient = options.client || false;
    
    // Generate interfaces and props usage
    const propsInterface = generatePropsInterface(props, componentName, isLayout);
    const propsUsage = generatePropsUsage(props, isLayout);
    
    // Determine component directory
    const basePath = options.path || 'components';
    const componentDir = path.join(
      process.cwd(),
      'src',
      basePath,
      componentName
    );

    // Create directory
    await fs.ensureDir(componentDir);
    
    // Generate component content based on type
    let componentContent: string;
    let cssContent: string;
    
    if (isLayout) {
      componentContent = getLayoutComponentTemplate(
        componentName,
        props,
        propsInterface,
        propsUsage,
        isServer,
        framework
      );
      cssContent = getLayoutComponentCSS(componentName);
    } else {
      componentContent = getBasicComponentTemplate(
        componentName,
        props,
        propsInterface,
        propsUsage,
        isServer,
        framework
      );
      cssContent = getBasicComponentCSS(componentName);
    }
    
    // Write files
    const componentFile = path.join(componentDir, `${componentName}.tsx`);
    const cssFile = path.join(componentDir, `${componentName}.module.css`);
    
    await fs.writeFile(componentFile, componentContent);
    await fs.writeFile(cssFile, cssContent);
    
    // Success messages
    console.log(chalk.green(`✅ ${framework.toUpperCase()} component created successfully!`));
    console.log(chalk.blue(`📁 Location: ${path.relative(process.cwd(), componentDir)}`));
    console.log(chalk.blue(`📄 Files:`));
    console.log(chalk.blue(`   - ${componentName}.tsx`));
    console.log(chalk.blue(`   - ${componentName}.module.css`));
    
    // Component type info
    if (isLayout) {
      console.log(chalk.magenta(`🏗️  Layout component with header, main, and footer`));
    }
    
    if (isServer && framework === 'next') {
      console.log(chalk.cyan(`🖥️  Server-side component (SSR)`));
    } else if (isClient || (!isServer && framework === 'next')) {
      console.log(chalk.yellow(`🌐 Client-side component (CSR)`));
    }
    
    if (props.length > 0) {
      console.log(chalk.green(`🔧 Props: ${props.map(p => `${p.name}: ${p.type}`).join(', ')}`));
    }
    
    // Usage examples
    console.log(chalk.gray('\n📋 Usage examples:'));
    if (isLayout) {
      console.log(chalk.gray(`   <${componentName}>`));
      console.log(chalk.gray(`     <YourPageContent />`));
      console.log(chalk.gray(`   </${componentName}>`));
    } else {
      const exampleProps = props.length > 0 
        ? ` ${props.map(p => `${p.name}="${p.type === 'string' ? 'value' : p.type === 'boolean' ? 'true' : '{}'}"`).join(' ')}`
        : '';
      console.log(chalk.gray(`   <${componentName}${exampleProps} />`));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Component generation failed'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
};