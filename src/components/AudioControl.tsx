import { faBackward, faForward, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AudioControlType = {
  isPlaying: boolean;
  onPlayClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onPauseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onForwardClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onBackwardClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onStopClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function AudioControls({
  isPlaying,
  onPlayClick,
  onPauseClick,
  onBackwardClick,
  onForwardClick,
  onStopClick,
}: AudioControlType) {
  return (
    <div className="audio-controls">
      <button type="button" className="prev" aria-label="Previous" onClick={onBackwardClick}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      {isPlaying ? (
        <button type="button" className="pause" onClick={onPauseClick} aria-label="Pause">
          <FontAwesomeIcon icon={faPause} />
        </button>
      ) : (
        <button type="button" className="play" onClick={onPlayClick} aria-label="Play">
          <FontAwesomeIcon icon={faPlay} />
        </button>
      )}
      <button type="button" className="stop" onClick={onStopClick} aria-label="Stop">
        <FontAwesomeIcon icon={faStop} />
      </button>
      <button type="button" className="next" aria-label="Next" onClick={onForwardClick}>
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
}
