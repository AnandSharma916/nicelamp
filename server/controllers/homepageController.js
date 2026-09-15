import HomepageSection from '../models/HomepageSection.js';

// @desc    Get active homepage sections in user-defined order
// @route   GET /api/homepage
// @access  Public
export const getHomepage = async (req, res, next) => {
  try {
    const sections = await HomepageSection.find({ isEnabled: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: sections.length,
      sections,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all homepage sections (including disabled) for Admin CMS
// @route   GET /api/homepage/sections
// @access  Private (Admin)
export const getAllSections = async (req, res, next) => {
  try {
    const sections = await HomepageSection.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: sections.length,
      sections,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update single homepage section
// @route   PUT /api/homepage/sections/:id
// @access  Private (Admin)
export const updateSection = async (req, res, next) => {
  try {
    const section = await HomepageSection.findById(req.params.id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Homepage section not found.',
      });
    }

    const {
      title,
      subtitle,
      description,
      content,
      badge,
      image,
      images,
      cta,
      buttonText,
      buttonLink,
      secondaryCta,
      secondaryButtonText,
      secondaryButtonLink,
      metadata,
      isEnabled,
      order,
    } = req.body;

    if (title !== undefined) section.title = title;
    if (subtitle !== undefined) section.subtitle = subtitle;
    if (description !== undefined) section.description = description;
    else if (content !== undefined) section.description = content;

    if (images !== undefined) {
      section.images = Array.isArray(images) ? images : [images].filter(Boolean);
    } else if (image !== undefined) {
      section.images = image ? [image] : [];
    }

    if (buttonText !== undefined) section.buttonText = buttonText;
    else if (cta?.text !== undefined) section.buttonText = cta.text;

    if (buttonLink !== undefined) section.buttonLink = buttonLink;
    else if (cta?.link !== undefined) section.buttonLink = cta.link;

    if (secondaryButtonText !== undefined) section.secondaryButtonText = secondaryButtonText;
    else if (secondaryCta?.text !== undefined) section.secondaryButtonText = secondaryCta.text;

    if (secondaryButtonLink !== undefined) section.secondaryButtonLink = secondaryButtonLink;
    else if (secondaryCta?.link !== undefined) section.secondaryButtonLink = secondaryCta.link;

    if (badge !== undefined) {
      section.metadata = { ...(section.metadata || {}), badge };
    }
    if (metadata !== undefined) {
      section.metadata = { ...(section.metadata || {}), ...metadata };
    }
    if (isEnabled !== undefined) section.isEnabled = Boolean(isEnabled);
    if (order !== undefined) section.order = Number(order);

    await section.save();

    res.status(200).json({
      success: true,
      message: `${section.name} section updated successfully.`,
      section,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reorder homepage sections (Drag and Drop section management)
// @route   PUT /api/homepage/sections/reorder
// @access  Private (Admin)
export const reorderSections = async (req, res, next) => {
  try {
    const { orderedIds } = req.body; // Array of section ID strings in new order [id1, id2, id3...]

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'orderedIds must be a non-empty array of section IDs.',
      });
    }

    const updatePromises = orderedIds.map((id, index) =>
      HomepageSection.findByIdAndUpdate(id, { order: index }, { new: true })
    );

    await Promise.all(updatePromises);

    const updatedSections = await HomepageSection.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: 'Homepage sections reordered successfully.',
      sections: updatedSections,
    });
  } catch (error) {
    next(error);
  }
};
