import { useState } from 'react'

export default function GlobalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-purple-700 fixed w-full z-20 top-0 left-0 border-b border-transparent">
      <div className=" flex flex-wrap items-center justify-between  p-6">
        <a href="/" className="flex items-center space-x-3">
          <span className="self-center text-xl text-white font-semibold whitespace-nowrap"style={{ fontFamily: '"Papyrus", fantasy' }}> 🌼 EarlyBloom</span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <button
            type="button"
            className="flex items-center text-white bg-purple-900 hover:bg-purple-950 font-bold border-none focus:ring-4 focus:ring-purple-500 shadow-md leading-5 rounded-xl text-sm px-3 py-2 focus:outline-none"
          >
            Get Started
            <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-xl md:hidden hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-xl bg-purple-700 md:space-x-8 md:flex-row md:mt-0 md:bg-transparent">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm bg-purple-900 md:bg-transparent md:text-white md:p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded hover:bg-purple-800 md:hover:bg-transparent md:p-0"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
