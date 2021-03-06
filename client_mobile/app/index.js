import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Navigator from './containers/Navigator';

const initialState = {};

/* -----------------------
       Redux Reducers
----------------------- */

/* General Reducers
--------------------------------*/
const loginReducer = (state = false, action) => {
  switch (action.type) {
    case ('LOG_IN') : return true;
    case ('LOG_OUT') : return false;
    default : return state;
  }
};

const usernameReducer = (state = '', action) => {
  switch (action.type) {
    case ('UPDATE_USERNAME') : return action.username;
    default : return state;
  }
};

const useridReducer = (state = 0, action) => {
  switch (action.type) {
    case ('UPDATE_USERID') : return action.userid;
    default : return state;
  }
};

const userPicReducer = (state = '', action) => {
  switch (action.type) {
    case ('UPDATE_USERPIC') : return action.userpic;
    default : return state;
  }
};

const checkInOpenReducer = (state = false, action) => {
  switch (action.type) {
    case ('OPEN_CHECKIN') : return true;
    case ('CLOSE_CHECKIN') : return false;
    default : return state;
  }  
};

const profileViewOpen = (state = false, action) => {
  switch (action.type) {
    case ('OPEN_PROFILE') : return true;
    case ('CLOSE_PROFILE') : return false;
    default : return state;
  }  
};

/* Comments Reducers
--------------------------------*/
const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_COMMENT') : return [
      ...state,
      { 
        comment: action.comment,
        latitude: action.latitude,
        longitude: action.longitude,
        rating: action.rating,
        user_id: action.user_id,
        location_id: action.location_id,
        name: action.name,
        comment_audio: action.comment_audio
      }
    ];
    case ('UPDATE_COMMENT') : return action.textComments;
    default : return state;
  }    
};

const commentsRefreshIndicatorReducer = (state = true, action) => {
  switch (action.type) {
    case ('TURN_OFF_COMMENTS') : return false;
    case ('TURN_ON_COMMENTS') : return true;
    default: return state;
  }
}

/* Recorder Reducers
--------------------------------*/
const audioCurrentFileName = (state = '', action) => {
  switch (action.type) {
    case ('UPDATE_AUDIO_CURRENT_FILENAME') : return action.filename;
    default : return state;
  }  
}

const isRecording = (state = false, action) => {
  switch (action.type) {
    case ('START_RECORDING') : return true;
    case ('STOP_RECORDING') : return false;
    default : return state;
  }  
};

const isFinishRecorded = (state = false, action) => {
  switch (action.type) {
    case ('FINISH_RECORDING') : return true;
    case ('UNFINISH_RECORDING') : return false;
    default : return state;
  }  
};

const isPlaying = (state = false, action) => {
  switch (action.type) {
    case ('START_PLAYING') : return true;
    case ('STOP_PLAYING') : return false;
    default : return state;
  }  
};

const currentTime = (state = 0, action) => {
  switch (action.type) {
    case ('UPDATE_AUDIO_CURRENT_TIME') : return action.currentTime;
    default : return state;
  }
};

const audioLength = (state = 0, action) => {
  switch (action.type) {
    case ('UPDATE_AUDIO_LENGTH') : return action.audioLength;
    default : return state;
  }
};

const audioDownloadedList = (state = [], action) => {
  switch (action.type) {
    case ('ADD_AUDIO_LIST') : return [
      ...state,
      action.newAudioFilename
    ];
    case ('UPDATE_AUDIO_LIST') : return action.audioDownloadedList;
    default : return state;
  }      
}

/* Map Reducers
--------------------------------*/
const regionReducer = (state = {}, action) => {
  switch (action.type) {
    case ('MOVE_REGION') : return {
      latitude: action.latitude, 
      longitude: action.longitude,
      latitudeDelta: action.latitudeDelta,
      longitudeDelta: action.longitudeDelta     
    };
    case ('CLEAR_REGION') : return {};
    default : return state;
  } 
}

const myLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case ('MOVE_MY_LOCATION') : return {
      latitude: action.latitude, 
      longitude: action.longitude,
      latitudeDelta: action.latitudeDelta,
      longitudeDelta: action.longitudeDelta     
    };
    case ('CLEAR_MY_LOCATION') : return {};
    default : return state;
  } 
}

const nearbyPlacesReducer = (state = [], action) => {
  switch (action.type) {
    case ('ADD_NEARBY_PLACE') : return [
      ...state,
      {
        coordinates: {
          latitude: action.coordinates.latitude, 
          longitude: action.coordinates.longitude
        },
        name: action.name,
        address: action.address,
        img: action.img,
        category: action.category,    
      }
    ];
    case ('CLEAR_NEARBY_PLACE') : return [];
    default : return state;
  }     
}

const selectedPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case ('SELECT_PLACE') : return {
      latitude: action.latitude, 
      longitude: action.longitude,
      category: action.category,
      name: action.name,
      city: action.city,
      state: action.state
    };
    case ('CLEAR_SELECTED_PLACE') : return {};
    default : return state;
  } 
}  
/* User Reducers
--------------------------------*/
const userHistoryReducer = (state = [], checkin) => {
  switch (checkin.type) {
    case ('USER_HISTORY') : return [
      ...state,
      {
        comment: checkin.comment
      }
    ];
    default : return state;
  }
}

const reducers = combineReducers({
  // General Reducers
  loginReducer,
  usernameReducer,
  useridReducer,
  userPicReducer,
  checkInOpenReducer,
  profileViewOpen,
  // Comments Reducers
  commentsReducer,
  commentsRefreshIndicatorReducer,
  // Recorder Reducers
  audioCurrentFileName,
  isRecording,
  isFinishRecorded,
  isPlaying,
  currentTime,
  audioLength,
  audioDownloadedList,
  // Map Reducers
  regionReducer,
  myLocationReducer,
  selectedPlaceReducer,
  nearbyPlacesReducer,
  // User Reducers
  userHistoryReducer
});

/* -----------------------
       Redux Store
----------------------- */
const store = createStore(reducers, initialState);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}


