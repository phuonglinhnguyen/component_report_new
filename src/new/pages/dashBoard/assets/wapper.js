const drawerWidth = 400;
export const stylesWapper = (theme) => ({
  root: {
    display: 'flex',
  },
  buttonGroupTree: {
    fontFamily: `"Roboto", "Helvetica", "Arial", 'sans-serif'`,
    fontWeight: '300px',
    lineHeight: '0.1em',
    position: 'fixed',
    top: '86px',
    left: '0px',
    width: theme.spacing.unit * 5,
    background: `rgba(0, 0, 0, 0.3)`,
    zIndex: theme.zIndex.appBar,
    borderRadius: '0px 8px 8px 0px',
    textAlign: 'center',
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    maxHeight: `calc(100% - ${theme.spacing.unit * 11}px)`,
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})