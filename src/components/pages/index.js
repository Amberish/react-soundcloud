import React from 'react';
import { Component } from 'react';
import NavBar from "../navbar";
import Player from "../player";

export default class IndexPage extends Component {
  constructor(props) {
      super(props);

      SC.initialize({
        client_id: 'a3105b134aa4c8c34b0c6aae9341ce4a'
      });

      this.state = {
        tracks : [],
        player : null,
        current_song_id : 0
      }
  }

  componentWillMount() {
    var $this = this;
    //get user id for artist
    // SC.resolve("https://soundcloud.com/arijitsinghhh").then(function(info){
    //   console.log(info);
    // }).catch(function(e){
    //   console.log(e);
    // });
    //Fetching soundcloud public tracks
    SC.get('/tracks').then(function(tracks){
      $this.setState({tracks : tracks.slice(0, 6)});
    }).catch(function(e){
      console.log(e);
    });
  }

  onSongClick(e){
    e.preventDefault();
    var source = e.target;
    var tag = source.tagName;
    if(tag !== "A"){
      source = source.parentNode;
    }
    var link = source.getAttribute("data-link");
    var target = document.getElementById("player");
    target.innerHTML = "<div class='well text-center'>Loading Player...</div>";
    SC.oEmbed(link, {element: target, auto_play: true, maxheight: 100});
  }

  songList() {
    var $this = this;
    if($this.state.tracks.length == 0) {
      return <div className="text-center well">Loading...</div>
    }

    return $this.state.tracks.map(function(track){
      return (
        <a href="#"
           key={track.id}
           data-link={track.permalink_url}
           onClick={$this.onSongClick.bind($this)}
           className="list-group-item">
           <i className="fa fa-play"></i> &nbsp; <img src={track.user.avatar_url} style={{height:"50px"}}/> &nbsp; {track.title}
        </a>
      )
    });
  }

  onGenreSelect(e) {
    var source = e.target;
    var genre = source.value.trim();
    var $this = this;
    SC.get('/tracks', {
      genre : genre
    }).then(function(tracks){
      $this.setState({tracks : tracks.slice(0, 6)});
    }).catch(function(e){
      console.log(e);
    });
  }

  onArtistSelect(e){
    var source = e.target;
    var artist_id = source.value.trim();
    var $this = this;
    SC.get('/users/' + artist_id + '/tracks').then(function(tracks){
      $this.setState({tracks : tracks.slice(0, 6)});
    }).catch(function(e){
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <br />
        <div className="container song-list">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h4>SoundCloud Tracks</h4>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-4">
                    <select className="form-control" onChange={this.onArtistSelect.bind(this)}>
                      <option>artist</option>
                      <option value="6841301">Janet Devlin</option>
                      <option value="104500660">Coke Studio</option>
                      <option value="193443945">Arijit Singh</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select className="genre-select form-control" onChange={this.onGenreSelect.bind(this)}>
                      <option>select genre</option>
                      <option>punk</option>
                      <option>rap</option>
                      <option>hip-hop</option>
                    </select>
                  </div>
                </div>
                <br />
                <div id="player"></div>
                <div className="list-group">
                  { this.songList() }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
