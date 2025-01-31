const express = require('express');
const router = express('router');
const User = require('../models/user.js');

router.get('/', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      console.log(currentUser)
      res.render('restaurants/index.ejs', {
         restaurants: currentUser.restaurants,
      })
   } catch (error) {
      console.log(error)
      res.redirect('/');
   }
})


router.get('/new', async (req, res) => {
   res.render('restaurants/new.ejs')
})


router.get('/:restaurantId', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      const restaurant = currentUser.restaurants.id(req.params.restaurantId);
      res.render('restaurants/show.ejs', {
         restaurant: restaurant,
      });
   } catch (error) {
      console.log(error);
      res.redirect('/');
   }
});
router.get('/:restaurantId/edit', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      const restaurant = currentUser.restaurants.id(req.params.restaurantId);
      res.render('restaurants/edit.ejs', {
         restaurant: restaurant,
      });
   } catch (error) {
      console.log(error);
      res.redirect('/');
   }
});

router.post('/', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.restaurants.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/restaurants`);
   } catch (error) {
      console.log(error);
      res.redirect('/');
   }
});

router.put('/:restaurantId', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      const restaurant = currentUser.restaurants.id(req.params.restaurantId);
      restaurant.set(req.body);
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/restaurants/${req.params.restaurantId}`)
   } catch (error) {
      console.log(error);
      res.redirect('/');
   }
});

router.delete('/:restaurantId', async (req, res) => {
   try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.restaurants.id(req.params.restaurantId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/restaurants`);
   } catch (error) {
      console.log(error);
      res.redirect('/')
   }
})

module.exports = router;