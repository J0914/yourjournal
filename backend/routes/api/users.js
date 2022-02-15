const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const {
    setTokenCookie,
    requireAuth
} = require('../../utils/auth');
const {
    User
} = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
	check('code')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a code with at least 4 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];
			
// signup
router.post(
    '/',
		validateSignup,
    asyncHandler(async (req, res) => {
        const {
            email,
            password,
            code,
            username
        } = req.body;
        const user = await User.signup({
            email,
            username,
            code,
            password
        });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

//testing
// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `GIPp9su3-079werigFzymszKZ2p9XbJxMqJQ`
//     },
//     body: JSON.stringify({
//       email: 'spidey@spider.man',
//       username: 'Spidey',
//     	code: '1234',
//       password: 'password'
//     })
//   }).then(res => res.json()).then(data => console.log(data));
module.exports = router;