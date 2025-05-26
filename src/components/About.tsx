import React from 'react';

// import config from '../config/index.json';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6'; // oppure 'fa' se usi react-icons < v5

import { useLanguage } from '../utils/LanguageContext'; // 👈 importa il context

const About = () => {
  const { config, lang } = useLanguage(); // 👈 prendi il config giusto per la lingua selezionata
  const { company, about } = config;
  const companyName = company?.name || 'Drogheria Conti';
  const logo = company?.logo || '/logo.png';
  const sections = about?.sections || [];
  const socialMedia = about?.socialMedia || {};
  const developedBy = about?.developedBy || { name: '' };

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src={logo} alt={companyName} className="w-16 h-16" />
        </div>
        <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4 h-12">
          {sections.map((section, index) => (
            <a
              key={`${section.name}-${index}`}
              href={section.href}
              className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
              {section.name}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-x-8 mt-6 h-8">
          <a
            aria-label="Instagram"
            href={socialMedia.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-primary/10 transition"
          >
            <FaInstagram className="text-[#d6249f] text-2xl hover:text-primary transition-colors" />
          </a>
        </div>
        <div className="flex items-center mt-6">
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50 text-center">
            {developedBy.name.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <footer className="py-8 text-center">
        <div className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Drogheria Conti
        </div>
        <div className="flex justify-center gap-4 mt-2 text-xs">
          <Link href={lang === 'en' ? '/privacy-policy-en' : '/privacy-policy'}>
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};
export default About;
