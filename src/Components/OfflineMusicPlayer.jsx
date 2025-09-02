import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  LibraryMusic as LibraryIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import Sidebar from './Sidebar';
import SongTable from './SongTable';
import PlayerControls from './PlayerControls';

// Mock data for our music library
export const mockSongs = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', genre: 'Rock' },
  { id: 2, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', duration: '6:30', genre: 'Rock' },
  { id: 3, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', duration: '5:03', genre: 'Rock' },
  { id: 4, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54', genre: 'Pop' },
  { id: 5, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '5:01', genre: 'Grunge' },
  { id: 6, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '3:03', genre: 'Pop' },
  { id: 7, title: 'Like a Rolling Stone', artist: 'Bob Dylan', album: 'Highway 61 Revisited', duration: '6:13', genre: 'Folk Rock' },
  { id: 8, title: 'Hey Jude', artist: 'The Beatles', album: 'The Beatles', duration: '7:11', genre: 'Rock' }
];

// Styled components
const PlayerContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
  color: '#f5f5f5',
  overflow: 'hidden',
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1e1e1e 0%, #2d2d2d 100%)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  // Always visible for better usability
  transform: 'translateY(0)',
  transition: 'all 0.3s ease-in-out',
}));

// Main App Component
const OfflineMusicPlayer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = mockSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayPause = () => {
    if (!currentSong && filteredSongs.length > 0) {
      setCurrentSong(filteredSongs[0]);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentSong && filteredSongs.length > 0) {
      setCurrentSong(filteredSongs[0]);
    } else if (currentSong) {
      const currentIndex = filteredSongs.findIndex(song => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % filteredSongs.length;
      setCurrentSong(filteredSongs[nextIndex]);
    }
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong && filteredSongs.length > 0) {
      setCurrentSong(filteredSongs[0]);
    } else if (currentSong) {
      const currentIndex = filteredSongs.findIndex(song => song.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
      setCurrentSong(filteredSongs[prevIndex]);
    }
    setIsPlaying(true);
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <PlayerContainer>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <LibraryIcon />
          <Typography variant="h6" component="h1" sx={{ ml: 2, color: '#bb86fc' }}>
            Harmony Player
          </Typography>
          <TextField
            sx={{ 
              ml: 'auto', 
              backgroundColor: '#2c2c2c', 
              borderRadius: 24, 
              width: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 24,
                color: '#f5f5f5',
              },
              display: { xs: 'none', sm: 'block' }
            }}
            placeholder="Search your music..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#888' }} />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </StyledAppBar>
      
      <Sidebar 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        variant={isMobile ? 'temporary' : 'permanent'} 
      />
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 3, 
        overflow: 'hidden', 
        ml: { md: 30 },
        mt: 8
      }}>
        <Box sx={{ 
          py: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: '1px solid #333' 
        }}>
          <Typography variant="h5">
            My Music
          </Typography>
          {/* Mobile search field */}
          <TextField
            sx={{ 
              backgroundColor: '#2c2c2c', 
              borderRadius: 24, 
              width: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: 24,
                color: '#f5f5f5',
              },
              display: { xs: 'block', sm: 'none' }
            }}
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#888' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <SongTable 
          songs={filteredSongs} 
          currentSong={currentSong} 
          onSelectSong={handleSelectSong}
          isMobile={isMobile}
        />
        
        <PlayerControls 
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Box>
    </PlayerContainer>
  );
};

export default OfflineMusicPlayer;