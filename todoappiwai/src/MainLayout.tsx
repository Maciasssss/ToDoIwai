import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/analytics" className="text-sm font-semibold leading-6 text-green-300">Analytics</Link>
            <Link to="/calendar" className="text-sm font-semibold leading-6 text-blue-300">Calendar</Link>
            <Link to="/profile" className="text-sm font-semibold leading-6 text-yellow-300">My Profile</Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button className="text-sm font-semibold leading-6 text-red-400">Log in <span aria-hidden="true">&rarr;</span></button>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between p-6 lg:px-8">
          <div className="text-white mb-4 lg:mb-0">
            <p>&copy; {new Date().getFullYear()} ToDoApp Sp. z o.o. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <button className="text-indigo-200 hover:text-indigo-400">About Us</button>
            <button className="text-green-300 hover:text-green-400">Features</button>
            <button className="text-blue-300 hover:text-blue-400">Pricing</button>
            <button className="text-yellow-300 hover:text-yellow-400">FAQ</button>
            <button className="text-red-400 hover:text-red-600">Contact</button>
          </nav>
          <div className="mt-4 lg:mt-0">
            <p className="text-white">Follow us:</p>
            <div className="flex gap-4">
              <button className="text-indigo-200 hover:text-indigo-400">
                <FontAwesomeIcon icon={faFacebookF} />
                <span className="sr-only">Facebook</span>
              </button>
              <button className="text-green-300 hover:text-green-400">
                <FontAwesomeIcon icon={faTwitter} />
                <span className="sr-only">Twitter</span>
              </button>
              <button className="text-blue-300 hover:text-blue-400">
                <FontAwesomeIcon icon={faInstagram} />
                <span className="sr-only">Instagram</span>
              </button>
              <button className="text-yellow-300 hover:text-yellow-400">
                <FontAwesomeIcon icon={faLinkedinIn} />
                <span className="sr-only">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
