export default `const {{name}} = require('../models/{{nameLower}}.model');

class {{name}}Service {
  // Get all {{nameLower}}s
  async getAll() {
    try {
      return await {{name}}.find({});
    } catch (error) {
      throw new Error(\`Error fetching {{nameLower}}s: \${error.message}\`);
    }
  }

  // Get {{nameLower}} by ID
  async getById(id) {
    try {
      return await {{name}}.findById(id);
    } catch (error) {
      throw new Error(\`Error fetching {{nameLower}}: \${error.message}\`);
    }
  }

  // Create new {{nameLower}}
  async create(data) {
    try {
      const {{nameCamel}} = new {{name}}(data);
      return await {{nameCamel}}.save();
    } catch (error) {
      throw new Error(\`Error creating {{nameLower}}: \${error.message}\`);
    }
  }

  // Update {{nameLower}}
  async update(id, data) {
    try {
      return await {{name}}.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error(\`Error updating {{nameLower}}: \${error.message}\`);
    }
  }

  // Delete {{nameLower}}
  async delete(id) {
    try {
      return await {{name}}.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(\`Error deleting {{nameLower}}: \${error.message}\`);
    }
  }

  // Add custom business logic methods here
}

module.exports = {{name}}Service;
`;