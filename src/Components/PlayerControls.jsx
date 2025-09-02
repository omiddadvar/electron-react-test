import React, { useState } from 'react';
import {
  IconButton,
  Slider,
  Typography,
  Fab,
  Box,
  styled
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  SkipNext as NextIcon,
  SkipPrevious as PreviousIcon,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  VolumeUp as VolumeIcon,
  LibraryMusic as LibraryIcon
} from '@mui/icons-material';

const PlayerControlsContainer = styled(Box)({
  backgroundColor: '#1e1e1e',
  padding: 16,
  borderTop: '1px solid #333',
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'column',
  zIndex: 1000,
});

const ProgressBar = styled(Box)({
  width: '100%',
  height: 4,
  backgroundColor: '#333',
  borderRadius: 2,
  marginBottom: 2,
  cursor: 'pointer',
});

const Progress = styled(Box)({
  height: '100%',
  backgroundColor: '#bb86fc',
  borderRadius: 2,
  width: '30%',
});

const PlayButton = styled(Fab)({
  backgroundColor: '#bb86fc',
  color: '#121212',
  '&:hover': {
    backgroundColor: '#9965f4',
  },
});

const NowPlayingArt = styled(Box)({
  width: 56,
  height: 56,
  backgroundColor: '#333',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// Player Controls Component
const PlayerControls = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }) => {
  const [volume, setVolume] = useState(80);

  return (
    <PlayerControlsContainer>
      <ProgressBar>
        <Progress />
      </ProgressBar>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        px: 2,
        py: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: 300 }}>
          <NowPlayingArt>
            <LibraryIcon />
          </NowPlayingArt>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="body1" noWrap>
              {currentSong ? currentSong.title : 'No song selected'}
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
              {currentSong ? currentSong.artist : 'Select a song to play'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton sx={{ color: '#f5f5f5' }}>
            <ShuffleIcon />
          </IconButton>
          <IconButton sx={{ color: '#f5f5f5' }} onClick={onPrevious}>
            <PreviousIcon />
          </IconButton>
          <PlayButton size="medium" onClick={onPlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </PlayButton>
          <IconButton sx={{ color: '#f5f5f5' }} onClick={onNext}>
            <NextIcon />
          </IconButton>
          <IconButton sx={{ color: '#f5f5f5' }}>
            <RepeatIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VolumeIcon sx={{ color: '#f5f5f5' }} />
          <Slider
            sx={{ width: 100, color: '#bb86fc' }}
            value={volume}
            onChange={(e, newValue) => setVolume(newValue)}
            aria-labelledby="continuous-slider"
          />
        </Box>
      </Box>
    </PlayerControlsContainer>
  );
};

export default PlayerControls;