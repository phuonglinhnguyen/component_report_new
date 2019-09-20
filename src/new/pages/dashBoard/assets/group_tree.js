const drawerWidth = 400;
export const stylesGroupTree = (theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      maxHeight: `calc(100% - ${theme.spacing.unit * 8}px)`,
      background: "none",
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: theme.spacing.unit * 8,
      maxHeight: `calc(100% - ${theme.spacing.unit * 8}px)`,
      background: "none",
      borderRight: "0px",
    },
    drawerContent: {
      margin: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 4}px ${theme.spacing.unit}px`,
      width: `calc(100% - ${theme.spacing.unit * 2}px)`,
      height: `calc(100% - ${theme.spacing.unit * 5}px)`,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      ...theme.mixins.toolbar,
    },
    hoverGroupTree: {
      margin: theme.spacing.unit,
      width: `calc(100% - ${theme.spacing.unit * 2}px)`,
      borderRadius: "3px",
      "&:hover": {
        boxShadow: theme.overrides.shadowsHover_1,
        background: theme.overrides.backgroundHover_1,
        fontWeight: "bold",
      }
    }
  })