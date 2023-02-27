import { assign, createMachine } from 'xstate';

export type Actions = 'SELECT_SONG' | 'PLAY' | 'STOP' | 'FORWARD' | 'BACKWARD' | 'PAUSE';
export type EventTypes =
  | { type: 'SELECT_SONG'; songPath: string }
  | { type: 'SEEK'; seek: number }
  | { type: 'PLAY' }
  | { type: 'STOP' }
  | { type: 'FORWARD' }
  | { type: 'BACKWARD' }
  | { type: 'PAUSE' };

const schema = {
  context: {} as { songPath: string | null },
  events: {} as EventTypes,
};

export const appMachine = createMachine({
  schema,
  predictableActionArguments: true,
  id: 'appMachine',
  initial: 'noSongSelected',
  context: {
    songPath: null,
  },
  on: {
    SELECT_SONG: {
      target: 'selectingSong',
      actions: assign({
        songPath: (_context, event) => event.songPath,
      }),
    },
  },
  states: {
    noSongSelected: {},
    selectingSong: {
      invoke: {
        src: 'selectSong',
        onDone: {
          target: 'songSelected',
        },
        onError: 'errorSelecting',
      },
    },
    errorSelecting: {},
    songSelected: {
      id: 'playerMachine',
      initial: 'stopped',
      states: {
        playing: {
          entry: 'play',
          on: {
            PAUSE: 'paused',
            STOP: 'stopped',
            FORWARD: 'forwarding',
            BACKWARD: 'backwarding',
          },
          invoke: {
            src: 'songPlaying',
          },
        },
        paused: {
          entry: 'pause',
          on: {
            PLAY: 'playing',
          },
        },
        stopped: {
          entry: 'stop',
          on: {
            PLAY: 'playing',
          },
        },
        forwarding: {
          entry: 'forward',
          on: {
            PLAY: 'playing',
          },
        },
        backwarding: {
          entry: 'backward',
          on: {
            PLAY: 'playing',
          },
        },
      },
    },
  },
});
