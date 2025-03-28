
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleCart } from '@/lib/data';
import { CartItem as CartItemType } from '@/lib/types';
import { CartItem } from '@/components';
import Navbar from '@/components/Navbar';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCartItems(sampleCart);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const updateQuantity = (bookId: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };
  
  const removeItem = (bookId: string) => {
    setCartItems(items => items.filter(item => item.book.id !== bookId));
    toast.success("Item removed from cart");
  };
  
  const handleCheckout = () => {
    // In a real app, this would connect to your Spring Boot backend
    toast.success("Order placed successfully!");
    // Redirect to order details page
    window.location.href = "/orders/1234567";
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <Navbar isAuthenticated={false} />
      
      <div className="page-container pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-medium dark:text-white">Shopping Cart</h1>
          <ThemeToggle />
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="flex py-6 border-b dark:border-gray-700">
                <div className="h-24 w-16 bg-muted rounded"></div>
                <div className="ml-4 flex-1">
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-muted rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-card p-6 dark:bg-gray-800 dark:border-gray-700">
                {cartItems.map(item => (
                  <CartItem
                    key={item.book.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="glass-card p-6 sticky top-20 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="dark:text-white">${shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3 font-medium flex justify-between dark:border-gray-700">
                    <span className="dark:text-white">Total</span>
                    <span className="dark:text-white">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full"
                >
                  Checkout
                </button>
                
                <Link to="/books" className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary mt-4">
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
                
                {/* Sample order tracking link */}
                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                  <Link to="/orders/1234567" className="text-sm text-primary hover:underline">
                    View sample order (with tracking progress)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-12 text-center max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2 dark:text-white">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Link to="/books" className="btn-primary">
              Browse Books
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
