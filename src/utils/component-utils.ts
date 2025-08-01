import fs from 'fs-extra';
import path from 'path';

// Utility functions for component generation
export const capitalize = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

export const kebabToPascal = (str: string): string =>
  str.split('-').map(capitalize).join('');

export const validateName = (name: string): boolean => 
  /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name);

export const detectFramework = (): 'react' | 'next' | 'node' => {
  const cwd = process.cwd();
  const packagePath = path.join(cwd, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    if (pkg.dependencies?.next || pkg.devDependencies?.next) return 'next';
    if (pkg.dependencies?.react || pkg.devDependencies?.react) return 'react';
  }
  
  return 'react'; // Default to react
};

export const parseProps = (propsString?: string): Array<{ name: string; type: string }> => {
  if (!propsString) return [];
  
  return propsString.split(',').map(prop => {
    const trimmed = prop.trim();
    if (trimmed.includes(':')) {
      const [name, type] = trimmed.split(':');
      return { name: name.trim(), type: type.trim() };
    }
    return { name: trimmed, type: 'string' };
  });
};

export const generatePropsInterface = (
  props: Array<{ name: string; type: string }>, 
  componentName: string,
  isLayout: boolean = false
): string => {
  if (props.length === 0 && !isLayout) return '';
  
  let propsInterface = `interface ${componentName}Props {\n`;
  
  if (isLayout) {
    propsInterface += `  children: React.ReactNode;\n`;
  }
  
  props.forEach(prop => {
    propsInterface += `  ${prop.name}: ${prop.type};\n`;
  });
  
  propsInterface += `}\n\n`;
  
  return propsInterface;
};

export const generatePropsUsage = (
  props: Array<{ name: string; type: string }>,
  isLayout: boolean = false
): string => {
  const propNames = props.map(p => p.name);
  if (isLayout) propNames.push('children');
  
  if (propNames.length === 0) return '';
  return `{ ${propNames.join(', ')} }`;
};