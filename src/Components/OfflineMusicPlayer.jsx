import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slider,
  Card,
  CardContent,
  Fab,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  LibraryMusic as LibraryIcon,
  PlaylistPlay as PlaylistIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  SkipNext as NextIcon,
  SkipPrevious as PreviousIcon,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
  VolumeUp as VolumeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

// Mock data for our music library
const mockSongs = [
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

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(90deg, #1e1e1e 0%, #2d2d2d 100%)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
});

const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#1e1e1e',
    color: '#f5f5f5',
    borderRight: '1px solid #333',
  },
});

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: 'transparent',
  color: '#f5f5f5',
  boxShadow: 'none',
  flexGrow: 1,
  overflow: 'auto',
  marginTop: 2,
});

const StyledTableRow = styled(TableRow)(({ playing }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#2d2d2d',
  },
  ...(playing && {
    color: '#bb86fc',
  })
}));

const PlayerControls = styled(Box)({
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

// Sidebar Component
const Sidebar = ({ open, onClose, variant }) => {
  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'My Music', icon: <LibraryIcon /> },
    { text: 'Favorites', icon: <FavoriteIcon /> },
    { text: 'Playlists', icon: <PlaylistIcon /> },
  ];

  return (
    <StyledDrawer
      variant={variant}
      open={open}
      onClose={onClose}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon sx={{ color: '#f5f5f5' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

// Song Table Component
const SongTable = ({ songs, currentSong, onSelectSong, isMobile }) => {
  if (isMobile) {
    return (
      <Box sx={{ p: 1 }}>
        {songs.map((song) => (
          <Card 
            key={song.id} 
            sx={{ 
              backgroundColor: '#1e1e1e', 
              color: '#f5f5f5', 
              mb: 1,
              ...(currentSong && currentSong.id === song.id && { borderLeft: '4px solid #bb86fc' })
            }}
            onClick={() => onSelectSong(song)}
          >
            <CardContent>
              <Typography variant="h6" component="h2" noWrap>
                {song.title}
              </Typography>
              <Typography color="textSecondary" noWrap>
                {song.artist} • {song.album}
              </Typography>
              <Typography color="textSecondary">
                {song.duration}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="music table">
        <TableHead>
          <TableRow sx={{ borderBottom: '1px solid #333', color: '#888' }}>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song) => (
            <StyledTableRow 
              key={song.id} 
              playing={currentSong && currentSong.id === song.id}
              onClick={() => onSelectSong(song)}
            >
              <TableCell component="th" scope="row">
                {song.title}
              </TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.duration}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

// Player Controls Component
const PlayerControlsComponent = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }) => {
  const [volume, setVolume] = useState(80);

  return (
    <PlayerControls>
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
    </PlayerControls>
  );
};

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
        </Box>
        
        <SongTable 
          songs={filteredSongs} 
          currentSong={currentSong} 
          onSelectSong={handleSelectSong}
          isMobile={isMobile}
        />
        
        <PlayerControlsComponent 
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