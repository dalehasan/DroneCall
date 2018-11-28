import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);
const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  }
});
const Avatar = withStyles(avatarStyles)(AvatarRaw);

class Dashboard extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const {
      loading,
      data
    } = this.props;
    if (loading) return <LinearProgress />;

    let metric =  JSON.stringify(data, ['metric']);
    let latitude = JSON.stringify(data, ['latitude']);
    let longitude = JSON.stringify(data, ['longitude']);
    let timestamp = JSON.stringify(data, ['timestamp']);

    let metricToString = metric == null ? "null value" : metric;
    let metricValue = metricToString.substring(metricToString.indexOf(":") + 1).replace("}","");

    let latituteToString = latitude == null ? "null value" : latitude;
    let latitudeValue = latituteToString.substring(latituteToString.indexOf(":") + 1).replace("}","");

    let longitudeToString = longitude == null ? "null value" : longitude;
    let longitudeValue = longitudeToString.substring(longitudeToString.indexOf(":") + 1).replace("}","");

    let timestampToString = timestamp == null ? "null value" : timestamp;
    let timestampValue = timestampToString.substring(timestampToString.indexOf(":") + 1).replace("}","");

    //timestamp convertion
    let timestampToDate = Date(parseInt(timestampValue)/1000);
    let timesDifference = (Math.floor(Date.now() / 1000) - (parseInt(timestampValue)/1000) ); 
    // console.log(Math.floor(Date.now() / 1000));
    // console.log(parseInt(timestampValue)/1000);
    // console.log(timesDifference);

    // toast("Error found during Api call!");

    return (
      <Card>
      <CardHeader title="Drone Visualization" />
      <CardContent>
        <List>
          <ListItem>
            <Avatar>1</Avatar>
            <ListItemText><b>Temperature: </b>{metricValue} <b>°F</b></ListItemText>
          </ListItem>
          <ListItem>
            <Avatar>2</Avatar>
            <ListItemText><b>Latitude: </b>{latitudeValue}</ListItemText>
          </ListItem>
          <ListItem>
            <Avatar>3</Avatar>
            <ListItemText><b>Longitude: </b>{longitudeValue}</ListItemText>
          </ListItem>
          <ListItem>
            <Avatar>4</Avatar>
            <ListItemText><b>Last Received: </b>{timesDifference} seconds ago</ListItemText>
          </ListItem>
          <ListItem>
            <Avatar>5</Avatar>
            <ListItemText><b>Last Drone Timestamp: </b>{timestampToDate}</ListItemText>
          </ListItem>
        </List>
      </CardContent>
    </Card>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    data
  } = state.weather;
  return {
    loading,
    data
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
    //   type: actions.FETCH_WEATHER,
    //   longitude: -95.3698,
    //   latitude: 29.7604
    type: actions.FETCH_DRONE
    })
});


export default connect(
  mapState,
  mapDispatch
)(Dashboard);
