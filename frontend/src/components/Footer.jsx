import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-semibold">FinLife</h2>
            <p className="text-lg mt-2">
              Your powerful financial assistant
            </p>
          </div>
          <div className="flex justify-center sm:justify-end gap-6">
            {/* Follow Developers Section */}
            <div className="flex flex-col justify-center items-center sm:items-end">
              <p className="text-sm mt-2">Follow our Developers</p>
              <div className="flex gap-4 mt-2">
                <a href="https://github.com/Lazianime/Let-Him-Cook" target="_blank" rel="noopener noreferrer">
                  <i className="bx bxl-github text-2xl hover:text-gray-400 transition-colors"></i>
                </a>
                <a href="https://www.linkedin.com/in/lyandyphok/" target="_blank" rel="noopener noreferrer" className="relative group">
                    <i className="bx bxl-linkedin text-2xl hover:text-blue-700 transition-colors"></i>
                    <span className="tooltip absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-sm px-2 py-1 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Ly Andy Phok
                    </span>
                </a>
                <a href="https://www.linkedin.com/in/rneidco/" target="_blank" rel="noopener noreferrer" className="relative group">
                    <i className="bx bxl-linkedin text-2xl hover:text-blue-700 transition-colors"></i>
                    <span className="tooltip absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-sm px-2 py-1 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Daniel To
                    </span>
                </a>
                <a href="https://www.linkedin.com/in/aliyas-gawhary-aaa419253/" target="_blank" rel="noopener noreferrer" className="relative group">
                    <i className="bx bxl-linkedin text-2xl hover:text-blue-700 transition-colors"></i>
                    <span className="tooltip absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-sm px-2 py-1 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Victoria Doan
                    </span>
                </a>
                <a href="https://www.linkedin.com/in/aliyas-gawhary-aaa419253/" target="_blank" rel="noopener noreferrer" className="relative group">
                    <i className="bx bxl-linkedin text-2xl hover:text-blue-700 transition-colors"></i>
                    <span className="tooltip absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-sm px-2 py-1 rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200">
                        Adel Bouchatta
                    </span>
                </a>



              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p>&copy; 2025 FinLife. All rights reserved.</p>
            </div>
            <div className="text-center sm:text-right">
              <Link className="hover:underline mx-2">
                About Us
              </Link>
              <Link className="hover:underline mx-2">
                Privacy Policy
              </Link>
              <Link className="hover:underline mx-2">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
