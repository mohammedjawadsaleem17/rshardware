import React from 'react';

import { waveform } from 'ldrs';
import 'ldrs/react/Waveform.css';

// Default values shown
waveform.register();
export default function Loaders() {
  return (
    <l-waveform size="35" stroke="3.5" speed="1" color="black"></l-waveform>
  );
}
