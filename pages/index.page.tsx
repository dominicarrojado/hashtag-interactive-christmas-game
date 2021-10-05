import GameBlock from '../components/gameBlock';
import InfoBlock from '../components/infoBlock';
import SeoTags from '../components/seoTags';
import styles from '../styles/home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <SeoTags />
      <InfoBlock />
      <GameBlock />
    </div>
  );
}

export default Home;
