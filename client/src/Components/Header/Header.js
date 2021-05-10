import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FILTERING } from "../../redux/types";

const Header = ({ payment, setPayment }) => {
  const dispatch = useDispatch();

  const handlerPayment = () => {
    payment === "Рубли" ? setPayment("Бонусы") : setPayment("Рубли");
  };
  const handlerClickCatalog = () => {
    dispatch({ type: FILTERING, payload: false });
  };

  return (
    <div className="l-header">
      <div className="header">
        <Link to="/" className="header-logo">
          <h3>Облако знаний</h3>
        </Link>
        <div className="header-nav">
          <Link
            to="#"
            className="header-btn header-btn-primary"
            onClick={handlerPayment}
          >
            {payment}
          </Link>
          <Link
            to="/catalog"
            className="header-btn header-btn-primary"
            onClick={handlerClickCatalog}
          >
            Каталог
          </Link>
          <Link to="#" className="header-btn header-btn-primary">
            Активация
          </Link>
          <Link to="#" className="header-btn header-btn-primary">
            Вход
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
