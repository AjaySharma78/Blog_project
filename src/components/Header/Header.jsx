import React,{useState} from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../../store/authSlice'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const themeMode = useSelector((state) => state.auth.theme);
  const userData = useSelector((state) => state.auth.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
 

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;

    if (darkModeStatus) {
      dispatch(darkTheme());
    } else {
      dispatch(lightTheme());
    }
  };
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
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
  ]


  return (
    <header className="py-1 shadow bg-white dark:bg-black border-b-[1px] ">
    <Container>
      <nav className="md:justify-between md:flex md:items-cente ">
        <div className="flex justify-between md:ml-10">
          <Link to="/">
            <Logo width='60px'  />
          </Link>
          <span  onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl md:hidden flex items-center">
          {!isMenuOpen? <ion-icon name="menu-outline"></ion-icon>:<ion-icon name="close-outline"></ion-icon>}
          </span>
        </div>
        <ul className={`md:flex mt-3 md:mt-0 border-t border-black md:border-none md:items-center -z-[-1] dark:bg-black md:dark:bg-transparent bg-white md:bg-transparent transition-all duration-700 ease-in-out md:transition-none sm:shadow-md md:shadow-none left-0 w-full md:z-auto md:static absolute md:w-auto ${ isMenuOpen ? 'top-12 ' : 'top-[-400px]'}`}>
          {navItems.map(
            (item) =>
              item.active && (
                <li className="ml-2 mr-2" key={item.name}>
                  <button
                    className={` inline-block px-5 py-1 mt-1 md:m-1 duration-200 hover:bg-orange-500 rounded-md text-lg dark:text-white  ${location.pathname===item.slug? 'bg-orange-400':''}`}
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
         
            <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 ml-2 md:ml-0 rounded-md bg-white dark:bg-black dark:text-white px-3 py-1 text-lg text-black shadow-sm ring-1 ring-inset ring-orange-500 hover:bg-orange-500">
         {userData.name}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-[5.5rem] md:-left-[6rem]  z-10 mt-4 w-56 origin-top-right rounded-md bg-white dark:bg-black dark:text-white transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
             <LogoutBtn/>
          </MenuItem>
          <MenuItem>
            <Link
              to="/contact"
              className="block px-4 py-2 text-sm text-black data-[focus]:bg-orange-500 dark:text-white"
            >
              Contact
            </Link>
          </MenuItem>
          <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-black data-[focus]:bg-orange-500 dark:text-white"
              >
                License
              </a>

           
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
   )}
      <div className="sm:rotate-0 md:rotate-90 ml-8 my-2  md:m-0 md:pr-0 ">
        <label className="relative inline-flex items-center cursor-pointer ">
          <input
            type="checkbox"
            value=""
            label=""
            className="sr-only peer "
            onChange={onChangeBtn}
            checked={themeMode === "dark"}
          />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-300  dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-orange-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
        </label>
      </div>
        </ul>
      </nav>
    </Container>
  </header>
);
}

export default Header;
