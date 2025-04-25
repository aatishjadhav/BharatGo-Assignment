import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartOffcanvas } from "../slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const handleToggleCart = () => {
    dispatch(toggleCartOffcanvas());
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 sticky-top shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Shopi
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                All
              </Link>
            </li>
            <li Linklass="nav-item">
              <Link className="nav-link" to="/clothes">
                Clothes
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/electronics">
                Electronics
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/furniture">
                Furnitures
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/toys">
                Toys
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class="nav-link" to="/orders">
                My Orders
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/my-account">
                My Account
              </Link>
            </li>
            <li>
              <Link className="nav-link position-relative" onClick={handleToggleCart}>
                <div className="d-inline-block">
                  <MdOutlineShoppingCart size={26} />
                  <span className="px-2">{cart.length}</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
