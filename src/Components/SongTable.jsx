import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
  styled
} from '@mui/material';

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
    '& .MuiTableCell-root': {
      color: '#bb86fc',
    }
  })
}));

// Song Table Component
const SongTable = ({ songs, currentSong, onSelectSong, isMobile }) => {
  if (isMobile) {
    return (
      <Box sx={{ p: 1 }} >
        {songs.map((song) => (
          <Card 
            key={song.id} 
            sx={{ 
              backgroundColor: '#1e1e1e', 
              color: '#f5f5f5', 
              mb: 1,
              ...(currentSong && currentSong.id === song.id && { 
                borderLeft: '4px solid #bb86fc',
                color: '#bb86fc'
              })
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
            <TableCell sx={{ color: '#888' }}>Title</TableCell>
            <TableCell sx={{ color: '#888' }}>Artist</TableCell>
            <TableCell sx={{ color: '#888' }}>Album</TableCell>
            <TableCell sx={{ color: '#888' }}>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.length > 0 ? (
            songs.map((song) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ color: '#888', py: 4 }}>
                No songs found. Try a different search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default SongTable;