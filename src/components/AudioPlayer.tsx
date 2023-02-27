import * as React from 'react';
import { AudioControls } from '.';

export type AudioTrack = {
  title: string;
  artist: string;
  color: string;
  image: string;
  audioSrc: string;
  id: number;
};

export const defaultTrack: AudioTrack = {
  id: 0,
  title: 'No select song',
  artist: 'Unknown',
  image: 'https://files.radio.co/humorous-skink/staging/default-artwork.png',
  audioSrc: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
  color: '#F33912',
};

type Props = {
  audioRef: React.MutableRefObject<HTMLAudioElement | undefined>;
  track: AudioTrack;
  isPlaying: boolean;
  onPlayClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPauseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onForwardClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onBackwardClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onStopClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function AudioPlayer({
  track,
  isPlaying,
  onStopClick,
  onPlayClick,
  onPauseClick,
  onForwardClick,
  onBackwardClick,
}: Props) {
  const { title, artist, image } = track;

  return (
    <div className="track-info">
      <img
        className="artwork"
        src={image ?? defaultTrack.image}
        alt={`track artwork for ${title ?? defaultTrack.title} by ${artist ?? defaultTrack.artist}`}
      />
      <h2 className="title">{title ?? defaultTrack.title}</h2>
      <h3 className="artist">{artist ?? defaultTrack.artist}</h3>
      <AudioControls
        isPlaying={isPlaying}
        onForwardClick={onForwardClick}
        onBackwardClick={onBackwardClick}
        onPlayClick={onPlayClick}
        onStopClick={onStopClick}
        onPauseClick={onPauseClick}
      />
    </div>
  );
}
