import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'data/siteData';
import Link from 'next/link';
import { ThemeSwitcher } from 'components/ToggleTheme';
import MenuIcon from 'components/MenuIcon';
import React from 'react';

const LinkItem = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Blog',
    href: '/blog'
  },
  {
    name: <ThemeSwitcher />,
    href: '#'
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="fixed z-10 w-full bg-white dark:bg-neutral-900">
      <Container>
        <div className="flex justify-between w-full py-4 ">
          <Link href="/" passHref>
            <div
              className={`text-3xl font-bold cursor-pointer z-40 `}
            >
              {siteData.author}
            </div>
          </Link>
          <div className="md:flex space-x-5 hidden">
            <ThemeSwitcher />
          </div>
          <div className="lg:hidden md:hidden mt-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center px-3 rounded text-black-500 hover:text-black-400 z-50`}
            >
              <MenuIcon />
            </button>
            <div
              className={` ${isOpen ? 'flex-col flex' : 'hidden'
                } 
                h-auto w-screen absolute px-1 left-0 top-20 divide-y divide-zinc-200 border-y border-zinc-200 bg-white dark:bg-neutral-900 z-10 transition-all duration-500 ease-in-out
                `}
            >
              {LinkItem.map((item, index) => (
                <a href={item.href} key={index} className="w-full h-24 flex items-center justify-center">
                  {item.name}
                </a>
              ))}

            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
