const express = require('express');
const router = express.Router();

/**
 * GET request with response
 */
router.get('/', function (req, res) {
  res.json({
    status: 'OK!'
  });
});


router.get('/domains', async (req, res) => {

   res.json(
     [
       'http://example.org',
        'http://www.example.org',
        'http://auth.example.org',
        'http://hopefullydoesnotexist.com',
    ]
  )

});


router.get('/urls', async (req, res) => {
  res.json(
     [
        'http://auth.example.org',
        'http://www.example.org',
        'http://www.example.org/login-succeeded',
        'http://www.example.org/cookie-policy',
        'http://www.example.org/login',
        'http://www.example.org/examples',
        'http://www.example.org/examples/17312738',
        'http://www.example.org/examples/8391',
        'http://www.example.org/examples/8391820',
        'http://www.example.org/examples/271047',
        'http://www.example.org/examples/unknown',
        'http://www.example.org/404',
        'https://hopefullydoesnotexist.com',
        'https://hopefullydoesnotexist.com/login',
        'https://hopefullydoesnotexist.com/logout',
        'https://hopefullydoesnotexist.com/paste',
        'https://hopefullydoesnotexist.com/view',
        'https://hopefullydoesnotexist.com/view/jdasdlsdalls',
        'https://hopefullydoesnotexist.com/view/skadldasi29',
        'https://hopefullydoesnotexist.com/view/12sdaks2',
        'https://hopefullydoesnotexist.com/admin',
        'https://hopefullydoesnotexist.com/admin/users',
        'https://hopefullydoesnotexist.com/admin/groups',
        'https://hopefullydoesnotexist.com/admin/views',
        'https://hopefullydoesnotexist.com/admin/settings',
        'https://hopefullydoesnotexist.com/profile',
    ]
  )
});



module.exports = router;
