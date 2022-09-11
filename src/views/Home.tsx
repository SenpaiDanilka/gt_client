import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Home = () => {
  const {t} = useTranslation('common');

  return (
    <>
      <h1>Home</h1>
      <Link
        to="/sign_up"
        className="first:mr-2"
      >
        {t('signUp')}
      </Link>
      <Link to="/sign_in">{t('signIn')}</Link>
    </>
  );
}

export default Home;