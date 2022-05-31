// Edits to incorporate myattic images seeds, categories 0-5, now fully loaded...
// description, price, quantity (fake estimates; images represent a unique item as is)
const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Artwork' },
    { name: 'Furniture' },
    { name: 'Glassware' },
    { name: 'Housewares' },
    { name: 'Instruments' },
    { name: 'Tableware' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Woven Basket with Handle',
      description:
        'One of our many baskets in all shapes and sizes',
      image: 'basket-woven.jpg',
      category: categories[3]._id,
      price: 9.99,
      quantity: 100
    },
    {
      name: 'BluRay Disc Audio/Video Player',
      description:
        'Sony Blu-Ray Disc Audio/Video Player, connects to SurroundSound system--one of many classic stereo system components from myattic.',
      image: 'bluray-player.jpg',
      category: categories[4]._id,
      price: 49.99,
      quantity: 10
    },
    {
      name: 'Wire Centrepiece',
      category: categories[0]._id,
      description:
        'One of many senior-citizen arts and crafts works from myattic to your table',
      image: 'centrepiece-wire.jpg',
      price: 4.99,
      quantity: 25
    },
    {
      name: 'Ceramic Vase',
      category: categories[5]._id,
      description:
        'Lovely blue-flower ceramic vase 10-inch height; one of many such items.',
      image: 'ceramic-vase.jpg',
      price: 19.99,
      quantity: 50
    },
    {
      name: 'China Bowl',
      category: categories[5]._id,
      description:
        'White cabbage-leaf design in bone china, 10-inch diameter',
      image: 'china-bowl.jpg',
      price: 19.99,
      quantity: 30
    },
    {
      name: 'Console Table',
      category: categories[1]._id,
      description:
        'Classic console table from front hall or dining room sideboard, interior shelf; myttic has several similar',
      image: 'console-table.jpg',
      price: 199.99,
      quantity: 10
    },
    {
      name: 'Crystal Bowl',
      category: categories[2]._id,
      description:
        'Crystal bowl in classic cross-and-olive pattern; myattic has several similar items',
      image: 'tablet.jpg',
      price: 39.99,
      quantity: 20
    },
    {
      name: 'Waterford Brandy Glass',
      category: categories[2]._id,
      description:
        'Waterford Crystal: 12-oz brandy glass; beautiful Colleen pattern; myattic has links to most rare Waterford items, including some complete sets!',
      image: 'brandy-glass.jpg',
      price: 69.99,
      quantity: 50
    },
    {
      name: 'Waterford Claret Glass',
      category: categories[2]._id,
      description: 'Waterford Crystal: 4.5-oz claret glass; classic Colleen pattern; myattic has links to most rare Waterford items, including some complete sets!',
      image: 'claret-glass.jpg',
      price: 69.99,
      quantity: 100
    },
    {
      name: 'Drum Table',
      category: categories[1]._id,
      description:
        'Everyone should have one of these; holds a lamp on top, games and other stuff inside; also your late-aunts will!',
      image: 'drum-table.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Electronic Keyboard',
      category: categories[4]._id,
      description:
        'Roland electronic digital keyboard, full 88-key weighted-action keyboard, 3-pedals, MIDI interace.',
      image: 'electronic-keyboard.jpg',
      price: 399.99,
      quantity: 10
    },
    {
      name: 'Farmstyle Rocking Chair',
      category: categories[1]._id,
      description:
        'Farmstyle rocking chair from the days when chairs were comfortable; fantastic.',
      image: 'farmstyle-rocker.jpg',
      price: 9.99,
      quantity: 20
    },
    {
      name: 'Flatiron Building Stitchwork',
      category: categories[0]._id,
      description:
        'Another example of charming seniors arts & crafts from myattic; lots of different items',
      image: 'flatiron-building-stitchwork.jpg',
      price: 9.99,
      quantity: 200
    },
    {
      name: 'Flatware Set',
      category: categories[5]._id,
      description:
        'Flatware Set 12-place setting, this one with lots of extras: knives, forks, spoons, serving items; my attic has lots of these, but this one is unique',
      image: 'flatware-set.jpg',
      price: 199.99,
      quantity: 1
    },
    {
      name: 'Korean Secret Box',
      category: categories[3]._id,
      description:
        'Beautiful piece of Korean arts & crafts; opens up to reveal push-out secret drawers; great and practical coffee-table conversation piece.',
      image: 'korean-box.jpg',
      price: 74.99,
      quantity: 1
    },
    {
      name: 'Mini Tools Set',
      category: categories[3]._id,
      description:
        'Mini Tools Set: every attic has a few tools to pass on; this grouping one 100s from myattic.',
      image: 'mini-tools.jpg',
      price: 29.99,
      quantity: 400
    },
    {
      name: 'Napkin Rings',
      category: categories[5]._id,
      description:
        'Napkin Rings, set of four, engraved metal; really helps set table!',
      image: 'napkin-rings.jpg',
      price: 12.99,
      quantity: 200
    },
    {
      name: 'Nursing Rocking Chair',
      category: categories[1]._id,
      description:
        'Beautiful low-to-ground rocker; originally designed from nursing mothers; this one unique but we keep looking.',
      image: 'nursing-rocker.jpg',
      price: 98.99,
      quantity: 1
    },
    {
      name: 'Oil Painting',
      category: categories[0]._id,
      description:
        'Oil Painting: this one by John E Rutherford, a brooding landscape of "Tralee" in Ireland; my attic has 100s of artworks such as this; a separate catalog link is under development.',
      image: 'oil-painting.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Pants Press',
      category: categories[2]._id,
      description:
        'Corby Pants Press: yes, this is the original you sometimes find in hotel rooms and wonder, heh? Well, here it is from myattic.',
      image: 'pants-press.jpg',
      price: 49.00,
      quantity: 15
    },   
    {
      name: 'Piano Chair',
      category: categories[1]._id,
      description:
        'Piano Chair: very solid, height-adjustable, as used by professional players; from my attic at 1/4 the price.',
      image: 'piano-chair.jpg',
      price: 99.99,
      quantity: 50
    },
    {
      name: 'Pill Box',
      category: categories[3]._id,
      description:
        'Pill box: myattic loves finding this sort of simple, practical item; charming.',
      image: 'pill-box.jpg',
      price: 9.99,
      quantity: 40
    },
    {
      name: 'Salt & Pepper Set',
      category: categories[5]._id,
      description:
        'Salt & Pepper Set; we love this one, and we make many other such classic S&P designs from the previous millenium available to you!',
      image: 'salt&pepper.jpg',
      price: 29.99,
      quantity: 60
    },
    {
      name: 'Woofer Speaker',
      category: categories[4]._id,
      description:
        'Woofer Speaker: from Sony surround-sound speaker set; myattic has access to parts and full systems.',
      image: 'woofer-speaker.jpg',
      price: 39.99,
      quantity: 40
    },
  
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    username: 'tester',
    email: 'test@test.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
