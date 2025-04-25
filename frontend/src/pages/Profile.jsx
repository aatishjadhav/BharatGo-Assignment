import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfull!");
    navigate("/login");
  };

  return (
    <div className="text-center py-5">
      {user ? (
        <>
          <h5>My Account</h5>
          <h1>{user?.name}</h1>
          <div className="card w-50 mx-auto p-3" style={{ maxWidth: "700px" }}>
            <span>Created by:</span>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={user?.avatar}
                alt="User Avatar"
                className="rounded-circle mt-3"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <div className="mt-3">
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Login To View Your Account </p>
          <Link className="btn btn-primary" to="/login">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
