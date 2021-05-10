import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genres, grades, subjects } from "../../lib/consts";
import { FILTERING, GET_ALL_ITEMS } from "../../redux/types";
import Catalog from "../Catalog/Catalog";
import Filtered from "../Filtered/Filtered";

const Home = (payment) => {
  const items = useSelector((state) => state.items);
  const isFiltered = useSelector((state) => state.isFiltered);
  const [afterFilteredSubject, setAfterFilteredSubject] = useState(items);
  const [subjectValue, setSubjectValue] = useState("");
  const [genreValue, setGenreValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const dispatch = useDispatch();

  const getItemsFetch = useCallback(async () => {
    const response = await fetch(
      "https://krapipl.imumk.ru:8443/api/mobilev1/update",
      {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: "" }), // body data type must match "Content-Type" header
      }
    );
    const items = await response.json();
    dispatch({ type: GET_ALL_ITEMS, payload: items.items });
  }, [dispatch]);

  useEffect(() => {
    getItemsFetch();
  }, [getItemsFetch]);

  const filterSubject = useCallback(() => {
    subjectValue === "" && genreValue === "" && gradeValue === ""
      ? dispatch({ type: FILTERING, payload: false })
      : dispatch({ type: FILTERING, payload: true });

    let newItems = items.filter((item) => {
      return (
        item.subject
          .toString()
          .toLowerCase()
          .indexOf(subjectValue.toLowerCase()) > -1 &&
        item.genre.toString().toLowerCase().indexOf(genreValue.toLowerCase()) >
          -1 &&
        item.grade.toString().toLowerCase().indexOf(gradeValue.toLowerCase()) >
          -1
      );
    });
    setAfterFilteredSubject(newItems);
  }, [items, subjectValue, genreValue, gradeValue, dispatch]);

  useEffect(() => {
    filterSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreValue, subjectValue, gradeValue]);

  const handlerClickButton = (e) => {
    e.preventDefault();
    subjectValue === "" && genreValue === "" && gradeValue === ""
      ? dispatch({ type: FILTERING, payload: false })
      : dispatch({ type: FILTERING, payload: true });

    let newItems = items.filter((item) => {
      if (
        item.subject
          .toString()
          .toLowerCase()
          .includes(inputSearch.toLowerCase())
      ) {
        setSubjectValue(inputSearch);
        setGenreValue("");
        setGradeValue("");
        return (
          item.subject
            .toString()
            .toLowerCase()
            .indexOf(subjectValue.toLowerCase()) > -1
        );
      }
      if (
        item.genre.toString().toLowerCase().includes(inputSearch.toLowerCase())
      ) {
        setSubjectValue("");
        setGenreValue(inputSearch);
        setGradeValue("");
        return (
          item.genre
            .toString()
            .toLowerCase()
            .indexOf(genreValue.toLowerCase()) > -1
        );
      }
      if (
        item.grade.toString().toLowerCase().includes(inputSearch.toLowerCase())
      ) {
        setSubjectValue("");
        setGenreValue("");
        setGradeValue(inputSearch);
        return (
          item.grade
            .toString()
            .toLowerCase()
            .indexOf(gradeValue.toLowerCase()) > -1
        );
      }
      return item;
    });
    setAfterFilteredSubject(newItems);
    setInputSearch("");
  };
  console.log(isFiltered);
  return (
    <div className="l-container-4">
      <h1 className="u-text-center">Витрина</h1>
      <div className="courses u-mt-30">
        <div
          className="courses-form form d-flex justify-content-evenly"
          id="filterform"
        >
          <div className="navs">
            <select
              className="strings"
              id="subj"
              name="subj"
              onChange={(e) => setSubjectValue(e.target.value)}
            >
              <option value="" key={"default"} defaultChecked={true}>
                {""}
                Все предметы
              </option>
              {subjects.map((subject, i) => (
                <option key={i}>{subject}</option>
              ))}
            </select>
          </div>
          <div className="navs">
            <select
              className="strings"
              id="genre"
              name="genre"
              onChange={(e) => setGenreValue(e.target.value)}
            >
              <option value="">Все жанры</option>
              {genres.map((genre, i) => (
                <option key={i}>{genre}</option>
              ))}
            </select>
          </div>
          <div className="navs">
            <select
              className="strings"
              id="grade"
              name="grade"
              onChange={(e) => setGradeValue(e.target.value)}
            >
              <option value="">Все классы</option>
              {grades.map((grade, i) => (
                <option key={i}>{grade}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              className="borderFind"
              type="text"
              placeholder="Поиск"
              id="search"
              name="search"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <button
              className="courses-form-search-btn"
              type="submit"
              title="Найти"
              onClick={handlerClickButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="grey"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {!isFiltered ? (
        <Catalog payment={payment} />
      ) : (
        <Filtered
          payment={payment}
          afterFilteredSubject={afterFilteredSubject}
        />
      )}
    </div>
  );
};

export default Home;
