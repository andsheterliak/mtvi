const getSelectedGenres = (genres) => {
  return genres
    .reduce((acc, item) => {
      if (item.isSelected) acc.push(item.id);

      return acc;
    }, [])
    .join(',');
};

export default getSelectedGenres;
