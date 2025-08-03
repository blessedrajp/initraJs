export default `const {{name}}Service = require('../services/{{nameLower}}.service');

class {{name}}Controller {
  constructor() {
    this.{{nameCamel}}Service = new {{name}}Service();
  }

  // Get all {{nameLower}}s
  getAll = async (req, res) => {
    try {
      const result = await this.{{nameCamel}}Service.getAll();
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Get {{nameLower}} by ID
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.{{nameCamel}}Service.getById(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: '{{name}} not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Create new {{nameLower}}
  create = async (req, res) => {
    try {
      const result = await this.{{nameCamel}}Service.create(req.body);
      res.status(201).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Update {{nameLower}}
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.{{nameCamel}}Service.update(id, req.body);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: '{{name}} not found'
        });
      }

      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Delete {{nameLower}}
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.{{nameCamel}}Service.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: '{{name}} not found'
        });
      }

      res.status(200).json({
        success: true,
        message: '{{name}} deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
}

module.exports = {{name}}Controller;
`;