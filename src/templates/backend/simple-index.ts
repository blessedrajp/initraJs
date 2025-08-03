// src/templates/backend/index.js

// Simple Controller Templates
export const controllerTemplateJS = `import * as {{camelName}}Service from '../services/{{kebabName}}.service.js';

export const create{{PascalName}} = async (req, res) => {
  try {
    // TODO: Implement create logic
    res.status(201).json({ message: '{{PascalName}} created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get{{PascalName}}s = async (req, res) => {
  try {
    // TODO: Implement get all logic
    res.status(200).json({ message: 'Get all {{lowerName}}s' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const get{{PascalName}}ById = async (req, res) => {
  try {
    // TODO: Implement get by ID logic
    res.status(200).json({ message: 'Get {{lowerName}} by ID' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update{{PascalName}} = async (req, res) => {
  try {
    // TODO: Implement update logic
    res.status(200).json({ message: '{{PascalName}} updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delete{{PascalName}} = async (req, res) => {
  try {
    // TODO: Implement delete logic
    res.status(200).json({ message: '{{PascalName}} deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
`;

export const controllerTemplateTS = `import * as {{camelName}}Service from '../services/{{kebabName}}.service';
import { Request, Response } from 'express';

export const create{{PascalName}} = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Implement create logic
    res.status(201).json({ message: '{{PascalName}} created successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const get{{PascalName}}s = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Implement get all logic
    res.status(200).json({ message: 'Get all {{lowerName}}s' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const get{{PascalName}}ById = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Implement get by ID logic
    res.status(200).json({ message: 'Get {{lowerName}} by ID' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const update{{PascalName}} = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Implement update logic
    res.status(200).json({ message: '{{PascalName}} updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const delete{{PascalName}} = async (req: Request, res: Response): Promise<void> => {
  try {
    // TODO: Implement delete logic
    res.status(200).json({ message: '{{PascalName}} deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
`;

// Simple Service Templates
export const serviceTemplateJS = `export const create{{PascalName}} = async ({{camelName}}Data) => {
  // TODO: Implement service logic
  return { id: 1, ...{{camelName}}Data };
};

export const get{{PascalName}}s = async () => {
  // TODO: Implement service logic
  return [];
};

export const get{{PascalName}}ById = async (id) => {
  // TODO: Implement service logic
  return { id };
};

export const update{{PascalName}} = async (id, {{camelName}}Data) => {
  // TODO: Implement service logic
  return { id, ...{{camelName}}Data };
};

export const delete{{PascalName}} = async (id) => {
  // TODO: Implement service logic
  return { id };
};
`;

export const serviceTemplateTS = `export const create{{PascalName}} = async ({{camelName}}Data: any): Promise<any> => {
  // TODO: Implement service logic
  return { id: 1, ...{{camelName}}Data };
};

export const get{{PascalName}}s = async (): Promise<any[]> => {
  // TODO: Implement service logic
  return [];
};

export const get{{PascalName}}ById = async (id: string): Promise<any> => {
  // TODO: Implement service logic
  return { id };
};

export const update{{PascalName}} = async (id: string, {{camelName}}Data: any): Promise<any> => {
  // TODO: Implement service logic
  return { id, ...{{camelName}}Data };
};

export const delete{{PascalName}} = async (id: string): Promise<any> => {
  // TODO: Implement service logic
  return { id };
};
`;

// Simple Model Templates
export const modelTemplateJS = `class {{PascalName}} {
  constructor(data) {
    this.id = data.id;
    // TODO: Add your properties here
  }

  // TODO: Add your methods here
}

export default {{PascalName}};
`;

export const modelTemplateTS = `interface I{{PascalName}} {
  id: string;
  // TODO: Add your interface properties here
}

class {{PascalName}} {
  public id: string;
  // TODO: Add your properties here

  constructor(data: I{{PascalName}}) {
    this.id = data.id;
    // TODO: Initialize your properties here
  }

  // TODO: Add your methods here
}

export default {{PascalName}};
export { I{{PascalName}} };
`;

// Simple DTO Templates
export const dtoTemplateJS = `export class Create{{PascalName}}Dto {
  constructor(data) {
    // TODO: Add validation and transformation logic
    Object.assign(this, data);
  }
}

export class Update{{PascalName}}Dto {
  constructor(data) {
    // TODO: Add validation and transformation logic
    Object.assign(this, data);
  }
}
`;

export const dtoTemplateTS = `export class Create{{PascalName}}Dto {
  // TODO: Add your properties here
  
  constructor(data: any) {
    // TODO: Add validation and transformation logic
    Object.assign(this, data);
  }
}

export class Update{{PascalName}}Dto {
  // TODO: Add your properties here
  
  constructor(data: any) {
    // TODO: Add validation and transformation logic
    Object.assign(this, data);
  }
}
`;

// Simple Middleware Templates
export const middlewareTemplateJS = `export const {{camelName}}Middleware = (req, res, next) => {
  try {
    // TODO: Add your middleware logic here
    console.log('{{PascalName}} middleware executed');
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
`;

export const middlewareTemplateTS = `import { Request, Response, NextFunction } from 'express';

export const {{camelName}}Middleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // TODO: Add your middleware logic here
    console.log('{{PascalName}} middleware executed');
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
`;

// JWT Middleware Templates
export const jwtMiddlewareTemplateJS = `import jwt from 'jsonwebtoken';

export const {{camelName}}Middleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
`;

export const jwtMiddlewareTemplateTS = `import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

export const {{camelName}}Middleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
`;

// Route Templates
export const routeTemplateJS = `import { Router } from 'express';
import {
  create{{PascalName}},
  get{{PascalName}}s,
  get{{PascalName}}ById,
  update{{PascalName}},
  delete{{PascalName}}
} from '../controllers/{{kebabName}}.controller.js';

const {{camelName}}Router = Router();

// POST /{{kebabName}} - Create new {{lowerName}}
{{camelName}}Router.post('/', create{{PascalName}});

// GET /{{kebabName}} - Get all {{lowerName}}s
{{camelName}}Router.get('/', get{{PascalName}}s);

// GET /{{kebabName}}/:id - Get {{lowerName}} by ID
{{camelName}}Router.get('/:id', get{{PascalName}}ById);

// PUT /{{kebabName}}/:id - Update {{lowerName}}
{{camelName}}Router.put('/:id', update{{PascalName}});

// DELETE /{{kebabName}}/:id - Delete {{lowerName}}
{{camelName}}Router.delete('/:id', delete{{PascalName}});

export default {{camelName}}Router;
`;

export const routeTemplateTS = `import { Router } from 'express';
import {
  create{{PascalName}},
  get{{PascalName}}s,
  get{{PascalName}}ById,
  update{{PascalName}},
  delete{{PascalName}}
} from '../controllers/{{kebabName}}.controller';

const {{camelName}}Router: Router = Router();

// POST /{{kebabName}} - Create new {{lowerName}}
{{camelName}}Router.post('/', create{{PascalName}});

// GET /{{kebabName}} - Get all {{lowerName}}s
{{camelName}}Router.get('/', get{{PascalName}}s);

// GET /{{kebabName}}/:id - Get {{lowerName}} by ID
{{camelName}}Router.get('/:id', get{{PascalName}}ById);

// PUT /{{kebabName}}/:id - Update {{lowerName}}
{{camelName}}Router.put('/:id', update{{PascalName}});

// DELETE /{{kebabName}}/:id - Delete {{lowerName}}
{{camelName}}Router.delete('/:id', delete{{PascalName}});

export default {{camelName}}Router;
`;