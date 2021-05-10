const initState = () => {
  const state = {
    items: [],
    isFiltered: false,
  };

  const fromLS = JSON.parse(window.localStorage.getItem("knowledge"));
  return fromLS ? fromLS : state;
};

export default initState;
