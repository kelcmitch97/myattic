// Don's edits to incorporate myattic images seeds, categories 0-5
// description, price, quantity (add some estimates, though actually 1 at present)
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
      price: 2.99,
      quantity: 500
    },
    {
      name: 'BluRay Disc Audio/Video Player',
      description:
        'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
      image: 'bluray-player.jpg',
      category: categories[4]._id,
      price: 1.99,
      quantity: 500
    },
    {
      name: 'Wire Centrepiece',
      category: categories[0]._id,
      description:
        'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
      image: 'centrepiece-wire.jpg',
      price: 7.99,
      quantity: 20
    },
    {
      name: 'Ceramic Vase',
      category: categories[5]._id,
      description:
        'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
      image: 'ceramic-vase.jpg',
      price: 3.99,
      quantity: 50
    },
    {
      name: 'China Bowl',
      category: categories[5]._id,
      description:
        'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
      image: 'china-bowl.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Console Table',
      category: categories[1]._id,
      description:
        'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
      image: 'console-table.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Crystal Bowl',
      category: categories[2]._id,
      description:
        'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
      image: 'tablet.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'Waterford Brandy Glass',
      category: categories[2]._id,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
      image: 'brandy-glass.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Waterford Claret Glass',
      category: categories[2]._id,
      description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
      image: 'claret-glass.jpg',
      price: 1.99,
      quantity: 1000
    },
    {
      name: 'Drum Table',
      category: categories[1]._id,
      description:
        'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
      image: 'drum-table.jpg',
      price: 2.99,
      quantity: 1000
    },
    {
      name: 'Electronic Keyboard',
      category: categories[4]._id,
      description:
        'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
      image: 'electronic-keyboard.jpg',
      price: 7.99,
      quantity: 100
    },
    {
      name: 'Farmstyle Rocking Chair',
      category: categories[1]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'farmstyle-rocker.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Flatiron Building Stitchwork',
      category: categories[0]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'flatiron-building-stitchwork.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Flatware Set',
      category: categories[5]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'flatware-set.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Korean Secret Box',
      category: categories[3]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'korean-box.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Mini Tools Set',
      category: categories[3]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'mini-tools.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Napkin Rings',
      category: categories[5]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'napkin-rings.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Nursing Rocking Chair',
      category: categories[1]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'nursing-rocker.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Oil Painting',
      category: categories[0]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'oil-painting.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Pants Press',
      category: categories[2]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'pants-press.jpg',
      price: 9.99,
      quantity: 600
    },   
    {
      name: 'Piano Chair',
      category: categories[1]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'piano-chair.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Pill Box',
      category: categories[3]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'pill-box.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Salt & Pepper Set',
      category: categories[5]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'salt&pepper.jpg',
      price: 9.99,
      quantity: 600
    },
    {
      name: 'Woofer Speaker',
      category: categories[4]._id,
      description:
        'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
      image: 'woofer-speaker.jpg',
      price: 9.99,
      quantity: 600
    },
  
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
