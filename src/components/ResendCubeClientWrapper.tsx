"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const DynamicResendCube = dynamic(() => import('./ResendCube'), {
  ssr: false,
  loading: () => <p>...</p>,
});

const ResendCubeClientWrapper: React.FC = () => {
  return <DynamicResendCube />;
};

export default ResendCubeClientWrapper; 