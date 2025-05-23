
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-auto py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">SMART E-WASTE</h2>
            <p className="max-w-md">
              Eco-friendly e-waste recycling system for monitoring, 
              tracking, and extracting valuable components.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link to="/collection" className="hover:text-secondary transition-colors">Collection</Link></li>
                <li><Link to="/monitoring" className="hover:text-secondary transition-colors">Monitoring</Link></li>
                <li><Link to="/recycling" className="hover:text-secondary transition-colors">Recycling</Link></li>
                <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <address className="not-italic">
                E-waste Center,<br />
                Erode Sengunthar Engineering College,<br />
                Perundurai<br />
                <a href="tel:+919876543210" className="hover:text-secondary transition-colors mt-2 block">+91 98765 43210</a>
                <a href="mailto:info@smartewaste.com" className="hover:text-secondary transition-colors">info@smartewaste.com</a>
              </address>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} SMART E-WASTE ECO-TRACK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
