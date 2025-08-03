// src/commands/generate-backend.ts
import fs from 'fs';
import {
  FileType,
  FileCategory,
  BackendOptions,
  TemplateOptions,
  validateName,
  ensureDirectoryExists,
  generateFileContent,
  createFilePath,
  logError,
  logWarning,
  logGenerationStart,
  logFileCreated,
  logApiStructure,
  logGenerationComplete
} from '../utils/backend-utils.js';

// Import all templates
import {
  controllerTemplateJS,
  controllerTemplateTS,
  serviceTemplateJS,
  serviceTemplateTS,
  modelTemplateJS,
  modelTemplateTS,
  dtoTemplateJS,
  dtoTemplateTS,
  middlewareTemplateJS,
  middlewareTemplateTS,
  jwtMiddlewareTemplateJS,
  jwtMiddlewareTemplateTS,
  routeTemplateJS,
  routeTemplateTS
} from '../templates/backend/index.js';

// Template mapping
const templates = {
  js: {
    controller: controllerTemplateJS,
    service: serviceTemplateJS,
    model: modelTemplateJS,
    dto: dtoTemplateJS,
    middleware: middlewareTemplateJS,
    jwtMiddleware: jwtMiddlewareTemplateJS,
    route: routeTemplateJS
  },
  ts: {
    controller: controllerTemplateTS,
    service: serviceTemplateTS,
    model: modelTemplateTS,
    dto: dtoTemplateTS,
    middleware: middlewareTemplateTS,
    jwtMiddleware: jwtMiddlewareTemplateTS,
    route: routeTemplateTS
  }
};

export async function generateBackendFile(
  type: FileCategory,
  name: string,
  fileType: FileType,
  options: BackendOptions = {}
): Promise<void> {
  try {
    // Validate name
    if (!validateName(name)) {
      logError('❌ Invalid name. Use only letters, numbers, hyphens and underscores. Must start with a letter.');
      process.exit(1);
    }

    // Prepare template options
    const templateOptions: TemplateOptions = {
      middlewareType: options.middlewareType || (options.jwt ? 'jwt' : 'default')
    };

    logGenerationStart(type, name, fileType);

    if (type === 'api') {
      // Generate all API files including routes
      await generateApiFiles(name, fileType, templateOptions);
    } else {
      // Generate single file
      const success = await generateSingleFile(type, name, fileType, templateOptions);
      if (success) {
        logGenerationComplete(type, name);
      }
    }

  } catch (error) {
    logError('\n❌ Backend file generation failed');
    if (error instanceof Error) {
      logError(error.message);
    }
    process.exit(1);
  }
}

async function generateApiFiles(
  name: string,
  fileType: FileType,
  options: TemplateOptions
): Promise<void> {
  const fileCategories: Array<Exclude<FileCategory, 'api' | 'middleware'>> = [
    'controller',
    'service',
    'model',
    'dto',
    'route'  // Added route generation
  ];
  
  let allSuccess = true;
  const generatedFiles: string[] = [];

  for (const category of fileCategories) {
    const result = await generateSingleFile(category, name, fileType, options);
    if (result) {
      const { filePath } = createFilePath(category, name, fileType);
      generatedFiles.push(filePath);
    } else {
      allSuccess = false;
    }
  }

  if (allSuccess) {
    logApiStructure(name, fileType);
  }
}

async function generateSingleFile(
  type: Exclude<FileCategory, 'api'>,
  name: string,
  fileType: FileType,
  options: TemplateOptions = {}
): Promise<boolean> {
  try {
    const { dirPath, fileName, filePath } = createFilePath(type, name, fileType);
    
    // Create directory if it doesn't exist
    ensureDirectoryExists(dirPath);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      logWarning(`⚠️  File ${fileName} already exists!`);
      return false;
    }

    // Get the appropriate template
    const template = getTemplate(type, fileType, options);
    if (!template) {
      throw new Error(`Template not found for ${type} with ${fileType}`);
    }

    // Generate content
    const content = generateFileContent(template, name);
    
    // Write file
    fs.writeFileSync(filePath, content, 'utf8');
    logFileCreated(fileName, dirPath);
    
    return true;
  } catch (error) {
    logError(`Failed to generate ${type}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
}

function getTemplate(
  type: Exclude<FileCategory, 'api'>,
  fileType: FileType,
  options: TemplateOptions = {}
): string {
  const templateSet = templates[fileType];
  
  if (type === 'middleware' && options.middlewareType === 'jwt') {
    return templateSet.jwtMiddleware;
  }
  
  return templateSet[type as keyof typeof templateSet] || '';
}