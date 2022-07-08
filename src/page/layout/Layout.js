import { useState } from "react";
import "../css/index.css";
import { useSelector, useDispatch } from "react-redux";
import { userAdd } from "../../app/slice/User";
import { check } from "../../component/check";
import axios from "../../component/axios";
import { useMutation } from "react-query";

function Layout(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegiter] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  async function submitLogin() {
    await axios.post("/auth/login", login).then((res) => {
      check(res);
      const user = res.data.data.user;
      dispatch(
        userAdd({
          login: true,
          fullName: user.fullName,
          email: user.email,
          status: user.status,
          token: user.token,
          image: user.avatar,
          id: user.id,
        })
      );
    });
    window.location.href = "/";
  }

  async function submitRegister() {
    await axios.post("/auth/register", register).then((res) => {
      check(res);
      const user = res.data.data.user;
      dispatch(
        userAdd({
          login: true,
          fullName: user.fullName,
          email: user.email,
          status: user.status,
          token: user.token,
          image: user.avatar,
          id: user.id,
        })
      );
    });
    window.location.href = "/";
  }

  return (
    <div className=" pb-10 bg-[#fcfcfc] ">
      <div className="bg-image max-w-7xl mx-auto">
        <div className="navbar px-12">
          <div className="flex-1">
            <a href="/">
              <img src="/Frame.png" className=" h-16 w-20" alt="logo" />
            </a>
          </div>
          <div className="flex-none">
            {user.login ? (
              <div className="flex gap-7 ">
                {user.status === "ADMIN" ? (
                  ""
                ) : (
                  <a href="/cart" className="mt-2 relative">
                    {cart.length > 0 ? (
                      <div className=" rounded-full text-xs text-center absolute text-white right-0 h-4 w-4 bg-red-500">
                        <p>{cart.length}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    <img src="/cart.png" className="h-5 mt-1 w-5" alt="cart" />
                  </a>
                )}

                <div className="dropdown dropdown-end">
                  <label tabIndex="0">
                    <a className="mr-14 hover:bg-none">
                      <img
                        src={user.image ? `http://${window.location.hostname}:5000/public/image/${user.image}`:"/201025-M-AB981-003.jpeg"}
                        className="h-12 w-12 object-cover rounded-full"
                        alt=""
                      />
                    </a>
                  </label>
                  <ul
                    tabIndex="0"
                    className="dropdown-content menu p-2  bg-base-100 rounded-box w-52"
                  >
                    {user.status === "ADMIN" ? (
                      <li>
                        <a className="flex" href="/add-book">
                          <img
                            src="/Group (1).png"
                            className="h-5 w-5"
                            alt="user"
                          />
                          Add Book
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a className="flex" href="/profil">
                          <img
                            src="/user 2.png"
                            className="h-5 w-5"
                            alt="user"
                          />
                          Profil
                        </a>
                      </li>
                    )}
                    <li>
                      <a className="flex" href="/complain">
                        <img
                          src="/Group.png"
                          className="h-5 w-5"
                          alt="complain"
                        />
                        Complain
                      </a>
                    </li>
                    <hr />
                    <li>
                      <a className="flex" href="/logout">
                        <img
                          src="/logout 1.png"
                          className="h-5 w-5"
                          alt="complain"
                        />
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className=" flex gap-4 mr-8">
                <a
                  href="#my-modal-2"
                  className=" border-2 text-center border-zinc-900 w-24"
                >
                  login
                </a>
                <a
                  href="#my-modal-1"
                  className="w-24 bg-zinc-900 text-white text-center"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
        {/* end header */}

        {props.children}
      </div>

      <div>
        <div className="modal cursor-pointer" id="my-modal-1">
          <div className="modal-box relative w-80">
            <a
              href="#"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </a>
            <h1 className=" text-3xl font-extrabold">Register</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitRegister();
              }}
            >
              <input
                type="text"
                value={register.fullName}
                onChange={(e) => {
                  setRegiter({ ...register, fullName: e.target.value });
                }}
                placeholder="Username"
                className="input input-bordered mt-5 input-sm w-full max-w-xs"
              />
              <input
                type="text"
                value={register.email}
                onChange={(e) => {
                  setRegiter({ ...register, email: e.target.value });
                }}
                placeholder="Email"
                className="input input-bordered mt-5 input-sm w-full max-w-xs"
              />
              <input
                type="text"
                value={register.password}
                onChange={(e) => {
                  setRegiter({ ...register, password: e.target.value });
                }}
                placeholder="Password"
                className="input input-bordered mt-5 input-sm w-full max-w-xs"
              />
              <button
                type="submit"
                className=" bg-black text-white w-full font-medium p-1 mt-5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div>
        <div className="modal cursor-pointer" id="my-modal-2">
          <div className="modal-box w-80 relative">
            <a
              href="#"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </a>
            <h1 className=" text-3xl font-extrabold">Login</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitLogin();
              }}
            >
              <input
                type="text"
                value={login.email}
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                }}
                placeholder="Email"
                className="input input-bordered input-sm mt-5 w-full max-w-xs"
              />
              <input
                type="text"
                value={login.password}
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                }}
                placeholder="Password"
                className="input input-bordered input-sm mt-5 w-full max-w-xs"
              />
              <button
                type="submit"
                className=" bg-black text-white w-full font-medium p-1 mt-5"
              >
                Submit
              </button>
            </form>
            <p className=" text-sm mt-2 text-center">
              Don't have an acount ? klik{" "}
              <a href="#my-modal-2" className=" font-semibold">
                Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
