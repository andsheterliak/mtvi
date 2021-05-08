import {
  arrayOf,
  bool,
  element,
  exact,
  func,
  node,
  object,
  string,
} from 'prop-types';

const dataListItem = {
  name: string.isRequired,
  value: node,
};

const types = {
  generic: {
    title: string,
    path: string,
    handler: func,
    name: string,
    description: string,
    gridItems: node,
    anyChildren: node,
    label: string,
  },

  specific: {
    isSpacing: bool,
    pageTitle: string.isRequired,
    dataList: arrayOf(exact(dataListItem)).isRequired,
    dataListItem,
    cardsData: arrayOf(object).isRequired,
    goBackHeader: element.isRequired,
    seeAllLinkName: string.isRequired,
  },
};

export default types;
