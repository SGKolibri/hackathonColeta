import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { Drawer } from "@mui/material";
import { motion } from "framer-motion";
import Logo from "../../assets/logo.png";

const drawerStyle = {
  width: "275px",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "275px", // Adjust the width as needed
    backgroundColor: "#fff", // Drawer background color
    border: "none", // Remove the border
    color: "#fff", // Text color
    "& h1": {
      fontSize: "24px", // Adjust the font size as needed
      margin: "20px", // Adjust the margin as needed
    },
  },
};

export default function Navbar() {
  const location = useLocation();

  const linkNames: {
    [key in "home" | "points" | "tips" | "contact" | "login"]: string;
  } = {
    home: "INÍCIO",
    points: "PONTOS DE COLETA",
    tips: "DICAS",
    contact: "CONTATO",
    login: "LOGIN",
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <nav className="w-full flex items-center py-2.5 top-0 bg-[#066C4A] font-sans">
        <div className="w-[40%] flex justify-start items-start px-[16px] md:px-[0px] md:justify-center md:items-center">
          <ScrollLink to="/home" smooth={true} duration={500}>
            <Link
              className="text-white text-2xl font-semibold no-underline"
              to={"/"}
            >
              <img src={Logo} alt="Logo" className="h-14" />
            </Link>
          </ScrollLink>
        </div>

        <div className="w-full justify-start hidden items-center gap-10 text-[#ECECEC] md:flex tracking-wide">
          {!location.pathname.includes("/modulo/") &&
            (Object.keys(linkNames) as Array<keyof typeof linkNames>).map(
              (key, index) => {
                return key === "login" ? (
                  <Link
                    key={index}
                    className={`scroll-link text-lg font-semibold px-1 my-1 cursor-pointer no-underline`}
                    to="/login"
                  >
                    {linkNames[key]}
                  </Link>
                ) : (
                  <ScrollLink
                    key={index}
                    className={`scroll-link text-lg font-semibold px-1 my-1 cursor-pointer no-underline`}
                    to={key}
                    smooth={true}
                    offset={-50}
                    duration={500}
                  >
                    {linkNames[key]}
                  </ScrollLink>
                );
              }
            )}
        </div>

        <div className="w-full flex justify-end items-center px-4 md:hidden">
          <FaBars
            className="text-gray-900 text-3xl cursor-pointer"
            onClick={handleClickOpen}
          />
          <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            sx={drawerStyle}
          >
            <div className="relative h-full">
              <div className="w-full flex items-end justify-end py-2 px-2">
                <IoClose
                  className="text-black w-10 h-10 cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <div className="w-full flex flex-col gap-3">
                {!location.pathname.includes("/modulo/") &&
                  Object.keys(linkNames).map((key, index) => {
                    return (
                      <ScrollLink
                        key={index}
                        className={`scroll-link text-black no-underline font-base text-lg my-1 cursor-pointer `}
                        to={key}
                        smooth={true}
                        offset={-50}
                        duration={500}
                        onClick={handleClose}
                      >
                        <div
                          className={`py-[9px] ${
                            location.pathname === `/${key}`
                              ? "bg-[#A20003] text-white"
                              : ""
                          }`}
                        >
                          <span className="w-full pl-5">
                            {linkNames[key as keyof typeof linkNames]}
                          </span>
                        </div>
                      </ScrollLink>
                    );
                  })}
              </div>
            </div>
          </Drawer>
        </div>
      </nav>
    </>
  );
}
