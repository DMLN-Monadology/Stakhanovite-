import { connect } from 'react-redux';
import Board from './board';
import { fetchBoard } from '../../actions/board_actions';
import { createList, restructureList } from '../../actions/list_actions';


const mapStateToProps = (state, { params }) => {
  const boardId = parseInt(params.boardId);
  return {
    boardId: boardId,
    boards: state.session.currentUser.owned_boards,
    current_board: state.session.current_board
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBoard: (id) => dispatch(fetchBoard(id)),
  createList: (list) => dispatch(createList(list)),
  restructureList: (list) => dispatch(restructureList(list))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
