   const { body, validationResult } = require('express-validator');

   // Validation rules for user registration
   exports.validateRegister = [
     body('email').isEmail().withMessage('Please enter a valid email address.'),
     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
     (req, res, next) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       next();
     }
   ];
   