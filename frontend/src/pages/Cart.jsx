import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  toggleCartOffcanvas,
  updateQuantity,
} from "../slices/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const showCartOffcanvas = useSelector(
    (state) => state.cart.showCartOffcanvas
  );
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleCheckout = () => {
    localStorage.setItem("orderCart", JSON.stringify(cart));
    dispatch(clearCart());
    dispatch(toggleCartOffcanvas());
    navigate("/orders");
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.warning("Product removed from cart");
  };

  return (
    <div>
      <div
        className={`offcanvas offcanvas-end ${showCartOffcanvas ? "show" : ""}`}
        tabIndex="-1"
        style={{
          visibility: showCartOffcanvas ? "visible" : "hidden",
          top: "58px",
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Cart</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={() => dispatch(toggleCartOffcanvas())}
          ></button>
        </div>
        <div
          className="offcanvas-body"
          style={{ overflowY: "auto", paddingBottom: "60px" }}
        >
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="mb-3 border-bottom pb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                    className="rounded"
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-0">{item.title}</h6>
                    <small>${item.price}</small>

                    <div className="d-flex gap-2">
                      <button
                        className="bg-danger rounded text-white"
                        style={{
                          border: "none",
                          backgroundColor: "#a8e6a1",
                          padding: "0px 10px",
                        }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <div>{item.quantity}</div>
                      <button
                        className="bg-success rounded text-white"
                        style={{
                          border: "none",
                          backgroundColor: "#f8b7b7",
                          padding: "0px 10px",
                        }}
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-close"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              right: "0",
              padding: "10px",
              backgroundColor: "#fff",
              borderTop: "1px solid #ccc",
            }}
          >
            <strong>Total:</strong>
            <strong className="float-end"> ${total}</strong>
            <button
              className="btn btn-dark d-block w-100"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
