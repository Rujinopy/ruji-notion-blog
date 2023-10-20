import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'data/siteData';
import Link from 'next/link';
import { ThemeSwitcher } from 'components/ToggleTheme';
export default function Navbar() {
  return (
    <div className="fixed z-10 w-full bg-white dark:bg-black border-b">
      <Container>
        <div className="flex justify-between w-full py-4 ">
          <Link href="/" passHref>
            <div className="text-3xl font-bold cursor-pointer">{siteData.author}</div>
          </Link>
          
          <div className='flex space-x-5'>
          <ThemeSwitcher />
          {/* <Socials /> */}
          </div>
          
        </div>
      </Container>
    </div>
  );
}
