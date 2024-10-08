import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo";
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

function Footer() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <section className="relative overflow-hidden py-10  border-t-2 border-t-black dark:border-t-white dark:border-t-[1px] dark:bg-black">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px " />
              </div>
              <h2 className="  dark:text-white text-black">
                 Pencrafted is a online blog website <br/>
                 where users can write blog on there desire topic.<br/>
                 
              </h2>
              <div>
                <p className=" text-xs md:text-sm dark:text-white">
                  &copy; Copyright 2023. All Rights Reserved by{" "}
                  <Link to="/">
                    <span className="text-orange-500">PenCrafted.</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12 dark:text-white">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-white ">
                Quick links
              </h3>
              <ul>
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li className="mb-4" key={item.name}>
                        <button
                          className={` text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white ${
                            location.pathname === item.slug
                              ? "dark:text-orange-400"
                              : ""
                          }`}
                          onClick={() => navigate(item.slug)}
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
             
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-white ">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `${
                        isActive ? "dark:text-orange-500 " : ""
                      } text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white`
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
                {/* <li>
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 dark:text-white dark:hover:text-white">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/privacy-policy"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-orange-500 dark:text-orange-500" : ""
                      } text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white`
                    }
                  >
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
