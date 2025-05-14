const Cart = require("../model/cart");

async function findOrCreateCart(userId) {
  const userIdNumber = parseInt(userId, 10);
  console.log(`Searching for cart with userId: ${userIdNumber}`);
  let cart = await Cart.findOne({ where: { userId: userIdNumber } });
  if (!cart) {
    console.log("No cart found and new creating.");
    cart = await Cart.create({ userId: userIdNumber, items: [] });
  } else {
    console.log("Found cart:", cart.toJSON());
  }
  return cart;
}

exports.addProductToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const cart = await findOrCreateCart(userId);
    const newItems = [...cart.items]; 
    const idx = newItems.findIndex(i => i.productId === productId);
    if (idx > -1) {
      newItems[idx].quantity += quantity;
    } else {
      newItems.push({ productId, quantity });
    }
    cart.items = newItems; 
    await cart.save(); 
    res.json({ status: "Added to cart", cart });
  } catch (err) {
    console.error("addProductToCart error:", err);
    res.status(400).json({ error: err.message });
  }
};

// exports.addProductToCart = async (req, res) => {
//   try {
//     console.log("addProductToCart body:", req.body);
//     const userId = parseInt(req.user.id, 10);
//     const { productId, quantity } = req.body;
//     console.log("Adding productId:", productId, "quantity:", quantity, "for userId:", userId);
//     const cart = await findOrCreateCart(userId);
//     const items = cart.items;
//     const idx = items.findIndex(i => i.productId === productId);
//     if (idx > -1) {
//       items[idx].quantity += quantity;
//     } else {
//       items.push({ productId, quantity });
//     }

//     cart.items = items;
//     console.log(">> New items array:", items);
//     cart.updatedAt = new Date();
//     await cart.save();
//     console.log(">> Cart after save:", cart.toJSON());


//     res.json({ status: "Added to cart", cart });
//   } catch (err) {
//     console.error("addProductToCart error:", err);
//     res.status(400).json({ error: err.message });
//   }
// };

exports.getAllCartItems = async (req, res) => {
  try {
    const userId = parseInt(req.user.id, 10);
    const cart = await findOrCreateCart(userId);
    console.log(">> getAllCartItems — returning items:", cart.items)
    res.json(cart.items);
  } catch (err) {
    console.error("getAllCartItems error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = parseInt(req.user.id, 10);
    const { productId } = req.params;
    const cart = await findOrCreateCart(userId);
    const items = cart.items.filter(i => i.productId !== productId);
    cart.items = items;
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ status: "Item removed", items });
  } catch (err) {
    console.error("removeItem error:", err);
    res.status(500).json({ error: err.message });
  }
};
// controllers/cartController.js
// controllers/cartController.js
// controllers/cartController.js
// controllers/cartController.js
// controllers/cartController.js
// const Cart = require("../model/cart");

// // Helper: always returns a Cart instance (creates one if missing)
// async function findOrCreateCart(userId) {
//   const [cart, created] = await Cart.findOrCreate({
//     where:    { userId },
//     defaults: { items: [] }
//   });
//   console.log(`Cart for user ${userId} ${created ? "created" : "found"}`);
//   return cart;
// }

// exports.addProductToCart = async (req, res) => {
//   try {
//     console.log(" addProductToCart req.body:", req.body);
//     const userId = Number(req.user.id);
//     let { productId, quantity } = req.body;
//     quantity = Number(quantity);

//     if (!productId || isNaN(quantity) || quantity < 1) {
//       return res.status(400).json({ error: "Invalid productId or quantity" });
//     }

//     const cart = await findOrCreateCart(userId);

//     // Take the old items (always an array), build a brand-new array for update
//     const oldItems = Array.isArray(cart.items) ? cart.items : [];
//     let newItems;
//     const idx = oldItems.findIndex(i => i.productId === productId);
//     if (idx > -1) {
//       newItems = oldItems.map((item, i) =>
//         i === idx
//           ? { productId, quantity: item.quantity + quantity }
//           : item
//       );
//     } else {
//       newItems = [...oldItems, { productId, quantity }];
//     }

//     // Explicitly update only the JSON + timestamp
//     await cart.update({
//       items:     newItems,
//       updatedAt: new Date()
//     });

//     await cart.reload();
//     console.log(" after add/update:", cart.toJSON());

//     res.json({ status: "Added to cart", cart });
//   } catch (err) {
//     console.error("addProductToCart error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getAllCartItems = async (req, res) => {
//   try {
//     console.log("getAllCartItems for user:", req.user.id);
//     const userId = Number(req.user.id);
//     const cart   = await findOrCreateCart(userId);

//     console.log(" getAllCartItems fetched:", cart.toJSON());
//     res.json(Array.isArray(cart.items) ? cart.items : []);
//   } catch (err) {
//     console.error("getAllCartItems error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.removeItem = async (req, res) => {
//   try {
//     const userId    = Number(req.user.id);
//     const productId = req.params.productId;
//     const cart      = await findOrCreateCart(userId);
//     const oldItems = Array.isArray(cart.items) ? cart.items : [];
//     const newItems = oldItems.filter(i => i.productId !== productId);

//     await cart.update({
//       items:     newItems,
//       updatedAt: new Date()
//     });

//     await cart.reload();
//     console.log("after remove/update:", cart.toJSON());

//     res.json({ status: "Item removed", items: newItems });
//   } catch (err) {
//     console.error("removeItem error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };




