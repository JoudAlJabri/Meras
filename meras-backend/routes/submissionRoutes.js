const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  createSubmission,
  gradeSubmission,
  getSubmissionsByGuide,
  getSubmissionsByExplorer,
  getSubmissionById,
} = require('../controllers/submissionController');

const protect = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', protect, requireRole('explorer'), upload.single('file'), createSubmission);
router.patch('/:id/grade', protect, requireRole('guide'), gradeSubmission);
router.get('/guide/:guideId', protect, requireRole('guide', 'admin'), getSubmissionsByGuide);
router.get('/explorer/:explorerId', protect, requireRole('explorer', 'admin'), getSubmissionsByExplorer);
router.get('/:id', protect, getSubmissionById);

module.exports = router;
