var partyPlannerModel = require('../models/partyPlannerModel');
var getSongsURI = process.env.getSongsURI || 'http://localhost:3000/partygoer/getsongs/';

exports.authorize = function(req, res) {
  partyPlannerModel.authorizeSpotify(req, res);
};

exports.authorizeCallback = function(req, res) {
  partyPlannerModel.authorizeSpotifyCallback(req, res);
};

exports.beacon = function(req, res) {
  var errorID = req.query.error;
  var spotifyID = req.params.spotifyID;
  res.render('partyPlanner/beacon', {spotifyID: spotifyID, errorID: errorID});
};

exports.saveBeacon = function(req, res) {
  var spotifyID = req.params.spotifyID;
  var beaconMajor = req.body.beaconMajor;
  var beaconMinor = req.body.beaconMinor;
  if (beaconMajor == null || beaconMajor == "" || beaconMinor == null || beaconMinor == "") {
    res.redirect('/partyplanner/beacon/' + spotifyID + '?error=1');
  } else {
    partyPlannerModel.saveBeacon(spotifyID, beaconMajor, beaconMinor);
    res.redirect('/partyplanner/eventdetails/' + spotifyID);
  }
};

exports.eventDetails = function(req, res) {
  var spotifyID = req.params.spotifyID;
  res.render('partyPlanner/eventDetails', {spotifyID: spotifyID});
};

exports.saveEventDetails = function(req, res) {
  var partyName = req.body.partyName;
  var partyDate = req.body.partyDate;
  var playlistName = req.body.playlistName;
  var spotifyID = req.params.spotifyID;
  partyPlannerModel.saveEventDetails(partyName, partyDate, playlistName, spotifyID);
  res.redirect('/partyplanner/completed/' + partyName + '/' +
                                            partyDate + '/' +
                                            playlistName);
};

exports.completed = function(req, res) {
  var partyName = req.params.partyName;
  var partyDate = req.params.partyDate;
  var partyPlaylistName = req.params.playlistName;
  var getSongsLink = getSongsURI +
      partyName + '/' + partyDate;
  res.render('partyPlanner/completed', { partyName: partyName,
      partyDate: partyDate, partyPlaylistName: partyPlaylistName,
      getSongsLink: getSongsLink } );
};
