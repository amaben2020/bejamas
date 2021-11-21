import { IMyChildren } from '../../interface/layout';
import NavigationBar from '../NavBar/NavigationBar';
import styles from './../../styles/layout.module.scss';

const Layout = ({ children }: IMyChildren) => {
  return (
    <div className={styles.layout}>
      <>
        <NavigationBar />
        {children}
      </>
    </div>
  );
};

export default Layout;
