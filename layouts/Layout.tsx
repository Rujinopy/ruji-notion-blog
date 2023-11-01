import Subscribe from 'components/Subscribe';
import Footer from './Footer';
import Header from './Navbar';
import { MetaHead } from './MetaHead';

const FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
const API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

export function Layout(props) {
  const { children, date, imageUrl, title, description, ogUrl } = props;

  const metaHeadProps = {
    date,
    imageUrl,
    description,
    ogUrl,
    title
  };

  return (
    <>
      <MetaHead {...metaHeadProps} />
      <Header />
      <div className="pt-14 bg-zinc-50 dark:bg-zinc-900">{children}</div>
      {FORM_ID && API_KEY && <Subscribe />}

      <Footer />
    </>
  );
}
