import siteData from 'data/siteData';
import Image from 'next/image';
import UseAnimations from 'react-useanimations';
import github from 'react-useanimations/lib/github';
import instagram from 'react-useanimations/lib/instagram';
import twitter from 'react-useanimations/lib/twitter';

const socials = [
  {
    name: 'Twitter',
    href: siteData.twitter,
    animation: twitter
  },
  {
    name: 'Instagram',
    href: siteData.instagram,
    animation: instagram
  },
  {
    name: 'GitHub',
    href: siteData.github,
    animation: github
  }
];

export default function Socials() {
  return (
    <div className="flex justify-center space-x-6 md:order-2 ">
      {socials.map(item => (
        <a
          key={item.name}
          href={item.href}
          className="transform filter hover:contrast-50 p-1"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only">{item.name}</span>
          <UseAnimations animation={item.animation} strokeColor="#FFFFFF" />
        </a>
      ))}
    </div>
  );
}
