import React, { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"
import { navLinks } from '../constants/navigation'
import { useAuth } from "../contexts/AuthContext"
import { ChevronDown } from "lucide-react"


const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    navigate("/")
  }

  const getNavLinks = () => {
    const filteredLinks = navLinks.filter(link => {
      if (user) {
        return link.path !== '/login' && link.path !== '/signup'
      }
      return link.path !== '/profile' && link.path !== '/collaboration'
    })

    if (user) {
      filteredLinks.push({
        path: '#',
        label: `Hi, ${user.name}`,
        isDropdown: true,
        dropdownItems: [
          { path: '/profile', label: 'Profile' },
          { path: '#', label: 'Logout', onClick: handleLogout }
        ]
      })
    }

    return filteredLinks
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      },
    },
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  }

  const itemVariants = {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  }

  return (
    <motion.nav
      className="fixed top-2 left-0 right-0 z-50"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="w-[90%] md:w-[80%] mt-1 mx-auto p-4 backdrop-blur-md bg-sky-50/30 border-sky-200/50 border-2 text-sky-800 rounded-lg md:rounded-full shadow-lg hover:bg-sky-50/40 transition-all duration-300">
        <div className="font-poppins flex justify-between items-center">
          <motion.div
            className="font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">ResearchBridge</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-row gap-6 items-center">
            {getNavLinks().map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.path} className="relative" ref={dropdownRef}>
                    <motion.button
                      className="flex items-center gap-1 hover:text-sky-600 transition-colors"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                          <div className="py-1">
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 transition-colors"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              My Profile
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 transition-colors"
                            >
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              return (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.path}
                    className="hover:text-sky-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiOutlineX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiOutlineMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-2 flex flex-col gap-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {getNavLinks().map((link) => {
                if (link.isDropdown) {
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to="/profile"
                        className="block hover:text-sky-600 transition-colors px-4 py-2 hover:bg-sky-50/50 rounded-lg"
                        onClick={toggleMenu}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="w-full text-left hover:text-sky-600 transition-colors px-4 py-2 hover:bg-sky-50/50 rounded-lg"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )
                }
                return (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className="block hover:text-sky-600 transition-colors px-4 py-2 hover:bg-sky-50/50 rounded-lg"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar

