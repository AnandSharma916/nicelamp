import Inquiry from '../models/Inquiry.js';
import Product from '../models/Product.js';

// @desc    Submit new inquiry from public website / product modal
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, company, productId, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    let productName = '';
    let productSku = '';
    let productRef = null;

    if (productId) {
      const product = await Product.findById(productId);
      if (product) {
        productRef = product._id;
        productName = product.name;
        productSku = product.sku;
      }
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      company: company ? company.trim() : '',
      product: productRef,
      productName,
      productSku,
      message: message.trim(),
      status: 'New',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you. Your inquiry has been submitted. Our architectural lighting consultant will respond shortly.',
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries for admin
// @route   GET /api/inquiries
// @access  Private (Admin)
export const getInquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { company: searchRegex },
        { productName: searchRegex },
        { productSku: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const skip = (pageNum - 1) * pageSize;

    const total = await Inquiry.countDocuments(query);
    const inquiries = await Inquiry.find(query)
      .populate('product', 'name sku slug images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    // Count inquiries by status for admin badges
    const statusCounts = {
      total: await Inquiry.countDocuments(),
      new: await Inquiry.countDocuments({ status: 'New' }),
      contacted: await Inquiry.countDocuments({ status: 'Contacted' }),
      completed: await Inquiry.countDocuments({ status: 'Completed' }),
    };

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / pageSize),
      statusCounts,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status & admin notes
// @route   PUT /api/inquiries/:id
// @access  Private (Admin)
export const updateInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    const { status, adminNotes } = req.body;

    if (status && ['New', 'Contacted', 'Completed'].includes(status)) {
      inquiry.status = status;
    }

    if (adminNotes !== undefined) {
      inquiry.adminNotes = adminNotes;
    }

    await inquiry.save();

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully.',
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    await inquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
