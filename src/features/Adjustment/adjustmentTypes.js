import {
  arrayOf,
  bool,
  exact,
  number,
  objectOf,
  string,
  shape,
} from 'prop-types';

const adjustmentTypes = {
  sortByOptions: objectOf(
    exact({
      name: string.isRequired,
      apiName: string.isRequired,
    })
  ).isRequired,

  userScoreRange: exact({
    min: number.isRequired,
    max: number.isRequired,
  }).isRequired,

  dateTitle: string.isRequired,
  modalTitle: string.isRequired,

  dates: {
    from: string,
    to: string,
  },

  userScore: arrayOf(number).isRequired,

  genres: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      isSelected: bool.isRequired,
    })
  ).isRequired,
};

export default adjustmentTypes;
