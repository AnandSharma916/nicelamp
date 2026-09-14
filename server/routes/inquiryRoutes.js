import express from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Submit inquiry
router.post('/', createInquiry);

// Protected Admin: Manage inquiries
router.get('/', protectAdmin, getInquiries);
router.put('/:id', protectAdmin, updateInquiry);
router.delete('/:id', protectAdmin, deleteInquiry);

export default router;
