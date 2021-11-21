import React from 'react';
import Image from 'next/image';
const ModalImage = () => {
  return (
    <div>
      {' '}
      <Image
        src="/modalIcon.svg"
        alt="modal-icon"
        height="30"
        width="35"
      />{' '}
    </div>
  );
};

export default ModalImage;
