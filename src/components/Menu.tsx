/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SchoolIcon from '@material-ui/icons/School';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PublicIcon from '@material-ui/icons/Public';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import Auth from './../Auth/Auth';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  paper: {
    background: "rgb(63, 81, 181)"
  },
  fullList: {
    width: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  linkColor: {
    textDecoration: 'none',
    color: 'white',
  },
  iconColor: {
    color: 'white',
  },
  ContainerButton: {
    backgroundColor: '#3f51b5',
    '&:hover': {
      backgroundColor: '#002984',
    }
  },
  ItemButton: {
    '&:hover': {
      background: 'none',
    }

  },
}));

interface Props {
  auth: Auth;
}

const TemporaryDrawer = (props: Props) => {
  const { isAuthenticated, userHasScopes, ...rest } = props.auth;
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side: DrawerSide) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      id="paco"
    >

      <Divider />
      <List className={classes.ContainerButton}>
        <ListItem button className={classes.ItemButton}>
          <ListItemIcon>
            <HomeIcon className={classes.iconColor} />
          </ListItemIcon>
          <Link to="/" className={classes.linkColor}>Home</Link>
        </ListItem>
      </List>

      <Divider />
      <List className={classes.ContainerButton}>
        <ListItem button className={classes.ItemButton}>
          <ListItemIcon>
            <AccountBoxIcon className={classes.iconColor} />
          </ListItemIcon>
          <Link to="/profile" className={classes.linkColor}>Profile</Link>
        </ListItem>
      </List>

      <Divider />
      <List className={classes.ContainerButton}>
        <ListItem button className={classes.ItemButton}>
          <ListItemIcon>
            <PublicIcon className={classes.iconColor}/>
          </ListItemIcon>
          <Link to="/public" className={classes.linkColor}>Public</Link>
        </ListItem>
      </List>
      <Divider />
      {isAuthenticated() && (
        <>
          <List className={classes.ContainerButton}>
            <ListItem button className={classes.ItemButton}>
              <ListItemIcon>
                <VisibilityIcon className={classes.iconColor}/>
              </ListItemIcon>
              <Link to="/private" className={classes.linkColor}>Private</Link>
            </ListItem>
          </List>
        </>
      )}

      {isAuthenticated() && userHasScopes(["read:courses"]) && (
        <>
          <Divider />
          <List className={classes.ContainerButton}>
            <ListItem button className={classes.ItemButton}>
              <ListItemIcon>
                <SchoolIcon className={classes.iconColor}/>
              </ListItemIcon>
              <Link to="/courses" className={classes.linkColor}>Courses</Link>
            </ListItem>
          </List>
        </>
      )}
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)} classes={{ paper: classes.paper }}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;