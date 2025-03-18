// import React from 'react'

// function addvertisment() {
//   return (
//     <div>
//        <h1>its advertisments page</h1>
//     </div>
//   )
// }

// export default addvertisment

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import Footer from "../footer/Footer";

export default function addvertisment() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (phone.length < 10) {
      setMessage("Please enter a valid phone number");
    } else {
      setMessage("Thank you! Our team will contact you soon.");
      setPhone("");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center p-10 bg-white shadow-md w-full">
        <h1 className="text-3xl font-bold">Grow Your Business</h1>
        <p className="text-gray-500">Advertise with Tripeazy and reach more customers.</p>
        <div className="mt-4 flex justify-center gap-2">
          <Input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-64 border p-2 rounded-md"
          />
          <Button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md">Send</Button>
        </div>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>

      {/* Benefits Section */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        {["Increase your revenue with marketing", "Get your business in front of new users", "Make your company popular"].map((text, index) => (
          <Card key={index} className="w-72 p-4 bg-purple-700 text-white rounded-lg shadow-md">
            <CardContent>
              <p className="text-lg font-medium">{text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advertisement Plans */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-500">Select the best package for your business.</p>
        <div className="flex gap-6 mt-6 mb-6">
          {[{ name: "Standard", price: "$9/mo" }, { name: "Premium", price: "$12/mo" }].map((plan, index) => (
            <Card key={index} className="w-80 p-6 bg-white rounded-lg shadow-md border">
              <CardContent className="text-center">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <ul className="mt-4 space-y-2">
                  {["Unlimited bandwidth", "High visibility"].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" /> {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-bold mt-4">{plan.price}</p>
                <Button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">Subscribe</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

