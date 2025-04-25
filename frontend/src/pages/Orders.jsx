import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("orderCart");
    if (savedCart) {
      setOrderData(JSON.parse(savedCart));
    }
  }, []);
  return (
    <div>
      <div className="container py-3">
        <h3 className="text-center">My Orders</h3>

        <div>
          {orderData?.length > 0 ? (
            <div className="py-3">
              {orderData?.map((item, index) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-center card mx-auto p-3"
                  style={{ width: "30%" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "100%" }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                      className="rounded"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{item.title}</h6>
                      <p>${item.price}</p>
                      <button
                        className="bg-secondary rounded text-white"
                        style={{
                          border: "none",
                          backgroundColor: "#a8e6a1",
                          padding: "0px 8px",
                        }}
                      >
                        {item.quantity}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p> Nothing yet, add some produicts and check them out </p>
              <Link className="btn btn-primary" to="/">
                Explore Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
