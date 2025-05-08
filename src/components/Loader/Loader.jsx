import React from 'react';
import { waveform } from 'ldrs';

// Register the loader only once
waveform.register();

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50">
      <l-waveform size="35" stroke="3.5" speed="1" color="black"></l-waveform>
    </div>
  );
}
