import SiteSettings from '../models/SiteSettings.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();

    // Auto-create default settings document if none exists yet
    if (!settings) {
      settings = await SiteSettings.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully.',
      settings,
    });
  } catch (error) {
    next(error);
  }
};
