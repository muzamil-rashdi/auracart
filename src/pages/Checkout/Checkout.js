import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
import { CheckCircle2, Sparkles, Truck, Package, CreditCard } from "lucide-react";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.1;
  const shipping = totalPrice > 0 ? 0 : 0;
  const finalTotal = totalPrice + tax + shipping;

  const countries = useMemo(() => countryList().getData(), []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    zip: Yup.string().required("Zip code is required"),
    country: Yup.object().required("Country is required"),
  });

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [showSuccess]);

  const handlePlaceOrder = (values) => {
    const order = {
      customer: values,
      items: [...cartItems],
      total: finalTotal,
    };

    console.log("Order placed:", order);
    setOrderDetails(order);
    dispatch(clearCart());
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 300);
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
        <Button onClick={() => navigate("/")}>Go Back to Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Checkout
        </h1>

        {/* Checkout Form */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            zip: "",
            country: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handlePlaceOrder}
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Customer Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Shipping Information
                </h2>

                <div>
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="address"
                    placeholder="Address"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="city"
                    placeholder="City"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    name="zip"
                    placeholder="Zip Code"
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <ErrorMessage
                    name="zip"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Select
                    options={countries}
                    value={values.country}
                    onChange={(val) => setFieldValue("country", val)}
                    placeholder="Select Country"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base) => ({
                        ...base,
                        padding: '6px',
                        borderColor: '#d1d5db',
                        backgroundColor: '#fff',
                        '&:hover': {
                          borderColor: '#3b82f6'
                        }
                      })
                    }}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Right: Order Summary */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-600"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="text-gray-900 dark:text-white font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                    <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-3">
                    <span className="text-gray-800 dark:text-white">Total</span>
                    <span className="text-blue-600 dark:text-blue-400">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 mt-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Place Order
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* ✅ SUCCESS MODAL - FIXED VERSION */}
      {showSuccess && orderDetails && (
        <>
          {/* Simple Dark Backdrop */}
          <div className={`
            fixed inset-0 z-50 flex items-center justify-center p-4
            transition-all duration-500 ease-out
            ${isVisible ? 
              'bg-black/70 backdrop-blur-sm' : 
              'bg-black/0 backdrop-blur-0'
            }
          `}>
            {/* Scrollable Modal Container */}
            <div className={`
              relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto
              transform transition-all duration-700 ease-out
              ${isVisible ? 
                'scale-100 opacity-100 translate-y-0' : 
                'scale-95 opacity-0 translate-y-10'
              }
            `}>
              {/* Main Modal Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 text-center relative">
                  <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <CheckCircle2 className="text-white" size={60} strokeWidth={1.5} />
                        <Sparkles className="absolute -top-1 -right-1 text-yellow-300" size={20} />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Order Confirmed!
                    </h2>
                    <p className="text-cyan-100">
                      Your purchase has been successfully processed
                    </p>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-6">
                  {/* Success Message */}
                  <div className="text-center mb-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Thank you for choosing us! Your order is being prepared with care.
                    </p>
                    
                    {/* Order Status */}
                    <div className="flex justify-center items-center space-x-6 mb-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-2">
                          <CreditCard className="text-green-600 dark:text-green-400" size={16} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Payment</span>
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                          <Package className="text-blue-600 dark:text-blue-400" size={16} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Processing</span>
                      </div>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-2">
                          <Truck className="text-purple-600 dark:text-purple-400" size={16} />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Shipping</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                      <Package className="mr-2 text-indigo-500" size={18} />
                      Order Summary
                    </h3>
                    
                    <div className="space-y-2 mb-3">
                      {orderDetails.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex-1">
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                              {item.title}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                              × {item.quantity}
                            </span>
                          </div>
                          <span className="text-gray-800 dark:text-white font-semibold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Total:</span>
                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          ${orderDetails.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button - Always visible at bottom */}
                  <div className="text-center sticky bottom-0 bg-white dark:bg-gray-800 pt-4 pb-2">
                    <Button
                      onClick={handleCloseModal}
                      className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Continue Shopping
                    </Button>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Order #{(Math.random() * 1000000).toFixed(0).padStart(6, '0')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confetti Animation */}
          {isVisible && (
            <div className="fixed inset-0 z-40 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Add confetti animation styles */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Checkout;