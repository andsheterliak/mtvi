const { useEffect } = require('react');
const { useDispatch, useSelector } = require('react-redux');
const { useParams } = require('react-router');

const { movieActions } = require('../movieSlice');

const useMovieState = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieActions.fetchData(id));

    return () => {
      dispatch(movieActions.resetState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
};

export default useMovieState;
