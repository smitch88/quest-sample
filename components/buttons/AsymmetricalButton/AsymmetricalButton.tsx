import React from 'react';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import './AsymmetricalButton.styles.css';

interface AsymmetricalButtonProps extends BaseButtonProps {
  styleType?: 'type1' | 'type2' | 'type3' | 'type4';
}

const AsymmetricalButton: React.FC<AsymmetricalButtonProps> = ({ styleType = 'type1', customStyles, ...props }) => {
  switch (styleType) {
    case 'type1':
      customStyles = customStyles + ' asymmetrical-type1';
      break;
    case 'type2':
      customStyles = customStyles + ' asymmetrical-type2';
      break;
    case 'type3':
      customStyles = customStyles + ' asymmetrical-type3';
      break;
    case 'type4':
      customStyles = customStyles + ' asymmetrical-type4';
      break;
    default:
      customStyles = customStyles + ' asymmetrical-type1';
  }

  return <BaseButton {...props} customStyles={customStyles} />;
};

export default AsymmetricalButton;
