import mongoose from 'mongoose';

const productImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  isCover: {
    type: Boolean,
    default: false,
  },
  publicId: {
    type: String,
    default: '',
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [180, 'Product name cannot exceed 180 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    sku: {
      type: String,
      required: [true, 'Product SKU is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
      index: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    images: {
      type: [productImageSchema],
      default: [],
    },
    specifications: {
      dimensions: { type: String, default: '' },
      material: { type: String, default: '' },
      finish: { type: String, default: '' },
      wattage: { type: String, default: '' },
      voltage: { type: String, default: '' },
      colorTemperature: { type: String, default: '' },
      ipRating: { type: String, default: '' },
      installationType: { type: String, default: '' },
      beamAngle: { type: String, default: '' },
      cri: { type: String, default: '' },
      luminousFlux: { type: String, default: '' },
    },
    pdfUrl: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    seoTitle: {
      type: String,
      trim: true,
      default: '',
    },
    seoDescription: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Full-text search index for fast searching across name, SKU, and descriptions
productSchema.index({
  name: 'text',
  sku: 'text',
  shortDescription: 'text',
  description: 'text',
  'specifications.material': 'text',
  'specifications.finish': 'text',
});

const Product = mongoose.model('Product', productSchema);
export default Product;
