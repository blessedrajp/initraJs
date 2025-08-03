// src/templates/backend/route.js - JavaScript Route Template
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

// src/templates/backend/route.ts - TypeScript Route Template
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