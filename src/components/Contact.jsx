import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">ติดต่อเรา</h1>
      <p className="text-gray-600 mb-4">
        641463019 ธนภัทร อภิวงค์
      </p>
      <div className="flex items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11 11.672V18H9v-6.328a6 6 0 10-2 0zM10 1a5 5 0 11-5 5c0-2.75 2.25-5 5-5zm-7 5a7 7 0 1114 0h-1a6 6 0 10-12 0H3zm14 6v2h2v-2h-2zm0-1h2V9h-2v2zm0-1h2V9h-2v2zm0-1h2V9h-2v2zm0-1h2V9h-2v2zm0-1h2V9h-2v2zm0-1h2V9h-2v2zm0-1h2V9h-2v2z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-gray-600">อีเมล: 641463019@crru.ac.th</p>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.828 2H14a2 2 0 012 2v12a2 2 0 01-2 2H5.828a2 2 0 01-1.414-.586L1 15.414V5a2 2 0 012-2h2.828a2 2 0 01.938.23l.532.266L10 9l4.703-4.504.532-.266a2 2 0 01.938-.23H17a2 2 0 012 2v10.414l-4.414-4.414a2 2 0 00-1.414-.586H5a2 2 0 00-2 2v1a2 2 0 002 2h9a2 2 0 002-2V4a2 2 0 00-2-2H5.828a2 2 0 000 4h5.764a2 2 0 011.416.586L18 11.586V18a2 2 0 01-2 2H14a2 2 0 01-2-2v-1a2 2 0 00-2-2H3a2 2 0 01-2-2V5a2 2 0 012-2h2.828a2 2 0 011.414.586L9 8l-4.703-4.504A2 2 0 015.828 2z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-gray-600">เบอร์โทร: 012-345-6789</p>
      </div>
    </div>
  );
};

export default Contact;
