import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GenerateOptions {
  framework?: 'react' | 'next' | 'node';
  client?: boolean;
  server?: boolean;
  prop?: string[];
  path?: string;
  typescript?: boolean;
}

const capitalize = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

const kebabToPascal = (str: string): string =>
  str.split('-').map(capitalize).join('');

const validateName = (name: string): boolean => 
  /^[a-zA-Z0-9_-]+$/.test(name);

const getFileExtension = (options: GenerateOptions): string => 
  options.typescript ? 'ts' : 'js';

const handleError = (error: unknown, message: string): never => {
  console.error(chalk.red(`❌ ${message}`));
  if (error instanceof Error) {
    console.error(chalk.red(error.message));
  }
  process.exit(1);
};

const generateComponent = async (
  componentName: string,
  componentDir: string,
  framework: string,
  propsList: string[] = [],
  options: GenerateOptions
): Promise<void> => {
  try {
    const validFramework = ['react', 'next'].includes(framework) ? framework : 'react';
    const ext = getFileExtension(options);
    
    const templatePath = path.join(
      __dirname,
      `../../templates/${validFramework}/component/Component.${ext}x`
    );
    const cssTemplatePath = path.join(
      __dirname,
      `../../templates/${validFramework}/component/Component.module.css`
    );

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found at ${templatePath}`);
    }

    await fs.ensureDir(componentDir);
    let componentContent = fs.readFileSync(templatePath, 'utf-8');
    let cssContent = fs.existsSync(cssTemplatePath)
      ? fs.readFileSync(cssTemplatePath, 'utf-8')
      : `.container {\n  /* Your styles here */\n}`;

    // Handle props
    if (propsList.length > 0) {
      const propsType = `interface Props {\n  ${propsList.map(p => `${p}: any;`).join('\n  ')}\n`;
      const propsUsage = `{ ${propsList.join(', ')} }`;
      const jsxContent = propsList.map(p => `    <p>{${p}}</p>`).join('\n');

      componentContent = componentContent
        .replace('// __PROPS_INTERFACE__', propsType)
        .replace('__PROPS_USAGE__', propsUsage)
        .replace('__JSX_CONTENT__', jsxContent);
    } else {
      componentContent = componentContent
        .replace('// __PROPS_INTERFACE__', '')
        .replace(', __PROPS_USAGE__', '')
        .replace('__JSX_CONTENT__', '<div className={styles.container}></div>');
    }

    // Final replacements
    componentContent = componentContent
      .replace(/__NAME__/g, componentName)
      .replace(/__FRAMEWORK__/g, validFramework);

    cssContent = cssContent.replace(/__NAME__/g, componentName.toLowerCase());

    // Write files
    fs.writeFileSync(path.join(componentDir, `${componentName}.${ext}x`), componentContent);
    fs.writeFileSync(path.join(componentDir, `${componentName}.module.css`), cssContent);
  } catch (error) {
    throw error;
  }
};

export const generate = async (
  type: string,
  name: string,
  options: GenerateOptions = {}
): Promise<void> => {
  try {
    if (!validateName(name)) {
      throw new Error('Invalid component name. Use only letters, numbers, hyphens and underscores.');
    }

    if (type.toLowerCase() !== 'component') {
      console.log(chalk.yellow('⚠️ Only component generation is supported'));
      return;
    }

    if (!options.client) {
      console.log(chalk.yellow('⚠️ Only client components are supported'));
      return;
    }

    const componentName = kebabToPascal(name);
    const framework = options.framework || 'react';
    const componentDir = path.join(
      process.cwd(),
      'src',
      'components',
      options.path || '',
      componentName
    );

    await generateComponent(
      componentName,
      componentDir,
      framework,
      options.prop || [],
      options
    );

    console.log(chalk.green(
      `✅ ${framework} component ${componentName} created at ${path.relative(process.cwd(), componentDir)}`
    ));
    console.log(chalk.blue(
      `ℹ️  Files created:\n- ${componentName}.${getFileExtension(options)}x\n- ${componentName}.module.css`
    ));
  } catch (error) {
    handleError(error, 'Component generation failed');
  }
};