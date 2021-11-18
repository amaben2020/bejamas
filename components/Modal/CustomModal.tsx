import React, { ReactChild } from 'react';
import styles from './../../styles/modal.module.scss';
import FontAwesome from 'react-fontawesome';
const CustomModal = (props: {
  children?: React.ReactNode;
  closeModal?: () => void;
}) => {
  const closeicon = () => (
    <FontAwesome
      name="times"
      onClick={closeModal}
      style={{
        color: '#000000',
        padding: '10px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        border: 0,
        position: 'absolute',
        top: '0.3rem',
        right: '0.5rem',
      }}
    />
  );
  const { closeModal } = props;
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {closeicon()}
        {props.children}
      </div>
    </div>
  );
};

export default CustomModal;
