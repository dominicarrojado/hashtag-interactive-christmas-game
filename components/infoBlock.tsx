import React from 'react';
import { getAssetUrl } from '../lib/assets';
import styles from '../styles/infoBlock.module.css';
import layoutStyles from '../styles/layout.module.css';

function InfoBlock() {
  return (
    <section
      className={`${styles.infoBlock} ${layoutStyles.block}`}
      style={{
        backgroundImage: `url(${getAssetUrl(
          '/images/bg-starry-christmas.png'
        )})`,
      }}
    >
      <div>
        <a href="/hashtag-interactive-website/" className={styles.companyLogo}>
          <img
            src={getAssetUrl('images/logo-hashtag-interactive.png')}
            alt="Hashtag Interactive logo"
            width="115"
            height="31"
            draggable={false}
          />
        </a>
      </div>
      <h1 className={styles.infoBlockTitle}>
        <img
          src={getAssetUrl('images/logo-holly-jolly-memory-game.png')}
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
