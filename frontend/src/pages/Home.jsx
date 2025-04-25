import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts, fetchByCategory } from "../slices/productsSlice";
import { useSelector } from "react-redux";
import { addToCart, removeFromCart, toggleCartOffcanvas, updateQuantity } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Cart from "./Cart";

const categoryMap = {
  clothes: 1,
  electronics: 2,
  furniture: 3,
  toys: 4,
};

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  // const [showCartOffcanvas, setShowCartOffcanvas] = useState(false);
  const showCartOffcanvas = useSelector((state) => state.cart.showCartOffcanvas);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const { products, status, error } = useSelector((state) => state.products);
  console.log("product data", products);

  useEffect(() => {
    if (!category || category === "All") {
      dispatch(fetchProducts());
    } else {
      const categoryId = categoryMap[category];
      if (categoryId) {
        dispatch(fetchByCategory(categoryId));
      }
    }
  }, [dispatch, category]);

  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search)
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowOffcanvas(true);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Product added to cart.");
    dispatch(toggleCartOffcanvas(true));
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log("Cart items", cart);


 

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleCheckout = () => {
    navigate("/orders");
  }

  return (
    <>
     
      <div className="container">
        <div className="text-center py-5">
          <p>Home</p>
          <input
            className="form-control d-block mx-auto"
            type="text"
            placeholder="Search a product"
            style={{ width: "350px", height: "50px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {status === "loading" ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {filteredProducts?.map((product) => (
              <div
                className="col-md-3 mb-4"
                key={product.id}
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <div className="h-100 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={product.images[0]}
                      className="card-img-top rounded"
                      alt={product.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <button
                      className="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                      style={{ width: "30px", height: "30px", padding: 0 }}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      +
                    </button>
                    <div className="position-absolute bottom-0 start-0 p-2 text-black">
                      <span className="badge bg-light text-black">
                        {product.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-3 px-1">
                    <h5 style={{ fontSize: "16px" }}>{product.title}</h5>

                    <p className="fw-bold">{product.price}$</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={`offcanvas offcanvas-end ${showOffcanvas ? "show" : ""}`}
          tabIndex="-1"
          style={{
            visibility: showOffcanvas ? "visible" : "hidden",
            top: "63px",
          }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Detail</h5>
            <button
              type="button"
              className="btn-close text-reset"
              onClick={() => setShowOffcanvas(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            {selectedProduct && (
              <>
                <div className="text-center">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.title}
                    className="img-fluid mb-3 rounded"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <p>
                    <strong>Price:</strong> {selectedProduct.price}$
                  </p>
                  <p>
                    <strong>{selectedProduct.title}</strong>
                  </p>
                </div>
                <p>{selectedProduct.description}</p>
              </>
            )}
          </div>
        </div>
        {/* <div
          className={`offcanvas offcanvas-end ${showCartOffcanvas ? "show" : ""}`}
          tabIndex="-1"
          style={{
            visibility: showCartOffcanvas ? "visible" : "hidden",
            top: "63px",
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
                        width: "60px",
                        height: "60px",
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
                          className="bg-success rounded text-white"
                          style={{ border: "none", backgroundColor: "#a8e6a1" }}
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
                        <div>{item.quantity}</div>
                        <button
                          className="bg-danger rounded text-white"
                          style={{
                            border: "none",
                            backgroundColor: "#f8b7b7",
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
              <button className="btn btn-dark d-block w-100" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div> */}
        <Cart/>
      </div>
    </>
  );
};

export default Home;
