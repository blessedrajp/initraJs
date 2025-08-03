export default `import { {{name}}, I{{name}} } from '../models/{{nameLower}}.model';
import { Create{{name}}DTO, Update{{name}}DTO } from '../dto/{{nameLower}}.dto';

export class {{name}}Service {
  // Get all {{nameLower}}s
  async getAll(): Promise<I{{name}}[]> {
    try {
      return await {{name}}.find({}).exec();
    } catch (error) {
      throw new Error(\`Error fetching {{nameLower}}s: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Get {{nameLower}} by ID
  async getById(id: string): Promise<I{{name}} | null> {
    try {
      return await {{name}}.findById(id).exec();
    } catch (error) {
      throw new Error(\`Error fetching {{nameLower}}: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Create new {{nameLower}}
  async create(data: Create{{name}}DTO): Promise<I{{name}}> {
    try {
      const {{nameCamel}} = new {{name}}(data);
      return await {{nameCamel}}.save();
    } catch (error) {
      throw new Error(\`Error creating {{nameLower}}: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Update {{nameLower}}
  async update(id: string, data: Update{{name}}DTO): Promise<I{{name}} | null> {
    try {
      return await {{name}}.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      ).exec();
    } catch (error) {
      throw new Error(\`Error updating {{nameLower}}: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Delete {{nameLower}}
  async delete(id: string): Promise<I{{name}} | null> {
    try {
      return await {{name}}.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(\`Error deleting {{nameLower}}: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Find by specific field
  async findByField(field: keyof I{{name}}, value: any): Promise<I{{name}}[]> {
    try {
      const query = { [field]: value };
      return await {{name}}.find(query).exec();
    } catch (error) {
      throw new Error(\`Error finding {{nameLower}} by \${String(field)}: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Find with pagination
  async findWithPagination(
    page: number = 1,
    limit: number = 10,
    sort: string = '-createdAt'
  ): Promise<{
    data: I{{name}}[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        {{name}}.find({})
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(),
        {{name}}.countDocuments()
      ]);

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw new Error(\`Error fetching paginated {{nameLower}}s: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  // Add custom business logic methods here
}

export default {{name}}Service;
`;