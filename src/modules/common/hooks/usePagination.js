import { useLocation } from 'react-router';

const usePagination = () => {
  const { search, pathname } = useLocation();

  const DEFAULT_PAGE = 1;
  const query = new URLSearchParams(search);
  const pageQuery = query.get('page');
  const page = parseInt(pageQuery || `${DEFAULT_PAGE}`, 10);

  return { pathname, page };
};

export default usePagination;
