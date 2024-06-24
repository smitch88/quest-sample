import React from 'react';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import './ChippedButton.styles.css';

interface ChippedButtonProps extends BaseButtonProps {
  reversed? : boolean;
}

const ChippedButton: React.FC<ChippedButtonProps> = (props) => {
  const { reversed } = props;

  const className = reversed ? 'chipped-reversed' : 'chipped';
  return <BaseButton {...props} customStyles={`${className}`} />;
};

export default ChippedButton;
