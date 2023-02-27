import { useMachine } from '@xstate/react';
import * as React from 'react';
import './App.css';
import { Backdrop, AudioPlayer, AudioTrack } from './components';
import { Actions, appMachine, EventTypes } from './machines';
// Enabled for dev tool
// import { inspect } from '@xstate/inspect';

const tracks: AudioTrack[] = [
  {
    title: 'Slow cinematic',
    artist: 'Royalty',
    image: 'https://picsum.photos/200',
    audioSrc: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    color: '#DB2B39',
    id: 0,
  },
  {
    title: 'Gentle acoustic',
    artist: 'Acoustic',
    image: 'https://picsum.photos/id/18/200',
    audioSrc: 'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
    color: '#29335C',
    id: 1,
  },
  {
    title: 'Corporate motivational',
    artist: 'Corporate',
    image: 'https://picsum.photos/seed/picsum/200',
    audioSrc: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
    color: '#F3A712',
    id: 2,
  },
];

const defaultBackground = '#00aeb0';

// Enabled for dev tool
// inspect({
//   iframe: false,
// });

function App() {
  const [currentTrack, setCurrentTrack] = React.useState({} as AudioTrack);
  const { color = defaultBackground } = currentTrack;
  const audioRef = React.useRef<HTMLAudioElement | undefined>();

  const [state, send] = useMachine(appMachine, {
    actions: {
      play: () => {
        audioRef.current?.play();
      },
      pause: () => {
        audioRef.current?.pause();
      },
      stop: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return () => {
          audioRef.current?.remove();
        };
      },
      forward: () => {
        audioRef.current?.pause();
        if (audioRef.current) {
          audioRef.current.playbackRate = 2;
        }
        return () => {
          if (audioRef.current) {
            audioRef.current.playbackRate = 1;
          }
        };
      },
      backward: () => {
        audioRef.current?.pause();
        if (audioRef.current) {
          audioRef.current.playbackRate = 0.5;
        }
        return () => {
          if (audioRef.current) {
            audioRef.current.playbackRate = 1;
          }
        };
      },
    },
    services: {
      selectSong: async (_context, event) => {
        if (event.type === 'SELECT_SONG') {
          audioRef.current?.pause();
          audioRef.current = new Audio(event.songPath);
          return;
        }
        return Promise.reject('Something went wrong');
      },
      songPlaying: () => {
        const onEnd = () => {
          send('STOP');
        };
        audioRef.current?.addEventListener('ended', function () {
          onEnd();
        });
        return () => {
          audioRef.current?.removeEventListener('ended', function () {
            onEnd();
          });
        };
      },
    },
    // Enabled for dev tool
    // devTools: true,
  });

  const can = (action: Actions) => state.nextEvents.includes(action);
  const sendEvent = (event: EventTypes) => (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => send(event);

  return (
    <div className="audio-player">
      <AudioPlayer
        audioRef={audioRef}
        track={currentTrack as AudioTrack}
        isPlaying={can('PAUSE')}
        onStopClick={sendEvent({ type: 'STOP' })}
        onPlayClick={sendEvent({ type: 'PLAY' })}
        onPauseClick={sendEvent({ type: 'PAUSE' })}
        onForwardClick={sendEvent({ type: 'FORWARD' })}
        onBackwardClick={sendEvent({ type: 'BACKWARD' })}
      />
      <div className="play-list">
        {tracks.map((audio, index) => (
          <div
            key={audio.id}
            onClick={() => {
              console.log(audio.id, index);
              setCurrentTrack(audio);
              send({
                type: 'SELECT_SONG',
                songPath: audio.audioSrc,
              });
            }}
            className={
              'track ' +
              (currentTrack.id === index && can('PLAY') ? 'current-audio' : '') +
              (currentTrack.id === index && can('PAUSE') ? 'play-now' : '')
            }
          >
            <img className="track-img" src={audio.image} alt="track cover" />
            <div className="track-discr">
              <span className="track-name">{audio.title}</span>
              <span className="track-author">{audio.artist}</span>
            </div>
          </div>
        ))}
      </div>
      <Backdrop activeColor={color} isPlaying={can('PAUSE')} />
    </div>
  );
}

export default App;
