import React from 'react';
import { createPortal } from 'react-dom';

const Overlay = ({ children }:any) => {
  const overlayRoot: any = document.getElementById('overlay-root');

  return createPortal(<div className='overlay'>{children}</div>, overlayRoot);
};

export default Overlay;
