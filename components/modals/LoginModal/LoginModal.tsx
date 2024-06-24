// components/LoginModal.tsx
import React, { useState } from 'react';
import Modal from '../BaseModal/BaseModal';
import Image from 'next/image';
import FacebookIcon from '@/public/icons/facebook.svg';
import GoogleIcon from '@/public/icons/google.svg';
import TwitterIcon from '@/public/icons/twitter.svg';
import DiscordIcon from '@/public/icons/discord.svg';
import SparkballLogo from '@/public/images/logo-color.svg';
import StandardInputField from '@/components/inputs/StandardInputField';
import StandardButton from '@/components/buttons/StandardButton/StandardButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='w-[360px] h-[600px]'>
      <div className="flex flex-col items-center w-[264px] h-[462px] mx-auto my-auto space-y-6">
        <SparkballLogo className="h-12 w-auto" alt="Sparkball logo" style={{ height: '42.9px', width: '210.38px' }} />
        <p className="mb-4">
          Don't have an account? <a href="#" className="text-orange-500">Create one</a>
        </p>
        <div className="w-full mb-4 space-y-4">
          <StandardInputField
            label=''
            placeholder="chip.stronghold@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
          />
          <StandardInputField
            label=''
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StandardButton className="w-full mt-4 bg-orange-500 text-white font-bold">
            LOGIN
          </StandardButton>
        </div>
        <div className="flex items-center mb-4 w-full space-x-2">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 italic">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12" style={{ backgroundColor: '#4285F4' }}>
            <FacebookIcon className="text-white" style={{ height: '48px', width: '48px' }} />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-white">
            <GoogleIcon className="text-white" style={{ height: '20px', width: '20px' }} />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-black">
            <TwitterIcon className="text-white" style={{ height: '20px', width: '20px' }} />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-purple-600">
            <DiscordIcon className="text-white" style={{ height: '20px', width: '20px' }} />
          </div>
        </div>
        <a href="#" className="text-gray-500 mt-6">Forgot password?</a>
      </div>
    </Modal>
  );
};

export default LoginModal;
