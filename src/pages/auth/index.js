import Aside from "../../components/aside";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { usersAction } from "../../redux/slices/users";
import { useDispatch } from "react-redux";
import { signup } from "@/utils/axios/https";
import PrivateRouteLOGIN from "@/components/PrivateRouteNotLogin";
import Modal from "@/components/Modal";
import Title from "@/utils/wrapper/title";

function Auth() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const modeParam = searchParams.get("mode");
    setMode(modeParam === "Signup" ? "Signup" : "Login");
  }, []);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalsign, setModalsign] = useState(false);
  const [mode, setMode] = useState("Login");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [isInputFilled, setIsInputFilled] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setIsInputFilled(Object.values(formData).some((value) => value !== ""));
  }, [formData]);

  const handleModeLogin = (e) => {
    setMode("Login");
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleModeSignup = (e) => {
    setMode("Signup");
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = formData;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters and contain at least 1 uppercase letter."
      );
      return;
    }
    signup(firstName, lastName, email, password)
      .then((response) => {
        setModalsign(true);
        setTimeout(() => {
          setMode("Login");
          setModalsign(false);
        }, 700);
        setFormData({
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        if (err.response.data.msg === "Bad Request (No recipients defined)")
          return setError("Gunakan Email Yang Valid");
        setError(err.response.data.msg);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = formData;
    dispatch(usersAction.storeLogin({ email, password }))
      .unwrap()
      .then((res) => {
        setModal(true);
        setTimeout(() => {
          router.push("/makeyourpin");
          setModal(false);
        }, 700);
        setError(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.msg === "Email / Account not registed")
          return setError("Email Belum Terdaftar");
        setError("Email atau Password Anda Salah");
      });
  };
  const handleForgot = () => {
    router.push("/reset-password");
  };
  const isDisabled = !(formData.email && formData.password);
  const isDisabledSUP = Object.values(formData).some((value) => value === "");
  return (
    <PrivateRouteLOGIN>
      <Title title="Auth Page">
        {modal === true ? <Modal info="Login Berhasil"></Modal> : <></>}
        {modalsign === true ? (
          <Modal
            info="Sign Up Berhasil"
            info2="Silahkan Cek Emai Anda Untuk Verifikasi E-Mail"
          ></Modal>
        ) : (
          <></>
        )}

        <div className="flex">
          <Aside className="" />
          <div className="flex-[1] bg-white">
            <p className="text-2xl font-bold ml-[50px] pt-[121px] w-[384px] leading-8">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </p>
            <p className="text-[#3A3D42] text-opacity-60 ml-[50px] w-[433px] mt-[30px] leading-7">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </p>
            {mode === "Login" && (
              <>
                <form className="">
                  <div
                    className={`w-[433px] gap-3 ml-[50px] flex items-center border-b-2 border-solid ${
                      isInputFilled
                        ? "border-blue-500"
                        : "border-[#A9A9A9} border-opacity-60"
                    } mt-[50px] p-2`}
                  >
                    <Image
                      src="/mail.svg"
                      alt="image"
                      width={24}
                      height={24}
                      className="h-6"
                    />
                    <input
                      className="outline-none w-[433px]"
                      type="email"
                      placeholder="Enter your e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                    ></input>
                  </div>
                  <div
                    className={`w-[433px] gap-3 ml-[50px] flex items-center border-b-2 border-solid ${
                      isInputFilled
                        ? "border-blue-500"
                        : "border-[#A9A9A9} border-opacity-60"
                    } mt-[50px] p-2`}
                  >
                    <Image
                      src="/lock.svg"
                      alt="image"
                      width={24}
                      height={24}
                      className="h-6"
                    />
                    <input
                      className="outline-none w-[433px]"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                    ></input>
                  </div>
                  <p
                    onClick={handleForgot}
                    className="mt-5 text-sm font-semibold ml-[370px] cursor-pointer"
                  >
                    Forgot password?
                  </p>
                  {error ? (
                    <p className="w-[433px] ml-[50px] mt-5 text-base text-center text-red-500">
                      {error}
                    </p>
                  ) : (
                    <></>
                  )}
                  <button
                    type="submit"
                    className={`w-[433px] ml-[50px] mt-24 ${
                      isDisabled
                        ? "bg-[#DADADA] cursor-not-allowed"
                        : "bg-blue-500"
                    } h-14 rounded-xl`}
                    disabled={isDisabled}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="ml-[150px] mt-10">
                    Don’t have an account? Let’s{" "}
                    <span
                      className="cursor-pointer text-blue-500"
                      onClick={handleModeSignup}
                    >
                      Sign Up
                    </span>
                  </p>
                </form>
              </>
            )}
            {mode === "Signup" && (
              <>
                <form>
                  <div>
                    <div
                      className={`w-[433px] gap-3 ml-[50px] flex items-center border-b-2 border-solid ${
                        isInputFilled
                          ? "border-blue-500"
                          : "border-[#A9A9A9} border-opacity-60"
                      } mt-[50px] p-2`}
                    >
                      <Image
                        src="/person.svg"
                        alt="image"
                        width={24}
                        height={24}
                        className="h-6"
                      />
                      <input
                        className="outline-none"
                        type="text"
                        placeholder="Enter your firstname"
                        value={formData.firstName}
                        onChange={handleChange}
                        name="firstName"
                      ></input>
                    </div>
                    <div
                      className={`w-[433px] gap-3 ml-[50px] flex items-center border-b-2 border-solid ${
                        isInputFilled
                          ? "border-blue-500"
                          : "border-[#A9A9A9} border-opacity-60"
                      } mt-[50px] p-2`}
                    >
                      <Image
                        src="/person.svg"
                        alt="image"
                        width={24}
                        height={24}
                        className="h-6"
                      />
                      <input
                        className="outline-none"
                        type="text"
                        placeholder="Enter your lastname"
                        value={formData.lastName}
                        onChange={handleChange}
                        name="lastName"
                      ></input>
                    </div>
                    <div
                      className={`w-[433px] gap-3 ml-[50px] flex items-center border-b-2 border-solid ${
                        isInputFilled
                          ? "border-blue-500"
                          : "border-[#A9A9A9} border-opacity-60"
                      } mt-[50px] p-2`}
                    >
                      <Image
                        src="/mail.svg"
                        alt="image"
                        width={24}
                        height={24}
                        className="h-6"
                      />
                      <input
                        className="outline-none w-[400px]"
                        type="email"
                        placeholder="Enter your e-mail"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                      ></input>
                    </div>
                    <div
                      className={`w-[433px] gap-3 ml-[50px] flex items-center border-b-2 border-solid ${
                        isInputFilled
                          ? "border-blue-500"
                          : "border-[#A9A9A9} border-opacity-60"
                      } mt-[50px] p-2`}
                    >
                      <Image
                        src="/lock.svg"
                        alt="image"
                        width={24}
                        height={24}
                        className="h-6"
                      />
                      <input
                        className="outline-none"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                      ></input>
                    </div>
                    {error ? (
                      <p className="w-[433px] ml-[50px] mt-5 text-base text-center text-red-500">
                        {error}
                      </p>
                    ) : (
                      <></>
                    )}
                    <button
                      type="submit"
                      className={`w-[433px] ml-[50px] mt-24 ${
                        isDisabled
                          ? "bg-[#DADADA] cursor-not-allowed"
                          : "bg-blue-500"
                      } h-14 rounded-xl`}
                      disabled={isDisabledSUP}
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </button>
                    <p className="ml-[150px] mt-10">
                      Already have an account? Let’s{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={handleModeLogin}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </Title>
    </PrivateRouteLOGIN>
  );
}

export default Auth;
