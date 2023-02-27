import * as React from 'react';

type BackdropType = {
  activeColor: string;
  isPlaying: boolean;
};

export function Backdrop({ activeColor, isPlaying }: BackdropType) {
  React.useEffect(() => {
    document.documentElement.style.setProperty('--active-color', activeColor);
  }, [activeColor]);

  return <div className={`color-backdrop ${isPlaying ? 'playing' : 'idle'}`} />;
}
