const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-5 w-full">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h2 className="text-2xl font-bold text-primary">Tripeazy</h2>
            <p className="mt-2 text-gray-400">Your trusted travel agency partner.</p>
          </div>
  
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="/contact-us" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Column 3 - Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
  
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-2 text-gray-400">📍 Kochi, Kerala</p>
            <p className="text-gray-400">📧 support@tripeazy.com</p>
            <p className="text-gray-400">📞 +91 9526788628</p>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Tripeazy. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  