import { createMachine } from 'xstate';

export const playerMachine = createMachine({
  predictableActionArguments: true,
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
});
