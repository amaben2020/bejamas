import React from 'react';
import styles from './../../styles/descriptionLayout.module.scss';
interface IMyChildren {
  children: JSX.Element | JSX.Element[];
}

const DescriptionLayout = ({ children }: IMyChildren) => {
  return <div className={styles.description__layout}>{children}</div>;
};

export default DescriptionLayout;
