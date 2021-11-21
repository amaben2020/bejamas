import React from 'react';
import { IMyChildren } from '../../interface/layout';
import styles from './../../styles/descriptionLayout.module.scss';

const DescriptionLayout = ({ children }: IMyChildren) => {
  return <div className={styles.description__layout}>{children}</div>;
};

export default DescriptionLayout;
