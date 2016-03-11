import React, {Component} from "react";

class Player extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPlaying : false,
      volume : 60
    };
  }

  volumeChange(e) {
    console.log(e.pageX);
    console.log(e.target.style.width);
  }

  render(){
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container-fluid player-container row">
          <div className="player-controls col-md-1">
            <i className="fa fa-backward fa-2x"></i>
            &nbsp;
            <i className="fa fa-play-circle fa-2x"></i>
            &nbsp;
            <i className="fa fa-forward fa-2x"></i>
          </div>
          <div className="col-md-6 player-progress">
            <div className="progress" style={{height: "5px"}}>
              <div className="progress-bar progress-bar-warning" style={{"width": "60%"}}></div>
            </div>
          </div>
          <div className="col-md-2 row">
            <div className="volume-control col-md-4">
              <i className="fa fa-volume-up fa-2x"></i>
            </div>
            <div className="volume-level col-md-8">
              <div className="progress" onClick={this.volumeChange}>
                <div className="progress-bar progress-bar-warning" style={{"width": this.state.volume + "%"}}></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Player;
