import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white px-12 py-8">
      <div className="flex flex-row justify-between border-b border-slate-600 pb-6">
        <img src="/pinelogo.png" className="h-[6vh]" />
        <div className="flex flex-row items-center gap-x-4">
          <div className="p-3 border-2 border-slate-600 rounded-full flex flex-row justify-center items-center">
            <FaPhoneAlt />
          </div>
          <h1>(976) 7007-1234</h1>
          <div className="p-3 border-2 border-slate-600 rounded-full flex flex-row justify-center items-center">
            <IoIosMail className="" />
          </div>
          <h1>contact@ecommerce.mn</h1>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-6">
        <h1>© 2024 Ecommerce MN</h1>
        <div className="flex flex-row text-xl gap-x-4">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
};

export default Footer;
