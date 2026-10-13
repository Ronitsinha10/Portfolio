import React from 'react';
import { CodingProfiles } from './CodingProfiles';
import { Services } from './Services';

export const MyPresence: React.FC = () => {
  return (
    <div id="mypresence">
      <span id="achievements" className="sr-only" />
      <CodingProfiles />
      <Services />
    </div>
  );
};

export const Achievements = MyPresence;

