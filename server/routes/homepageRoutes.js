import express from 'express';
import {
  getHomepage,
  getAllSections,
  updateSection,
  reorderSections,
} from '../controllers/homepageController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get rendered active sections in order
router.get('/', getHomepage);

// Protected Admin: Manage sections
router.get('/sections', protectAdmin, getAllSections);
router.put('/sections/reorder', protectAdmin, reorderSections);
router.put('/sections/:id', protectAdmin, updateSection);

export default router;
