import { useHistory, useLocation } from 'react-router';
import { PaginationPage } from './types';

export const usePagination = () => {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const DEFAULT_PAGE = 1;
  const query = new URLSearchParams(search);
  const pageQuery = query.get('page');
  const page = pageQuery ? Number(pageQuery) : DEFAULT_PAGE;

  const changePage = (newPage: PaginationPage) => {
    if (page === newPage) return false;
    newPage === 1 ? query.delete('page') : query.set('page', newPage.toString());
    history.push(`${pathname}?${query.toString()}`);

    return true;
  };

  return { page, changePage };
};
