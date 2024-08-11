const express = require('express')
const { body, validationResult } = require('express-validator')
const { register, login, token, upload } = require('../controllers/authController')

const router = express.Router()


// root
router.get('/', (req, res) => {
  res.send('Welome to Solve-Ease Backend!');
});

// health-check
router.get('/health-check', (req, res) => {
  res.status(500).json({ message: 'Status : OK' })

});


router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  register
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
)
router.post('/token', token)

router.post('/create-profile', [
  body('fullName').isLength({ min: 3 }).withMessage('Full Name must be at least 3 characters long'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('birthday').optional().isISO8601().toDate().withMessage('Invalid date format'),
  body('skills').optional().isString(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Continue with profile creation logic
});




router.post('/upload-profile-pic', upload.single('profileImage'), (req, res) => {
  res.send('File uploaded to S3!');
});

// additional profile details
router.post('/additional-profile-details', [
  body('education').optional().isString(),
  body('occupation').optional().isString(),
  body('interests').optional().isString(),
  body('languages').optional().isString(),
  body('twitter').optional().isString(),
  body('instagram').optional().isString(),
  body('linkedin').optional().isString(),
  body('github').optional().isString(),
  body('website').optional().isURL(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { education, occupation, interests, languages, twitter, instagram, linkedin, github, website } = req.body;
  const userId = req.user.id; // Assuming you have user authentication in place

  try {
    const additionalDetails = await prisma.additionalDetails.create({
      data: {
        education,
        occupation,
        interests,
        languages,
        twitter,
        instagram,
        linkedin,
        github,
        website,
        userId
      }
    });
    res.status(200).json({ message: 'Additional details added successfully!', details: additionalDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error adding details', error });
  }
});

module.exports = router

