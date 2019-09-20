import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Translate } from "react-redux-i18n";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
// import clsx from "clsx";
// import SVGIcon from "../../../constants/svgIcon/Svg_Icon";
// import SVGIcon from "@dgtx/core-component-ui/cjs/svg/Svg_Icon";
import Tooltip from "@material-ui/core/Tooltip";
const styles = (theme) => {
  return {
    box: {
      display: "block",
      width: "100%",
      height: 26,
      background: theme.palette.primary[theme.palette.type]
    },
    icon: {
      width: "100%",
      height: "90px",
      fill: theme.palette.primary[theme.palette.type]
    },
    title: {
      margin: 0,
      textTransform: "uppercase",
      background: "none",
      textOverflow: "ellipsis",
      overflow: "hidden",
      lineHeight: "1.4em",
      height: "1.4em",
      WebkitLineClamp: "1",
      WebkitBoxOrient: "vertical",
      display: "-webkit-box",
      color: theme.palette.primary[theme.palette.type]
    },
    title_selected: {
      color: theme.palette.primary[theme.palette.type]
    }
  };
}

const FunctionItemComponent = props => {
  const {
    index,
    item,
    onClick,
    // muiTheme,
    selecting,
    keyTranslate,
    // redirecting,
    onHover = () => null,
    classes,
    theme
  } = props; //eslint-disable-line
  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClick(item);
  }
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ padding: 16 }}>
        <Paper
          onClick={handleOnClick}
          // onMouseOver={event => onHover(event, index)}
          style={{
            background: selecting ? "#FFFFFF" : "#f5f5f5",
            borderRadius: 6
          }}
          rounded={true}
          zDepth={selecting ? 5 : 1}
        >
          <Grid
            container
            spacing={16}
            style={{
              margin: 0,
              width: "100%",
              cursor: "pointer"
            }}
          >
            <Grid item xs={9} container style={{ width: "100%" }}>
              <Grid item xs container direction="column" spacing={16}>
                <Grid item xs style={{ paddingLeft: 12 }}>
                  <h2 className={classes.title}>
                    <Translate value={`${keyTranslate}.${item.navbarName}`} />
                  </h2>
                  <Tooltip
                    title={<Translate value={`${keyTranslate}.${item.des}`} />}
                    placement="top"
                  >
                    <Typography
                      gutterBottom
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "1.2em",
                        height: "2.4em",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box"
                      }}
                    >
                      <Translate value={`${keyTranslate}.${item.des}`} style={{ opacity: 0.75 }} />
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={3} style={{ textAlign: "right", margin: "auto" }}>
              <div
                style={{
                  backgroundPosition: "center right",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat"
                }}
              />
              <ButtonBase>
                <SVGIcon
                  className={classes.icon}
                  name={item.iconName}
                  fill={theme ? theme.palette.primary[theme.palette.type] : ""}
                  style={{ opacity: "0.85" }}
                />
              </ButtonBase>
            </Grid> */}
          </Grid>
          <Grid className={classes.box} />
        </Paper>
    </Grid>
  );
};
FunctionItemComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(FunctionItemComponent);
