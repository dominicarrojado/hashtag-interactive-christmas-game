import { ReactNode } from 'react';
import styles from '../styles/layout.module.css';

function Layout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;
