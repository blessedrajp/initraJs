import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

interface ServiceOptions {
  typescript?: boolean;
  javascript?: boolean;
  client?: boolean;
  server?: boolean;
  path?: string;
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

const getClientServiceTemplate = (
  serviceName: string,
  isTypeScript: boolean,
  framework: string
): string => {
  const capitalizedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  
  const typeDefinitions = isTypeScript ? `
// Types
interface ${capitalizedName}Data {
  id: string;
  [key: string]: any;
}

interface ${capitalizedName}CreateData {
  [key: string]: any;
}

interface ${capitalizedName}UpdateData {
  [key: string]: any;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
` : '';

  const baseURL = framework === 'next' ? '/api' : 'http://localhost:3001/api';
  
  return `${typeDefinitions}
class ${capitalizedName}Service {
  private baseURL = '${baseURL}';
  
  // GET - Fetch all ${serviceName}s
  async getAll()${isTypeScript ? `: Promise<ApiResponse<${capitalizedName}Data[]>>` : ''} {
    try {
      const response = await fetch(\`\${this.baseURL}/${serviceName}\`);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching ${serviceName}s:', error);
      throw error;
    }
  }
  
  // GET - Fetch single ${serviceName} by ID
  async getById(id${isTypeScript ? ': string' : ''})${isTypeScript ? `: Promise<ApiResponse<${capitalizedName}Data>>` : ''} {
    try {
      const response = await fetch(\`\${this.baseURL}/${serviceName}/\${id}\`);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(\`Error fetching ${serviceName} with id \${id}:\`, error);
      throw error;
    }
  }
  
  // POST - Create new ${serviceName}
  async create(data${isTypeScript ? `: ${capitalizedName}CreateData` : ''})${isTypeScript ? `: Promise<ApiResponse<${capitalizedName}Data>>` : ''} {
    try {
      const response = await fetch(\`\${this.baseURL}/${serviceName}\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating ${serviceName}:', error);
      throw error;
    }
  }
  
  // PUT - Update ${serviceName}
  async update(id${isTypeScript ? ': string' : ''}, data${isTypeScript ? `: ${capitalizedName}UpdateData` : ''})${isTypeScript ? `: Promise<ApiResponse<${capitalizedName}Data>>` : ''} {
    try {
      const response = await fetch(\`\${this.baseURL}/${serviceName}/\${id}\`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(\`Error updating ${serviceName} with id \${id}:\`, error);
      throw error;
    }
  }
  
  // DELETE - Delete ${serviceName}
  async delete(id${isTypeScript ? ': string' : ''})${isTypeScript ? `: Promise<ApiResponse<{ id: string }>>` : ''} {
    try {
      const response = await fetch(\`\${this.baseURL}/${serviceName}/\${id}\`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(\`Error deleting ${serviceName} with id \${id}:\`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const ${serviceName}Service = new ${capitalizedName}Service();
export default ${serviceName}Service;`;
};

const getServerServiceTemplate = (
  serviceName: string,
  isTypeScript: boolean,
  framework: string
): string => {
  const capitalizedName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  
  const typeDefinitions = isTypeScript ? `
// Types
interface ${capitalizedName}Data {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

interface ${capitalizedName}CreateData {
  [key: string]: any;
}

interface ${capitalizedName}UpdateData {
  [key: string]: any;
}
` : '';

  if (framework === 'node') {
    return `${typeDefinitions}
import { v4 as uuidv4 } from 'uuid';

class ${capitalizedName}Service {
  private data${isTypeScript ? `: ${capitalizedName}Data[]` : ''} = [];
  
  // Get all ${serviceName}s
  async findAll()${isTypeScript ? `: Promise<${capitalizedName}Data[]>` : ''} {
    try {
      // Replace with actual database query
      return this.data;
    } catch (error) {
      console.error('Error fetching ${serviceName}s:', error);
      throw new Error('Failed to fetch ${serviceName}s');
    }
  }
  
  // Get ${serviceName} by ID
  async findById(id${isTypeScript ? ': string' : ''})${isTypeScript ? `: Promise<${capitalizedName}Data | null>` : ''} {
    try {
      // Replace with actual database query
      const item = this.data.find(item => item.id === id);
      return item || null;
    } catch (error) {
      console.error(\`Error fetching ${serviceName} with id \${id}:\`, error);
      throw new Error(\`Failed to fetch ${serviceName}\`);
    }
  }
  
  // Create new ${serviceName}
  async create(data${isTypeScript ? `: ${capitalizedName}CreateData` : ''})${isTypeScript ? `: Promise<${capitalizedName}Data>` : ''} {
    try {
      const newItem${isTypeScript ? `: ${capitalizedName}Data` : ''} = {
        id: uuidv4(),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Replace with actual database insert
      this.data.push(newItem);
      
      return newItem;
    } catch (error) {
      console.error('Error creating ${serviceName}:', error);
      throw new Error('Failed to create ${serviceName}');
    }
  }
  
  // Update ${serviceName}
  async update(id${isTypeScript ? ': string' : ''}, data${isTypeScript ? `: ${capitalizedName}UpdateData` : ''})${isTypeScript ? `: Promise<${capitalizedName}Data | null>` : ''} {
    try {
      // Replace with actual database update
      const index = this.data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return null;
      }
      
      this.data[index] = {
        ...this.data[index],
        ...data,
        updatedAt: new Date(),
      };
      
      return this.data[index];
    } catch (error) {
      console.error(\`Error updating ${serviceName} with id \${id}:\`, error);
      throw new Error('Failed to update ${serviceName}');
    }
  }
  
  // Delete ${serviceName}
  async delete(id${isTypeScript ? ': string' : ''})${isTypeScript ? `: Promise<boolean>` : ''} {
    try {
      // Replace with actual database delete
      const index = this.data.findIndex(item => item.id === id);
      
      if (index === -1) {
        return false;
      }
      
      this.data.splice(index, 1);
      return true;
    } catch (error) {
      console.error(\`Error deleting ${serviceName} with id \${id}:\`, error);
      throw new Error('Failed to delete ${serviceName}');
    }
  }
}

// Export singleton instance
export const ${serviceName}Service = new ${capitalizedName}Service();
export default ${serviceName}Service;`;
  } else {
    // Next.js server service
    return `${typeDefinitions}
class ${capitalizedName}Service {
  private baseURL = process.env.DATABASE_URL || 'your-database-connection';
  
  // Get all ${serviceName}s
  async findAll()${isTypeScript ? `: Promise<${capitalizedName}Data[]>` : ''} {
    try {
      // Replace with actual database query (Prisma, MongoDB, etc.)
      // Example with Prisma: return await prisma.${serviceName}.findMany();
      
      // Mock data for now
      return [];
    } catch (error) {
      console.error('Error fetching ${serviceName}s:', error);
      throw new Error('Failed to fetch ${serviceName}s');
    }
  }
  
  // Get ${serviceName} by ID
  async findById(id${isTypeScript ? ': string' : ''})${isTypeScript ? `: Promise<${capitalizedName}Data | null>` : ''} {
    try {
      // Replace with actual database query
      // Example with Prisma: return await prisma.${serviceName}.findUnique({ where: { id } });
      
      // Mock implementation
      return null;
    } catch (error) {
      console.error(\`Error fetching ${serviceName} with id \${id}:\`, error);
      throw new Error(\`Failed to fetch ${serviceName}\`);
    }
  }
  
  // Create new ${serviceName}
  async create(data${isTypeScript ? `: ${capitalizedName}CreateData` : ''})${isTypeScript ? `: Promise<${capitalizedName}Data>` : ''} {
    try {
      // Replace with actual database insert
      // Example with Prisma: return await prisma.${serviceName}.create({ data });
      
      // Mock implementation
      const newItem${isTypeScript ? `: ${capitalizedName}Data` : ''} = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      return newItem;
    } catch (error) {
      console.error('Error creating ${serviceName}:', error);
      throw new Error('Failed to create ${serviceName}');
    }
  }
  
  // Update ${serviceName}
  async update(id${isTypeScript ? ': string' : ''}, data${isTypeScript ? `: ${capitalizedName}UpdateData` : ''})${isTypeScript ? `: Promise<${capitalizedName}Data | null>` : ''} {
    try {
      // Replace with actual database update
      // Example with Prisma: return await prisma.${serviceName}.update({ where: { id }, data });
      
      // Mock implementation
      return null;
    } catch (error) {
      console.error(\`Error updating ${serviceName} with id \${id}:\`, error);
      throw new Error('Failed to update ${serviceName}');
    }
  }
  
  // Delete ${serviceName}
  async delete(id${isTypeScript ? ': string' : ''})${isTypeScript ? `: Promise<boolean>` : ''} {
    try {
      // Replace with actual database delete
      // Example with Prisma: await prisma.${serviceName}.delete({ where: { id } });
      
      // Mock implementation
      return true;
    } catch (error) {
      console.error(\`Error deleting ${serviceName} with id \${id}:\`, error);
      throw new Error('Failed to delete ${serviceName}');
    }
  }
}

// Export singleton instance
export const ${serviceName}Service = new ${capitalizedName}Service();
export default ${serviceName}Service;`;
  }
};

export const generateService = async (
  name: string,
  options: ServiceOptions
): Promise<void> => {
  try {
    // Validate service name
    if (!validateName(name)) {
      console.error(chalk.red('❌ Invalid service name. Use only letters, numbers, hyphens and underscores. Must start with a letter.'));
      return;
    }

    // Determine language preference
    const isTypeScript = options.typescript || (!options.javascript && true);
    const isClient = options.client || (!options.server && true); // Default to client
    
    // Detect framework
    const framework = detectFramework();
    
    // Determine service directory
    const serviceType = isClient ? 'client' : 'server';
    const basePath = options.path || (isClient ? 'services' : 'lib');
    const serviceDir = path.join(
      process.cwd(),
      'src',
      basePath
    );
    
    // Create directory
    await fs.ensureDir(serviceDir);
    
    // Generate service content
    let serviceContent: string;
    
    if (isClient) {
      serviceContent = getClientServiceTemplate(name, isTypeScript, framework);
    } else {
      serviceContent = getServerServiceTemplate(name, isTypeScript, framework);
    }
    
    // Determine file extension
    const fileExt = isTypeScript ? 'ts' : 'js';
    
    // Write service file
    const serviceFile = path.join(serviceDir, `${name}.service.${fileExt}`);
    await fs.writeFile(serviceFile, serviceContent);
    
    // Success message
    console.log(chalk.green(`✅ ${framework} ${serviceType} service created successfully!`));
    console.log(chalk.blue(`📁 Location: ${path.relative(process.cwd(), serviceDir)}`));
    console.log(chalk.blue(`📄 File created: ${name}.service.${fileExt}`));
    
    if (isClient) {
      console.log(chalk.yellow(`🌐 Client service with HTTP methods: GET, POST, PUT, DELETE`));
      console.log(chalk.yellow(`📖 Usage: import { ${name}Service } from './${basePath}/${name}.service';`));
    } else {
      console.log(chalk.yellow(`🗄️  Server service with data operations: findAll, findById, create, update, delete`));
      console.log(chalk.yellow(`📖 Usage: import { ${name}Service } from './${basePath}/${name}.service';`));
      console.log(chalk.magenta(`💡 Remember to replace mock implementations with actual database operations`));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Service generation failed'));
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
    process.exit(1);
  }
};