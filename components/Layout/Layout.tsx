import NavigationBar from '../NavBar/NavigationBar';
import styles from './../../styles/layout.module.scss';

interface IMyChildren {
  children: JSX.Element | JSX.Element[];
}

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
