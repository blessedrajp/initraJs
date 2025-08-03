// src/templates/component-templates.ts

export interface ComponentTemplateOptions {
  name: string;
  props?: string[];
  isLayout?: boolean;
  isServer?: boolean;
  isClient?: boolean;
  typescript?: boolean;
  includeCSS?: boolean;
}

// TypeScript Component Templates
export const tsxComponentTemplate = (options: ComponentTemplateOptions): string => {
  const { name, props = [], isLayout, isServer, isClient, includeCSS } = options;
  
  const cssImport = includeCSS ? `import './${name}.scss';\n` : '';
  
  const propsInterface = props.length > 0 
    ? `interface ${name}Props {\n  ${props.map(prop => `${prop}: any;`).join('\n  ')}\n}\n\n`
    : '';
  
  const propsParam = props.length > 0 ? `{ ${props.join(', ')} }: ${name}Props` : '';
  
  if (isLayout) {
    return `${cssImport}${propsInterface}const ${name} = (${propsParam}) => {
  return (
    <div${includeCSS ? ` className="${name.toLowerCase()}"` : ''}>
      <header${includeCSS ? ` className="${name.toLowerCase()}__header"` : ''}>
        <h1>Header</h1>
      </header>
      <main${includeCSS ? ` className="${name.toLowerCase()}__main"` : ''}>
        {children}
      </main>
      <footer${includeCSS ? ` className="${name.toLowerCase()}__footer"` : ''}>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default ${name};`;
  }

  const directive = isServer ? "'use server';\n\n" : isClient ? "'use client';\n\n" : '';
  
  return `${directive}${cssImport}${propsInterface}const ${name} = (${propsParam}) => {
  return (
    <div${includeCSS ? ` className="${name.toLowerCase()}"` : ''}>
      <h2>${name} Component</h2>
      ${props.length > 0 ? `{/* Props: ${props.join(', ')} */}` : ''}
    </div>
  );
};

export default ${name};`;
};

export const jsxComponentTemplate = (options: ComponentTemplateOptions): string => {
  const { name, props = [], isLayout, isServer, isClient, includeCSS } = options;
  
  const cssImport = includeCSS ? `import './${name}.scss';\n` : '';
  const propsParam = props.length > 0 ? `{ ${props.join(', ')} }` : '';
  
  if (isLayout) {
    return `${cssImport}const ${name} = (${propsParam}) => {
  return (
    <div${includeCSS ? ` className="${name.toLowerCase()}"` : ''}>
      <header${includeCSS ? ` className="${name.toLowerCase()}__header"` : ''}>
        <h1>Header</h1>
      </header>
      <main${includeCSS ? ` className="${name.toLowerCase()}__main"` : ''}>
        {children}
      </main>
      <footer${includeCSS ? ` className="${name.toLowerCase()}__footer"` : ''}>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default ${name};`;
  }

  const directive = isServer ? "'use server';\n\n" : isClient ? "'use client';\n\n" : '';
  
  return `${directive}${cssImport}const ${name} = (${propsParam}) => {
  return (
    <div${includeCSS ? ` className="${name.toLowerCase()}"` : ''}>
      <h2>${name} Component</h2>
      ${props.length > 0 ? `{/* Props: ${props.join(', ')} */}` : ''}
    </div>
  );
};

export default ${name};`;
};

// CSS Template
export const cssTemplate = (name: string, isLayout: boolean = false): string => {
  if (isLayout) {
    return `.${name.toLowerCase()} {
  /* Layout styles */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.${name.toLowerCase()}__header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.${name.toLowerCase()}__main {
  flex: 1;
  padding: 2rem;
  min-height: 0;
}

.${name.toLowerCase()}__footer {
  padding: 1rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  margin-top: auto;
}`;
  }

  return `.${name.toLowerCase()} {
  /* Add your styles here */
  
}`;
};

// SCSS Template
export const scssTemplate = (name: string, isLayout: boolean = false): string => {
  if (isLayout) {
    return `.${name.toLowerCase()} {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    background: #fff;
    
    h1 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }
  }

  &__main {
    flex: 1;
    padding: 2rem;
    min-height: 0;
  }

  &__footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    background: #f9f9f9;
    margin-top: auto;

    p {
      margin: 0;
      color: #666;
      font-size: 0.875rem;
    }
  }
}`;
  }

  return `.${name.toLowerCase()} {
  /* Add your styles here */
  
}`;
};

// Test Templates
export const testTemplate = (name: string, isTypeScript: boolean, includeCSS: boolean): string => {
  const importExt = isTypeScript ? '' : '.js';
  
  const cssTest = includeCSS ? `
  it('applies correct CSS class', () => {
    const { container } = render(<${name} />);
    expect(container.firstChild).toHaveClass('${name.toLowerCase()}');
  });` : '';
  
  return `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${name} from './${name}${importExt}';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />);
    expect(screen.getByText('${name} Component')).toBeInTheDocument();
  });${cssTest}
});`;
};

// Story Template for Storybook (optional)
export const storyTemplate = (name: string, isTypeScript: boolean): string => {
  const importExt = isTypeScript ? '' : '.js';
  
  return `import type { Meta, StoryObj } from '@storybook/react';
import ${name} from './${name}${importExt}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};`;
};