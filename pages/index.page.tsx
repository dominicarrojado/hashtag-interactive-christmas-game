import GameBlock from '../components/gameBlock';
import InfoBlock from '../components/infoBlock';
import styles from '../styles/home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <InfoBlock />
      <GameBlock />
    </div>
  );
}

export default Home;
