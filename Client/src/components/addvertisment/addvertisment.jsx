import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, X, Star, Zap, Target, BarChart3, ArrowRight, Shield, Eye, Globe } from "lucide-react";
import Footer from "../footer/Footer";
import axios from "axios";
import { subscription,addSubscriptionStatus } from "../../services/authService"

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function Advertisement() {
  const navigate= useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    if (phone.length < 10) {
      setMessage("Please enter a valid phone number");
    } else {
      setMessage("Thank you! Our team will contact you soon.");
      setPhone("");
    }
  };

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log("payment started", selectedPlan.amount);
      const data = await subscription(selectedPlan.amount);
      if(data.status === 409){
        alert("you already have active subscription")
        return
      }
      console.log(data, "this is data of payment");

      const clientSecret = data.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      
      console.log(result, "this is result ");
      if (result.error) {
        alert("this is");
      } else if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful 🎉 Subscription activated");
        const status= "active"
       
        const subscriptionStatus= await addSubscriptionStatus(selectedPlan.name,status)
        
         if(subscriptionStatus){
          navigate("/PremiumWelcomePage")
         }
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message);
      setShowPaymentModal(false)
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setSelectedPlan(null);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center">

      
      <div className="text-center p-12 bg-gradient-to-r from-blue-900 to-purple-800 text-white w-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">Amplify Your Business Reach</h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 relative z-10">
          Advertise with Tripeazy and connect with thousands of potential customers looking for your services.
        </p>
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-3 relative z-10">
          <Input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-72 border-0 bg-white/90 text-gray-800 p-3 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400"
          />
          <Button 
            onClick={handleSubmit} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            Get Started <ArrowRight size={16} />
          </Button>
        </div>
        {message && (
          <p className={`mt-4 ${message.includes("Thank you") ? "text-green-300" : "text-red-300"} relative z-10`}>
            {message}
          </p>
        )}
      </div>

     
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Advertise With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target size={32} />, title: "Precision Targeting", desc: "Reach customers actively searching for your services" },
            { icon: <BarChart3 size={32} />, title: "Performance Analytics", desc: "Track your ad performance with detailed insights" },
            { icon: <Zap size={32} />, title: "Instant Visibility", desc: "Get noticed immediately by potential customers" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="py-16 px-4 bg-gradient-to-b from-slate-50 to-slate-100 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Advertising Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the perfect package to elevate your business visibility and attract more customers.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {[
              { 
                name: "Standard", 
                price: "$50/mo", 
                amount: "50000",
                features: ["Basic visibility", "Up to 50 listings", "Standard support", "Performance reports"],
                popular: false
              }, 
              { 
                name: "Premium", 
                price: "$12/mo", 
                amount: "100000",
                features: ["Premium visibility", "Unlimited listings", "Priority support", "Advanced analytics", "Featured placement"],
                popular: true
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`relative w-full md:w-96 rounded-2xl overflow-hidden ${plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : 'border border-slate-200'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-semibold shadow-md">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="bg-white p-8 h-full">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-500 ml-1">billed monthly</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleSubscribe(plan)} 
                    className={`w-full py-3 rounded-lg font-semibold ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800' 
                        : 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900'
                    } text-white shadow-md hover:shadow-lg transition-all duration-300`}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="py-16 px-4 bg-white w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Trusted by Thousands of Businesses</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            <div className="flex items-center gap-2">
              <Shield className="text-blue-600" size={24} />
              <span className="text-gray-700 font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="text-blue-600" size={24} />
              <span className="text-gray-700 font-medium">Transparent Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-blue-600" size={24} />
              <span className="text-gray-700 font-medium">Global Reach</span>
            </div>
          </div>
        </div>
      </div>

      
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Complete Payment</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold text-gray-800">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-xl font-bold text-blue-600">{selectedPlan.price}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Card Details</h4>
                <div className="border border-slate-200 rounded-xl p-4 focus-within:border-blue-500 transition-colors">
                  <CardElement options={{ 
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#334155',
                        '::placeholder': {
                          color: '#94a3b8',
                        },
                        iconColor: '#64748b',
                      },
                      invalid: {
                        color: '#e11d48',
                        iconColor: '#e11d48',
                      },
                    },
                  }} />
                </div>
              </div>
              
              <Button 
                onClick={handlePayment} 
                disabled={!stripe || isProcessing}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : `Pay ${selectedPlan.price}`}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                Your payment is secure and encrypted. By completing this payment, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}