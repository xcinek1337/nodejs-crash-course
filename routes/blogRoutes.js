const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// nasluchuje na zadanie danych - czyli default metoda w http
router.get('/', blogController.blog_index);
// blogController to jest funkcja,wiec wrzucam w miejsce callbacka metody get - NIE WRZUCAM TEGO W SRODEK CALLBACKA FUNKCJI GET

//tutaj serve nasluchuje na porcie .../blogs na metode POST
// p.s (ponizej jest '/', dlatego ze jako argument w app.use przekazuje blogs, zeby nie powtarzac wszedzie blogs) 
//ponizewam form action jest ustawiony na ten sam port co router.post nasluchuje czyli blogs
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;
