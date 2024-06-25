'use client'
import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

interface TabProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [spanWidth, setSpanWidth] = useState(0);

  useEffect(() => {
    if (spanRef.current) {
      setSpanWidth(spanRef.current.offsetWidth);
    }
  }, [label]);

  return (
    <div
      className={clsx(
        'relative cursor-pointer p-2 font-header italic font-bold text-xl',
        active ? 'text-brand-frostbite' : 'text-black'
      )}
      onClick={onClick}
    >
      <span ref={spanRef}>{label}</span>
      {active && (
        <div
          className="absolute bottom-[-6px] h-2 bg-brand-frostbite pb-6"
          style={{ width: `${spanWidth}px`, bottom: '-18px'}}
        ></div>
      )}
    </div>
  );
};

interface TabsProps {
  tabs: { label: string }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const onTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex space-x-4">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          active={index === activeTab}
          onClick={() => onTabChange(index)}
        />
      ))}
    </div>
  );
};

export default Tabs;
