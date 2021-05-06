import { arrayOf, bool, exact, func, node, object, string } from 'prop-types';

const dataListItem = {
  name: string.isRequired,
  value: node,
};

const types = {
  isSpacing: bool,
  pageTitle: string.isRequired,
  path: string.isRequired,
  title: string,
  imgPath: string.isRequired,

  pageHeader: {
    headerName: string,
    description: string,
    imgPath: string,
  },

  dataList: arrayOf(exact(dataListItem)).isRequired,
  dataListItem,
  cardsData: arrayOf(object).isRequired,
  containerChildren: node,
  handler: func.isRequired,
};

export default types;
