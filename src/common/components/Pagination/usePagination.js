import { useHistory, useLocation } from 'react-router';

const usePagination = () => {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const DEFAULT_PAGE = 1;
  const query = new URLSearchParams(search);
  const pageQuery = query.get('page');
  const page = parseInt(pageQuery || `${DEFAULT_PAGE}`, 10);

  const changePage = (event, newPage) => {
    if (page === newPage) return false;
    newPage === 1 ? query.delete('page') : query.set('page', newPage);
    history.push(`${pathname}?${query.toString()}`);
    return true;
  };

  return { page, changePage };
};

export default usePagination;
