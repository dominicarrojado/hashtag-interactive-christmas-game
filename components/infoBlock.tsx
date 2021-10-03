import React from 'react';
import styles from '../styles/infoBlock.module.css';
import homeStyles from '../styles/home.module.css';

function InfoBlock() {
  return (
    <section className={`${styles.infoBlock} ${homeStyles.block}`}>
      <div>
        <a href="/hashtag-interactive-website/" className={styles.companyLogo}>
          <img
            src="/images/logo-hashtag-interactive.png"
            alt="Hashtag Interactive logo"
            width="115"
            height="31"
            draggable={false}
          />
        </a>
      </div>
      <h1 className={styles.infoBlockTitle}>
        <img
          src="/images/logo-holly-jolly-memory-game.png"
          alt="Holly Jolly Memory Game logo"
          width="459"
          height="145"
          className=""
          draggable={false}
        />
      </h1>
      <p className={styles.infoBlockText}>
        Made a lot of memories this year? <br />
        Then this should be right up your alley! <br />
        Follow the button that lights up and repeat the <br />
        same sequence to move on to the next level. <br />
        Of course, it gets more challenging with every round.
        <br />
        <br />
        Think you're up for it? Aim for the highest score!
      </p>
    </section>
  );
}

export default InfoBlock;
