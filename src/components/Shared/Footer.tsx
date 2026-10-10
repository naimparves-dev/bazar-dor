import React from 'react';
import { Separator } from '@heroui/react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50/50">
      <Separator />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-default-600 text-center sm:text-left">
        <div>
          বাজার দর - প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
      <Separator />
    </footer>
  );
};

export default Footer;