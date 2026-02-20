import React, { useState, createContext, useContext } from 'react';

// Context for Cart Management
const CartContext = createContext();
const AuthContext = createContext();

// Sample Product Data with Real Images
const PRODUCTS = [
  {
    id: 1,
    name: "Custom Wedding Cake",
    category: "Wedding Cakes",
    price: 299,
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop",
    description: "Bespoke multi-layer masterpiece with rose-tinted buttercream, fresh flowers, and premium flavors.",
    details: "Our signature wedding cakes are custom designed for your special day. Each tier is handcrafted with premium ingredients and can be customized with your choice of flavors including vanilla bean, chocolate ganache, red velvet, lemon raspberry, and our signature rose vanilla. Minimum 2 weeks advance order required.",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Rose-Tinted Cupcakes",
    category: "Cupcakes",
    price: 24,
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&h=600&fit=crop",
    description: "Delicate vanilla cupcakes with rose water buttercream. Available in pink, cream, and gold.",
    details: "Our rose-tinted cupcakes are infused with premium rose water and topped with signature buttercream frosting. Each dozen includes an assortment of pink, cream, and gold varieties. Perfect for showers, parties, and celebrations. Made fresh daily with organic ingredients.",
    badge: null
  },
  {
    id: 3,
    name: "Artisan Muffins",
    category: "Pastries",
    price: 18,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop",
    description: "Fresh-baked with seasonal fruits. Blueberry, raspberry rose, or lemon poppy seed.",
    details: "Baked fresh each morning with premium ingredients and seasonal fruits. Choose from classic blueberry, our signature raspberry rose, or zesty lemon poppy seed. Made with organic flour and real butter. Available while supplies last.",
    badge: null
  },
  {
    id: 4,
    name: "Celebration Cake",
    category: "Cakes",
    price: 89,
    image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop",
    description: "Custom designed for birthdays and events. 8-inch round serves 10-12.",
    details: "Perfect for birthdays, anniversaries, and special occasions. Our 8-inch round cakes serve 10-12 people and can be customized with your choice of flavors and designs. Include a personalized message at no extra charge. 48-hour advance order required.",
    badge: null
  },
  {
    id: 5,
    name: "Seasonal Pastries",
    category: "Pastries",
    price: 15,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
    description: "Assorted croissants and danishes. Baked fresh each morning.",
    details: "European-style pastries made with premium butter and traditional techniques. Our rotating selection includes butter croissants, almond croissants, fruit danishes, and specialty items. Baked fresh daily starting at 6 AM.",
    badge: null
  },
  {
    id: 6,
    name: "Gourmet Dessert Box",
    category: "Gift Boxes",
    price: 32,
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&h=600&fit=crop",
    description: "French macarons, petit fours, and rose-infused treats. Elegantly packaged.",
    details: "An exquisite selection of gourmet desserts beautifully packaged in our signature gift box. Includes French macarons, petit fours, chocolate truffles, and our signature rose-infused delicacies. Perfect for gifts or entertaining. Available for same-day pickup.",
    badge: "Gift Ready"
  }
];

// Header Component
const Header = ({ currentPage, setCurrentPage, cartItemCount }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 group"
          >
            <span className="text-3xl">🌹</span>
            <span className="text-2xl font-serif font-semibold text-rose-800 group-hover:text-rose-600 transition-colors">
              Golden Rosery
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('products')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'products' ? 'text-rose-600' : 'text-gray-700 hover:text-rose-600'
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => setCurrentPage('cart')}
              className="relative text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors"
            >
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentPage('auth')}
                className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-all hover:shadow-lg"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-rose-100">
            <button 
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 rounded-lg"
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentPage('products'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 rounded-lg"
            >
              Products
            </button>
            <button 
              onClick={() => { setCurrentPage('cart'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 rounded-lg"
            >
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-600">Hi, {user.name}</div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-rose-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => { setCurrentPage('auth'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm font-medium bg-rose-500 text-white hover:bg-rose-600 rounded-lg mt-2"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

// Home Page
const HomePage = ({ setCurrentPage, setSelectedProduct }) => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-rose-200 text-rose-800 rounded-full text-sm font-semibold">
              Award-Winning Artisan Bakery
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
              Where Celebrations
              <span className="block font-semibold text-rose-700">Bloom with Sweetness</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Crafting exquisite wedding cakes and rose-inspired confections since 2018. Each creation is a work of art, meticulously handcrafted with premium ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('products')}
                className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Browse Our Menu
              </button>
              <button className="bg-white text-rose-600 border-2 border-rose-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '👰', title: 'Wedding Specialists', desc: 'Custom designs for your perfect day' },
              { icon: '🌹', title: 'Rose-Inspired', desc: 'Signature floral-infused creations' },
              { icon: '✨', title: 'Premium Quality', desc: 'Only the finest ingredients' },
              { icon: '🚚', title: 'Local Delivery', desc: 'Fresh delivery to your door' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl hover:bg-rose-50 transition-all">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-semibold text-rose-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wide mb-2">Our Specialties</p>
            <h2 className="text-4xl font-serif font-semibold text-gray-900 mb-4">Handcrafted with Love</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From elegant wedding cakes to everyday indulgences, every creation reflects our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
                onClick={() => {
                  setSelectedProduct(product);
                  setCurrentPage('product-detail');
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-rose-500 uppercase tracking-wide mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-serif font-bold text-rose-700">${product.price}</span>
                    <button className="text-rose-600 font-semibold hover:text-rose-700 flex items-center gap-2">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all shadow-lg hover:shadow-xl"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-rose-500 font-semibold text-sm uppercase tracking-wide mb-2">Testimonials</p>
            <h2 className="text-4xl font-serif font-semibold text-gray-900">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah & Michael', role: 'Wedding Clients', text: 'Our wedding cake was an absolute masterpiece! The rose-vanilla flavor was divine.' },
              { name: 'Jennifer Martinez', role: 'Corporate Client', text: 'The rose-tinted cupcakes are a huge hit. Professional service every time.' },
              { name: 'Robert Chen', role: 'Celebration Client', text: 'The attention to detail and artistry is unmatched. We\'ll be customers for life!' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-4">Ready to Order?</h2>
          <p className="text-rose-100 text-lg mb-8">
            Browse our collection or contact us for custom orders and consultations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-white text-rose-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all shadow-lg"
            >
              Order Online
            </button>
            <a href="tel:555-767-3225" className="bg-rose-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all">
              Call (555) 767-3225
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// Product Listing Page
const ProductListingPage = ({ setCurrentPage, setSelectedProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-gray-900 mb-4">Our Products</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our handcrafted collection of artisan baked goods.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:scale-105 cursor-pointer group"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentPage('product-detail');
              }}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold text-rose-500 uppercase tracking-wide mb-2">
                  {product.category}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-serif font-bold text-rose-700">${product.price}</span>
                  <button className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Product Detail Page
const ProductDetailPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={() => setCurrentPage('home')} className="hover:text-rose-600">Home</button>
          <span>/</span>
          <button onClick={() => setCurrentPage('products')} className="hover:text-rose-600">Products</button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover min-h-[500px]"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {product.badge && (
              <div className="inline-block w-fit mb-4 px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-bold uppercase">
                {product.badge}
              </div>
            )}
            <div className="text-sm font-semibold text-rose-500 uppercase tracking-wide mb-2">
              {product.category}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-serif font-bold text-rose-700 mb-6">
              ${product.price}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {product.details}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <label className="text-sm font-semibold text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full text-lg font-semibold transition-all shadow-lg ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-rose-500 text-white hover:bg-rose-600'
                }`}
              >
                {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button 
                onClick={() => setCurrentPage('products')}
                className="flex-1 bg-white text-rose-600 border-2 border-rose-500 py-4 rounded-full text-lg font-semibold hover:bg-rose-50 transition-all"
              >
                Continue Shopping
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-semibold text-gray-900">Premium Ingredients</p>
                  <p className="text-sm text-gray-600">Made with the finest organic ingredients</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚚</span>
                <div>
                  <p className="font-semibold text-gray-900">Fresh Delivery</p>
                  <p className="text-sm text-gray-600">Local delivery available</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💝</span>
                <div>
                  <p className="font-semibold text-gray-900">Custom Orders</p>
                  <p className="text-sm text-gray-600">Call us for personalized designs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Page
const CartPage = ({ setCurrentPage }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const subtotal = getCartTotal();
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some delicious treats to get started!</p>
            <button 
              onClick={() => setCurrentPage('products')}
              className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all shadow-lg"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-semibold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex gap-6">
                  <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-semibold text-rose-500 uppercase">{item.product.category}</p>
                        <h3 className="text-xl font-serif font-semibold text-gray-900">{item.product.name}</h3>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-2xl font-serif font-bold text-rose-700 mb-4">${item.product.price}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-xl font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8.5%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">Total</span>
                    <span className="text-3xl font-serif font-bold text-rose-700">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-rose-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all shadow-lg mb-3">
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setCurrentPage('products')}
                className="w-full bg-white text-rose-600 border-2 border-rose-500 py-3 rounded-full font-semibold hover:bg-rose-50 transition-all"
              >
                Continue Shopping
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-2">Questions or Custom Orders?</p>
                <a href="tel:555-767-3225" className="text-rose-600 font-semibold text-lg hover:text-rose-700">
                  (555) 767-3225
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Auth Page (Login/Register)
const AuthPage = ({ setCurrentPage }) => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ name: formData.email.split('@')[0], email: formData.email });
      setCurrentPage('home');
    } else {
      login({ name: formData.name, email: formData.email });
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-rose-50 to-white py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl">🌹</span>
            <h1 className="text-3xl font-serif font-semibold text-rose-800">Golden Rosery</h1>
          </div>
          <p className="text-gray-600">Welcome back! Please login to continue.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isLogin 
                  ? 'bg-rose-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isLogin 
                  ? 'bg-rose-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-rose-600 hover:text-rose-700 font-semibold">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-all shadow-lg hover:shadow-xl"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-600 hover:text-rose-600 font-semibold"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {!isLogin && (
          <p className="text-center text-sm text-gray-600 mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        )}
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌹</span>
              <h3 className="text-xl font-serif font-semibold text-rose-300">Golden Rosery</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Award-winning artisan bakery specializing in custom wedding cakes and rose-inspired confections since 2018.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-rose-300 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-rose-300 transition-colors">Our Products</a></li>
              <li><a href="#" className="hover:text-rose-300 transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-rose-300 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-rose-300 mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-300 transition-colors">Wedding Cakes</a></li>
              <li><a href="#" className="hover:text-rose-300 transition-colors">Custom Orders</a></li>
              <li><a href="#" className="hover:text-rose-300 transition-colors">Corporate Catering</a></li>
              <li><a href="#" className="hover:text-rose-300 transition-colors">Gift Boxes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-rose-300 mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:555-767-3225" className="hover:text-rose-300 transition-colors">(555) 767-3225</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@goldenrosery.com" className="hover:text-rose-300 transition-colors">hello@goldenrosery.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>123 Rose Garden Lane<br />Sweet Valley, CA 90210</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2024 Golden Rosery. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-rose-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-rose-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-rose-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { id: Date.now(), product, quantity }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getCartTotal }}>
        <div className="min-h-screen flex flex-col">
          <Header 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            cartItemCount={cartItemCount}
          />
          
          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage 
                setCurrentPage={setCurrentPage} 
                setSelectedProduct={setSelectedProduct}
              />
            )}
            {currentPage === 'products' && (
              <ProductListingPage 
                setCurrentPage={setCurrentPage}
                setSelectedProduct={setSelectedProduct}
              />
            )}
            {currentPage === 'product-detail' && selectedProduct && (
              <ProductDetailPage 
                product={selectedProduct}
                setCurrentPage={setCurrentPage}
              />
            )}
            {currentPage === 'cart' && (
              <CartPage setCurrentPage={setCurrentPage} />
            )}
            {currentPage === 'auth' && (
              <AuthPage setCurrentPage={setCurrentPage} />
            )}
          </main>

          <Footer />
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
