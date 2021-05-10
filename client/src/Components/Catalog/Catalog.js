import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Catalog({ payment }) {
  const items = useSelector((state) => state.items);
  return (
    <ul className="courses-list" id="courseslist">
      {items.map((item) => (
        <li key={item.courseHash} className="courses-sci">
          <div className="sci-figure">
            <img src="#" alt={item.subject} />
          </div>
          <div className="sci-info">
            <p className="sci-title">{item.subject}</p>
            {item.grade.split(";").length > 1 ? (
              <p className="sci-grade">
                {item.grade.split(";")[0]} -&nbsp;
                {item.grade.split(";")[item.grade.split(";").length - 1]}
                &nbsp;классы
              </p>
            ) : (
              <p className="sci-grade">{item.grade}&nbsp;класс</p>
            )}

            <p className="sci-genre">{item.genre}</p>
            <p className="sci-meta">
              <Link to="#">Подробнее</Link>
            </p>
            <p className="sci-controls">
              <button className="pure-button pure-button-primary btn-fluid">
                {payment.payment === "Рубли" ? (
                  <h6>{item.price} руб.</h6>
                ) : (
                  <h6>{item.priceBonus} бон.</h6>
                )}
              </button>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Catalog;
