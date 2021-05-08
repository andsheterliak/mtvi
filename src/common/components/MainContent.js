import types from '~common/types';

const MainContent = ({ children }) => {
  return <main>{children}</main>;
};

MainContent.propTypes = {
  children: types.generic.anyChildren.isRequired,
};

export default MainContent;
