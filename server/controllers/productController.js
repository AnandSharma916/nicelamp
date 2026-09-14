import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { slugify } from '../utils/slugify.js';

// @desc    Get all products with filtering, search, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      featured,
      published,
      sort = 'sortOrder',
      page = 1,
      limit = 12,
      admin = 'false',
    } = req.query;

    const query = {};

    // For public website, only return published products unless admin explicitly requests all
    if (admin === 'true') {
      if (published !== undefined && published !== '') {
        query.isPublished = published === 'true';
      }
    } else {
      query.isPublished = true;
    }

    // Filter by featured
    if (featured !== undefined && featured !== '') {
      query.isFeatured = featured === 'true';
    }

    // Filter by category (can be slug or category ID)
    if (category && category !== 'all') {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const foundCategory = await Category.findOne({ slug: category });
        if (foundCategory) {
          query.category = foundCategory._id;
        } else {
          return res.status(200).json({
            success: true,
            products: [],
            total: 0,
            page: Number(page),
            totalPages: 0,
          });
        }
      }
    }

    // Search query: search by name, SKU, shortDescription, or material
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { sku: searchRegex },
        { shortDescription: searchRegex },
        { 'specifications.material': searchRegex },
        { 'specifications.finish': searchRegex },
      ];
    }

    // Sorting
    let sortOption = {};
    switch (sort) {
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'name_asc':
        sortOption = { name: 1 };
        break;
      case 'name_desc':
        sortOption = { name: -1 };
        break;
      case 'sku_asc':
        sortOption = { sku: 1 };
        break;
      case 'sortOrder':
      default:
        sortOption = { sortOrder: 1, createdAt: -1 };
        break;
    }

    // Pagination
    const pageNumber = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNumber - 1) * pageSize;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / pageSize),
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with slug '${req.params.slug}' not found.`,
      });
    }

    // Find related products in the same category
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id },
      isPublished: true,
    })
      .populate('category', 'name slug')
      .limit(4)
      .sort({ sortOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      product,
      relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID (Admin)
// @route   GET /api/products/id/:id
// @access  Private (Admin)
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      slug,
      sku,
      category,
      shortDescription,
      description,
      images,
      specifications,
      pdfUrl,
      isFeatured,
      isPublished,
      sortOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!name || !sku || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, SKU, and Category are required.',
      });
    }

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Selected category does not exist.',
      });
    }

    // Check SKU uniqueness
    const normalizedSku = sku.trim().toUpperCase();
    const skuExists = await Product.findOne({ sku: normalizedSku });
    if (skuExists) {
      return res.status(400).json({
        success: false,
        message: `Product with SKU '${normalizedSku}' already exists.`,
      });
    }

    // Generate unique slug
    let baseSlug = slug ? slugify(slug) : slugify(name);
    let finalSlug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const product = await Product.create({
      name: name.trim(),
      slug: finalSlug,
      sku: normalizedSku,
      category,
      shortDescription: shortDescription || '',
      description: description || '',
      images: Array.isArray(images) ? images : [],
      specifications: specifications || {},
      pdfUrl: pdfUrl || '',
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      sortOrder: Number(sortOrder) || 0,
      seoTitle: seoTitle || name.trim(),
      seoDescription: seoDescription || shortDescription || '',
    });

    const populatedProduct = await Product.findById(product._id).populate('category', 'name slug');

    res.status(201).json({
      success: true,
      product: populatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    const {
      name,
      slug,
      sku,
      category,
      shortDescription,
      description,
      images,
      specifications,
      pdfUrl,
      isFeatured,
      isPublished,
      sortOrder,
      seoTitle,
      seoDescription,
    } = req.body;

    if (name) product.name = name.trim();

    if (sku) {
      const normalizedSku = sku.trim().toUpperCase();
      if (normalizedSku !== product.sku) {
        const skuExists = await Product.findOne({ sku: normalizedSku, _id: { $ne: product._id } });
        if (skuExists) {
          return res.status(400).json({
            success: false,
            message: `SKU '${normalizedSku}' is already assigned to another product.`,
          });
        }
        product.sku = normalizedSku;
      }
    }

    if (slug) {
      const newSlug = slugify(slug);
      if (newSlug !== product.slug) {
        const slugExists = await Product.findOne({ slug: newSlug, _id: { $ne: product._id } });
        if (slugExists) {
          return res.status(400).json({
            success: false,
            message: `Slug '${newSlug}' is already assigned to another product.`,
          });
        }
        product.slug = newSlug;
      }
    }

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: 'Selected category does not exist.',
        });
      }
      product.category = category;
    }

    if (shortDescription !== undefined) product.shortDescription = shortDescription;
    if (description !== undefined) product.description = description;
    if (images !== undefined) product.images = images;
    if (specifications !== undefined) product.specifications = specifications;
    if (pdfUrl !== undefined) product.pdfUrl = pdfUrl;
    if (isFeatured !== undefined) product.isFeatured = Boolean(isFeatured);
    if (isPublished !== undefined) product.isPublished = Boolean(isPublished);
    if (sortOrder !== undefined) product.sortOrder = Number(sortOrder);
    if (seoTitle !== undefined) product.seoTitle = seoTitle;
    if (seoDescription !== undefined) product.seoDescription = seoDescription;

    await product.save();

    const updatedProduct = await Product.findById(product._id).populate('category', 'name slug');

    res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate product
// @route   POST /api/products/:id/duplicate
// @access  Private (Admin)
export const duplicateProduct = async (req, res, next) => {
  try {
    const original = await Product.findById(req.params.id);

    if (!original) {
      return res.status(404).json({
        success: false,
        message: 'Original product not found.',
      });
    }

    // Generate new unique SKU and slug
    const newSku = `${original.sku}-COPY-${Date.now().toString().slice(-4)}`;
    const newName = `${original.name} (Copy)`;
    const newSlug = slugify(`${original.slug}-copy-${Date.now().toString().slice(-4)}`);

    const clonedProduct = await Product.create({
      name: newName,
      slug: newSlug,
      sku: newSku,
      category: original.category,
      shortDescription: original.shortDescription,
      description: original.description,
      images: original.images,
      specifications: original.specifications,
      pdfUrl: original.pdfUrl,
      isFeatured: false,
      isPublished: false, // Start as draft/unpublished
      sortOrder: (original.sortOrder || 0) + 1,
      seoTitle: newName,
      seoDescription: original.seoDescription,
    });

    const populated = await Product.findById(clonedProduct._id).populate('category', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product duplicated successfully as draft.',
      product: populated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle published status
// @route   PATCH /api/products/:id/toggle-publish
// @access  Private (Admin)
export const togglePublish = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.isPublished ? 'published' : 'unpublished'}.`,
      isPublished: product.isPublished,
    });
  } catch (error) {
    next(error);
  }
};
