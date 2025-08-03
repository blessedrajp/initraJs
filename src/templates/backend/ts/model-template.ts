export default `import { Schema, Document, model } from 'mongoose';

export interface I{{name}} extends Document {
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdBy?: Schema.Types.ObjectId;
  updatedBy?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  // Virtual properties
  isActive: boolean;
}

const {{nameLower}}Schema = new Schema<I{{name}}>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    unique: true
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
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
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
{{nameLower}}Schema.index({ createdAt: -1 });

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

{{nameLower}}Schema.statics.findByName = function(name: string) {
  return this.findOne({ name: new RegExp(name, 'i') });
};

// Pre-save middleware
{{nameLower}}Schema.pre('save', function(next) {
  // Add pre-save logic here
  if (this.isModified('name')) {
    this.name = this.name.trim();
  }
  next();
});

// Pre-update middleware
{{nameLower}}Schema.pre('findOneAndUpdate', function(next) {
  // Add pre-update logic here
  this.set({ updatedAt: new Date() });
  next();
});

export const {{name}} = model<I{{name}}>('{{name}}', {{nameLower}}Schema);
export default {{name}};
`;