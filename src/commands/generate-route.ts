import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

interface RouteOptions {
  typescript?: boolean;
  javascript?: boolean;
  api?: boolean;
  page?: boolean;
  path?: string;
  method?: string;
}

const validateName = (name: string): boolean => 
  /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name);

const detectFramework = (): 'react' | 'next' | 'node' => {
  const cwd = process.cwd();
  const packagePath = path.join(cwd, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    if (pkg.dependencies?.next || pkg.devDependencies?.next) return 'next';
    if (pkg.dependencies?.react || pkg.devDependencies?.react) return 'react';
    if (pkg.dependencies?.express || pkg.devDependencies?.express) return 'node';
  }
  
  return 'react';
};

const getAPIRouteTemplate = (
  routeName: string,
  method: string,
  isTypeScript: boolean,
  framework: string
): string => {
  const methodUpper = method.toUpperCase();
  
  if (framework === 'next') {
    // Next.js API Route
    const typeImport = isTypeScript ? "import { NextRequest, NextResponse } from 'next/server';\n\n" : '';
    const paramTypes = isTypeScript ? ': NextRequest' : '';
    const responseType = isTypeScript ? ': Promise<NextResponse>' : '';
    
    return `${typeImport}export async function ${methodUpper}(request${paramTypes})${responseType} {
  try {
    // Handle ${methodUpper} request for ${routeName}
    ${methodUpper === 'GET' ? `
    // Example: Fetch data
    const data = {
      message: '${routeName} data fetched successfully',
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(data);` : methodUpper === 'POST' ? `
    const body = await request.json();
    
    // Example: Process the data
    const result = {
      message: '${routeName} created successfully',
      data: body,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    return NextResponse.json(result, { status: 201 });` : methodUpper === 'PUT' ? `
    const body = await request.json();
    
    // Example: Update data
    const result = {
      message: '${routeName} updated successfully',
      data: body,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(result);` : `
    // Example: Delete data
    const result = {
      message: '${routeName} deleted successfully',
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(result);`}
  } catch (error) {
    console.error('Error in ${routeName} ${methodUpper}:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}`;
  } else {
    // Express.js API Route
    const typeImport = isTypeScript ? "import { Request, Response } from 'express';\n\n" : '';
    const paramTypes = isTypeScript ? ': Request, res: Response' : '';
    
    return `${typeImport}export const ${method.toLowerCase()}${routeName.charAt(0).toUpperCase() + routeName.slice(1)} = (req${paramTypes}) => {
  try {
    ${methodUpper === 'GET' ? `
    // Example: Fetch data
    const data = {
      message: '${routeName} data fetched successfully',
      timestamp: new Date().toISOString()
    };
    
    res.json(data);` : methodUpper === 'POST' ? `
    const body = req.body;
    
    // Example: Process the data
    const result = {
      message: '${routeName} created successfully',
      data: body,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    res.status(201).json(result);` : methodUpper === 'PUT' ? `
    const body = req.body;
    
    // Example: Update data
    const result = {
      message: '${routeName} updated successfully',
      data: body,
      timestamp: new Date().toISOString()
    };
    
    res.json(result);` : `
    // Example: Delete data
    const result = {
      message: '${routeName} deleted successfully',
      timestamp: new Date().toISOString()
    };
    
    res.json(result);`}
  } catch (error) {
    console.error('Error in ${routeName} ${methodUpper}:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};`;
  }
};

const getPageRouteTemplate = (
  routeName: string,
  isTypeScript: boolean,
  framework: string
): string => {
  const componentName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
  
  if (framework === 'next') {
    // Next.js Page Component
    const typeImport = isTypeScript ? "import { Metadata } from 'next';\n" : '';
    const metadataExport = isTypeScript ? `
export const metadata: Metadata = {
  title: '${componentName}',
  description: '${componentName} page description',
};\n` : '';
    
    return `${typeImport}import styles from './${routeName}.module.css';
${metadataExport}
export default function ${componentName}Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>${componentName}</h1>
      <p className={styles.description}>
        Welcome to the ${componentName} page.
      </p>
      
      <div className={styles.content}>
        {/* Your page content goes here */}
        <div className={styles.card}>
          <h2>Getting Started</h2>
          <p>Edit this page to add your content.</p>
        </div>
      </div>
    </div>
  );
}`;
  } else {
    // React Page Component
    return `import React from 'react';
import styles from './${routeName}.module.css';

const ${componentName}Page${isTypeScript ? ': React.FC' : ''} = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>${componentName}</h1>
      <p className={styles.description}>
        Welcome to the ${componentName} page.
      </p>
      
      <div className={styles.content}>
        {/* Your page content goes here */}
        <div className={styles.card}>
          <h2>Getting Started</h2>
          <p>Edit this page to add your content.</p>
        </div>
      </div>
    </div>
  );
};

export default ${componentName}Page;`;
  }
};

const getPageCSSTemplate = (routeName: string): string => {
  return `.container {
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.content {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.card h2 {
  color: #333;
  margin-bottom: 1rem;
}

.card p {
  color: #666;
  line-height: 1.6;
}`;
};

export const generateRoute = async (
  name: string,
  options: RouteOptions
): Promise<void> => {
  try {
    // Validate route name
    if (!validateName(name)) {
      console.error(chalk.red('❌ Invalid route name. Use only letters, numbers, hyphens and underscores. Must start with a letter.'));
      return;
    }

    // Determine language preference
    const isTypeScript = options.typescript || (!options.javascript && true);
    const isAPI = options.api || false;
    const method = options.method?.toUpperCase() || 'GET';
    
    // Validate HTTP method for API routes
    if (isAPI && !['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      console.error(chalk.red('❌ Invalid HTTP method. Use GET, POST, PUT, DELETE, or PATCH.'));
      return;
    }
    
    // Detect framework
    const framework = detectFramework();
    
    // Determine route directory based on framework and type
    let routeDir: string;
    let fileName: string;
    const fileExt = isTypeScript ? 'ts' : 'js';
    
    if (framework === 'next') {
      if (isAPI) {
        // Next.js API routes go in app/api/
        routeDir = path.join(process.cwd(), 'src', 'app', 'api', options.path || '', name);
        fileName = 'route';
      } else {
        // Next.js pages go in app/
        routeDir = path.join(process.cwd(), 'src', 'app', options.path || '', name);
        fileName = 'page';
      }
    } else {
      // React/Node routes
      const baseDir = isAPI ? 'routes' : 'pages';
      routeDir = path.join(process.cwd(), 'src', baseDir, options.path || '');
      fileName = name;
    }

    // Create directory
    await fs.ensureDir(routeDir);
    
    // Generate route content
    let routeContent: string;
    let cssContent: string | null = null;
    
    if (isAPI) {
      routeContent = getAPIRouteTemplate(name, method, isTypeScript, framework);
    } else {
      routeContent = getPageRouteTemplate(name, isTypeScript, framework);
      cssContent = getPageCSSTemplate(name);
    }
    
    // Write route file
    const routeFile = path.join(routeDir, `${fileName}.${isAPI ? fileExt : (isTypeScript ? 'tsx' : 'jsx')}`);
    await fs.writeFile(routeFile, routeContent);
    
    // Write CSS file for page routes
    if (cssContent) {
      const cssFile = path.join(routeDir, `${name}.module.css`);
      await fs.writeFile(cssFile, cssContent);
    }
    
    // Success message
    console.log(chalk.green(`✅ ${framework} ${isAPI ? 'API' : 'page'} route created successfully!`));
    console.log(chalk.blue(`📁 Location: ${path.relative(process.cwd(), routeDir)}`));
    console.log(chalk.blue(`📄 Files created:`));
    console.log(chalk.blue(`   - ${fileName}.${isAPI ? fileExt : (isTypeScript ? 'tsx' : 'jsx')}`));
    if (cssContent) {
      console.log(chalk.blue(`   - ${name}.module.css`));
    }
    
    if (isAPI) {
      console.log(chalk.yellow(`🌐 HTTP Method: ${method}`));
      console.log(chalk.yellow(`🔗 URL: /api/${options.path ? options.path + '/' : ''}${name}`));
    } else {
      console.log(chalk.yellow(`🔗 URL: /${options.path ? options.path + '/' : ''}${name}`));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Route generation failed'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
};