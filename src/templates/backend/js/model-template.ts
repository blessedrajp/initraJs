export default `const mongoose = require('mongoose');

const {{nameLower}}Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  // Add more fields as needed
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes
{{nameLower}}Schema.index({ name: 1 });
{{nameLower}}Schema.index({ status: 1 });

// Virtual properties
{{nameLower}}Schema.virtual('isActive').get(function() {
  return this.status === 'active';
});

// Instance methods
{{nameLower}}Schema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

// Static methods
{{nameLower}}Schema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

// Pre-save middleware
{{nameLower}}Schema.pre('save', function(next) {
  // Add pre-save logic here
  next();
});

const {{name}} = mongoose.model('{{name}}', {{nameLower}}Schema);

module.exports = {{name}};
`;