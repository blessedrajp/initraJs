export default `const Joi = require('joi');

// Create {{name}} DTO
const create{{name}}DTO = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),
  
  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  
  status: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .messages({
      'any.only': 'Status must be either active or inactive'
    })
  
  // Add more validation rules as needed
});

// Update {{name}} DTO
const update{{name}}DTO = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .messages({
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),
  
  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  
  status: Joi.string()
    .valid('active', 'inactive')
    .optional()
    .messages({
      'any.only': 'Status must be either active or inactive'
    })
  
  // Add more validation rules as needed
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Query {{name}} DTO
const query{{name}}DTO = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),
  
  sortBy: Joi.string()
    .valid('name', 'createdAt', 'updatedAt')
    .default('createdAt'),
  
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc'),
  
  search: Joi.string()
    .optional()
    .allow(''),
  
  status: Joi.string()
    .valid('active', 'inactive')
    .optional()
});

module.exports = {
  create{{name}}DTO,
  update{{name}}DTO,
  query{{name}}DTO
};
`;