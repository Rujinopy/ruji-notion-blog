import Container from 'components/Container';
import Socials from 'components/Socials';
import siteData from 'data/siteData';

export default function Footer() {
  return (
    <footer className="py-4 bg-black dark:bg-neutral-900 border-t">
      <Container>
        <div className="md:flex md:items-center md:justify-between">
          <Socials />
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-base text-center text-gray-100">{siteData.footerText}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
