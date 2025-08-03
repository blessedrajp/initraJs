export default `import { Request, Response } from 'express';
import { {{name}}Service } from '../services/{{nameLower}}.service';

export class {{name}}Controller {
  private {{nameCamel}}Service: {{name}}Service;

  constructor() {
    this.{{nameCamel}}Service = new {{name}}Service();
  }

  // Get all {{nameLower}}s
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.{{nameCamel}}Service.getAll();
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Get {{nameLower}} by ID
  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.{{nameCamel}}Service.getById(id);
      
      if (!result) {
        res.status(404).json({
          success: false,
          message: '{{name}} not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Create new {{nameLower}}
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.{{nameCamel}}Service.create(req.body);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Update {{nameLower}}
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.{{nameCamel}}Service.update(id, req.body);
      
      if (!result) {
        res.status(404).json({
          success: false,
          message: '{{name}} not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Delete {{nameLower}}
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.{{nameCamel}}Service.delete(id);
      
      if (!result) {
        res.status(404).json({
          success: false,
          message: '{{name}} not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: '{{name}} deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}
`;