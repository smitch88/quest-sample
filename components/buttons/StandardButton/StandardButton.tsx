'use client'
import React from 'react';
import BaseButton, { BaseButtonProps } from '../BaseButton';

const StandardButton: React.FC<BaseButtonProps> = (props) => {
  const styles = (props.customStyles || '') + ' rounded-md';
  return <BaseButton {...props} customStyles={styles} />;
};

export default StandardButton;
