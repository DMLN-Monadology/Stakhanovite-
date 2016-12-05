import {hashHistory} from 'react-router'


//ACTIONS
import {SIGN_IN,
        SIGN_OUT,
        SIGN_UP,
        receiveCurrentUser,
        receiveErrors
} from '../actions/session_actions';

import { CREATE_BOARD,
         FETCH_BOARD,
         FETCH_USERS_SEARCHES,
         receiveUsersSearches,
         receiveBoard,
         receiveBoardShow,
         receiveCurrentBoard
} from '../actions/board_actions';

import { CREATE_LIST,
         RESTRUCTURE_LIST
} from '../actions/list_actions';

import { CREATE_CARD,
         RESTRUCTURE_CARD
} from '../actions/card_actions';


//api utilities
import { signin, signup, signout } from '../util/session_api_util';
import { createBoard, fetchBoard, fetchUsersSearches } from '../util/board_api_util';
import { createList, restructureList } from '../util/list_api_util';
import { createCard, restructureCard  } from '../util/card_api_util';

const SessionMiddleware = store => next => action => {

  const userSuccessCallback = (user) => store.dispatch(receiveCurrentUser(user));
  const userErrorCallback = (errors) => store.dispatch(receiveErrors(errors.responseJSON));

  const boardSuccessCallback = (board) => store.dispatch(receiveBoard(board));
  const boardShowSuccessCallback = (board) => store.dispatch(receiveBoardShow(board));

  const listSuccessCallback = (board) => store.dispatch(receiveBoardShow(board));

  const fetchUsersSearchesCB = (users) => store.dispatch(receiveUsersSearches(users));

  const testErrorCB = () => {return console.log("failure!");};

  switch(action.type){
    case SIGN_UP:
      signup(action.user, userSuccessCallback, userErrorCallback)
      return next(action);
    case SIGN_IN:
      signin(action.user, userSuccessCallback, userErrorCallback)
      return next(action);
    case SIGN_OUT:
      signout( () => {
        hashHistory.push("/");
        return next(action)
        });
      break;
    // Boards
    case FETCH_USERS_SEARCHES:
      fetchUsersSearches(fetchUsersSearchesCB)
      return next(action);
    case CREATE_BOARD:
      createBoard(action.board, boardSuccessCallback, testErrorCB)
      return next(action);
    case FETCH_BOARD:
      fetchBoard(action.id, boardShowSuccessCallback);
      return next(action);
    // Lists
    case CREATE_LIST:
      createList(action.list, boardShowSuccessCallback, testErrorCB)
      return next(action);
    case RESTRUCTURE_LIST:
      restructureList(action.list, boardShowSuccessCallback, testErrorCB);
      return next(action);
    // Cards
    case CREATE_CARD:
      createCard(action.card, boardShowSuccessCallback, testErrorCB);
      return next(action);
    case RESTRUCTURE_CARD:
      restructureCard(action.card, boardShowSuccessCallback, testErrorCB);
      return next(action);
    default:
      return next(action);
  }
}

export default SessionMiddleware;
