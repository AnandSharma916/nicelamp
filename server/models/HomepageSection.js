import mongoose from 'mongoose';

const homepageSectionSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'categories', 'about', 'featured_products', 'projects', 'cta', 'contact'],
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonLink: {
      type: String,
      default: '',
    },
    secondaryButtonText: {
      type: String,
      default: '',
    },
    secondaryButtonLink: {
      type: String,
      default: '',
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isEnabled: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const HomepageSection = mongoose.model('HomepageSection', homepageSectionSchema);
export default HomepageSection;
