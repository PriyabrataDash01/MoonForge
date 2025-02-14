import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { cn } from '../utils/cn';

const DiscordIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.317 4.369A19.791 19.791 0 0016.885 3c-.173.302-.365.705-.503 1.022a18.12 18.12 0 00-5.764 0c-.138-.317-.33-.72-.503-1.022A19.791 19.791 0 003.68 4.369C1.938 7.216 1.099 10.545 1.308 13.845a19.744 19.744 0 005.996 3.082c.487-.658.923-1.36 1.299-2.09a12.8 12.8 0 01-2.08-.986c.174-.126.345-.256.51-.392a13.392 13.392 0 002.913 1.507c.785.297 1.636.477 2.49.477s1.705-.18 2.49-.477a13.392 13.392 0 002.913-1.507c.165.136.336.266.51.392a12.8 12.8 0 01-2.08.986c.376.73.812 1.432 1.299 2.09a19.744 19.744 0 005.996-3.082c.27-3.861-.64-7.191-2.382-9.477zM9.33 12.507c-.98 0-1.78-.9-1.78-2.005 0-1.106.78-2.006 1.78-2.006s1.792.9 1.78 2.006c0 1.106-.8 2.005-1.78 2.005zm5.34 0c-.98 0-1.78-.9-1.78-2.005 0-1.106.78-2.006 1.78-2.006s1.792.9 1.78 2.006c0 1.106-.8 2.005-1.78 2.005z"
    />
  </svg>
);

const socialLinks = [
  {
    icon: <Twitter size={24} />,
    label: 'Twitter',
    handle: '@LumeX',
    url: 'https://twitter.com/LumeX',
    color: 'hover:text-blue-400'
  },
  {
    icon: <DiscordIcon />,
    label: 'Discord',
    handle: 'LumeX Community',
    url: 'https://discord.gg/lumex',
    color: 'hover:text-indigo-400'
  },
  {
    icon: <Instagram size={24} />,
    label: 'Instagram',
    handle: '@lumex.official',
    url: 'https://instagram.com/lumex.official',
    color: 'hover:text-pink-400'
  },
  {
    icon: <Facebook size={24} />,
    label: 'Facebook',
    handle: 'LumeX',
    url: 'https://facebook.com/LumeX',
    color: 'hover:text-blue-600'
  },
  {
    icon: <Linkedin size={24} />,
    label: 'LinkedIn',
    handle: 'LumeX Network',
    url: 'https://linkedin.com/company/lumex',
    color: 'hover:text-blue-500'
  },
  {
    icon: <Mail size={24} />,
    label: 'Email',
    handle: 'contact@moonforge.com',
    url: 'mailto:contact@moonforge.com',
    color: 'hover:text-purple-400'
  }
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Let's Connect</h2>
          <p className="text-gray-400">Join our growing community and stay updated</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl",
                "transition-all duration-300",
                "hover:bg-gray-800/50",
                "hover:transform hover:scale-105"
              )}>
                <div className={cn(
                  "text-gray-400 transition-colors duration-300",
                  social.color
                )}>
                  {social.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{social.label}</div>
                  <div className="text-sm text-gray-500">{social.handle}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center text-sm text-gray-400">
          <p>© 2024 MoonForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};