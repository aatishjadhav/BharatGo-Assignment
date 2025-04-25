import { useEffect, useState } from "react";

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
          <div>
            {orderData?.length > 0 ? (
              <div>
                {orderData?.map((item, index) => (
                  <div key={item.id} className="mb-3 border-bottom pb-2">
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p>No orders found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
