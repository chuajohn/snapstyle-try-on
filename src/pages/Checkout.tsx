
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const Checkout: React.FC = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const total = getCartTotal();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your purchase!",
      });
    }, 1000);
  };
  
  if (orderPlaced) {
    return (
      <div className="container py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-muted-foreground mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-6">Shipping Address</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:hidden">
              <button type="submit" className="w-full bg-black text-white py-3 font-medium hover:bg-black/90 transition-colors">
                Place Order
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-fashion-bg p-6 rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
          
          <div className="divide-y">
            {items.map(item => (
              <div key={item.product.id} className="py-3 flex justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm mr-2">
                    {item.quantity}
                  </span>
                  <span className="text-sm">{item.product.name}</span>
                </div>
                <span className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6 hidden md:block">
            <button 
              type="submit"
              form="checkout-form"
              className="w-full bg-fashion-accent text-white py-3 font-medium hover:bg-fashion-accent/90 transition-colors"
              onClick={handleSubmit}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
