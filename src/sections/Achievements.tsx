import React from 'react';
import { CodingProfiles } from './CodingProfiles';
import { Services } from './Services';

export const MyPresence: React.FC = () => {
  return (
    <div id="mypresence" className="relative scroll-mt-20">
      <div id="achievements" className="absolute top-0 left-0 pointer-events-none" />
      <CodingProfiles />
      <Services />
    </div>
  );
};

export const Achievements = MyPresence;

