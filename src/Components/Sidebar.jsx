import React from 'react';
import {
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  styled
} from '@mui/material';
import {
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  LibraryMusic as LibraryIcon,
  PlaylistPlay as PlaylistIcon,
} from '@mui/icons-material';

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

export default Sidebar;