// Template generators for different component types

export const getBasicComponentTemplate = (
  componentName: string,
  props: Array<{ name: string; type: string }>,
  propsInterface: string,
  propsUsage: string,
  isServer: boolean,
  framework: string
): string => {
  const useClientDirective = framework === 'next' && !isServer && !propsUsage.includes('children') ? "'use client';\n\n" : '';
  const importReact = "import React from 'react';";
  
  if (isServer && framework === 'next') {
    // Next.js Server Component
    return `${importReact}
${propsInterface}import styles from './${componentName}.module.css';

export default function ${componentName}(${propsUsage}${propsUsage ? `: ${componentName}Props` : ''}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>${componentName} Component</h2>
      <div className={styles.content}>
        {/* Your ${componentName.toLowerCase()} content here */}
        ${props.map(prop => `<p className={styles.prop}>{${prop.name}}</p>`).join('\n        ')}
      </div>
    </div>
  );
}`;
  } else {
    // React Client Component
    return `${useClientDirective}${importReact}
${propsInterface}import styles from './${componentName}.module.css';

const ${componentName}: React.FC${propsUsage ? `<${componentName}Props>` : ''} = (${propsUsage}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>${componentName} Component</h2>
      <div className={styles.content}>
        {/* Your ${componentName.toLowerCase()} content here */}
        ${props.map(prop => `<p className={styles.prop}>{${prop.name}}</p>`).join('\n        ')}
      </div>
    </div>
  );
};

export default ${componentName};`;
  }
};

export const getLayoutComponentTemplate = (
  componentName: string,
  props: Array<{ name: string; type: string }>,
  propsInterface: string,
  propsUsage: string,
  isServer: boolean,
  framework: string
): string => {
  const useClientDirective = framework === 'next' && !isServer ? "'use client';\n\n" : '';
  const importReact = "import React from 'react';";
  
  if (isServer && framework === 'next') {
    // Next.js Server Layout Component
    return `${importReact}
${propsInterface}import styles from './${componentName}.module.css';

export default function ${componentName}(${propsUsage}${propsUsage ? `: ${componentName}Props` : ''}) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>${componentName}</h1>
          <nav className={styles.nav}>
            {/* Navigation items */}
          </nav>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 ${componentName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}`;
  } else {
    // React Client Layout Component
    return `${useClientDirective}${importReact}
${propsInterface}import styles from './${componentName}.module.css';

const ${componentName}: React.FC${propsUsage ? `<${componentName}Props>` : '<{ children: React.ReactNode }>'} = (${propsUsage || '{ children }'}) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>${componentName}</h1>
          <nav className={styles.nav}>
            {/* Navigation items */}
          </nav>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; 2024 ${componentName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ${componentName};`;
  }
};