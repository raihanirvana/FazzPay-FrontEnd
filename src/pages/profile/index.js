import AsideLogin from "@/components/LoginAside";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  getData,
  changePass,
  checkPIN,
  makePin,
  changePhone,
  changeName,
} from "@/utils/axios/https";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";
import Modal from "@/components/Modal";
import Title from "@/utils/wrapper/title";

function Profile() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [blop, setBlop] = useState(null);
  const [isPassFilled, setIsPassFilled] = useState(false);
  const [previousFormData, setPreviousFormData] = useState({});
  const [upload, setUpload] = useState(false);
  const token = useSelector((state) => state.user.data?.data?.token);
  const id = useSelector((state) => state.user.data?.data?.id);
  const [formData, setFormData] = useState({
    image: "",
    email: "",
    firstName: "",
    lastName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    noTelp: "",
    file: null,
    testi: null,
  });

  const [editModeTop, setEditModeTop] = useState(false);
  const [editModeBot, setEditModeBot] = useState(false);
  const [save, SetSave] = useState(false);
  const [pin, setPin] = useState("");
  const [mode, setMode] = useState("profile");
  const [isInputFilled, setIsInputFilled] = useState(false);
  const isDisabled = Object.values(formData).some((value) => value === "");
  const isDisabledpin = pin.length < 6;
  const isDisabledPass = !(
    formData.confirmPassword &&
    formData.oldPassword &&
    formData.newPassword
  );
  const isDisabledName = !(formData.firstName || formData.lastName);

  useEffect(() => {
    const { oldPassword, newPassword, confirmPassword } = formData;
    setIsPassFilled(
      oldPassword !== undefined ||
        newPassword !== undefined ||
        confirmPassword !== undefined
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePersonal = () => {
    setMode("personal");
  };
  const handlePass = () => {
    setMode("pass");
  };
  const handlePin = () => {
    setMode("pin");
  };
  const handleLog = () => {
    localStorage.removeItem("persist:wallet");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 300); // tunggu selama 2 detik sebelum memuat ulang halaman
  };
  const handleTelp = () => {
    setMode("phone");
  };
  const handleChanges = (event, index) => {
    const { value } = event.target;
    if (value === "") {
      const newPin = pin.split("");
      newPin[index] = "";
      setPin(newPin.join(""));
    } else if (!isNaN(value) && value.length === 1) {
      const newPin = pin.split("");
      newPin[index] = value;
      setPin(newPin.join(""));
    }
  };
  useEffect(() => {
    getData(id, token)
      .then((response) => {
        setFormData({
          image: response.data.data.image,
          email: response.data.data.email,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          noTelp: response.data.data.noTelp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangePass = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 6 characters and contain at least 1 uppercase letter."
      );
      return;
    }
    changePass(id, token, oldPassword, newPassword, confirmPassword)
      .then((response) => {
        setModal(true);
        setTimeout(() => {
          setFormData({
            ...formData,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setMode("profile");
          setModal(false);
        }, 700);
        setError(null);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.msg);
      });
  };
  const handleCheckPIN = async (e) => {
    e.preventDefault();
    checkPIN(pin, token)
      .then((response) => {
        setModal1(true);
        setTimeout(() => {
          setMode("pinsuccess");
          setModal1(false);
        }, 700);
        setPin("");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setError("PIN Yang Anda Masukkan Salah!!!");
      });
  };
  const handleChangePIN = async (e) => {
    e.preventDefault();
    makePin(pin, id, token)
      .then((response) => {
        setModal2(true);
        setTimeout(() => {
          setMode("profile");
          setModal2(false);
        }, 700);
        setPin("");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangePhone = async (e) => {
    e.preventDefault();
    const { noTelp } = formData;
    changePhone(id, token, noTelp)
      .then((response) => {
        setMode("profile");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFirstName = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
  };
  const handleLastName = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
  };
  const handleEditTop = () => {
    if (editModeTop) {
      setFormData(previousFormData);
      setEditModeTop(false);
      SetSave(false);
    } else {
      setPreviousFormData(formData);
      setEditModeTop(true);
      setFormData({ ...formData, firstName: "" });
      SetSave(true);
    }
  };
  const handleClickUpload = () => {
    setUpload(true);
  };
  const handleEditBot = () => {
    if (editModeBot) {
      setFormData(previousFormData);
      setEditModeBot(false);
      SetSave(false);
    } else {
      setPreviousFormData(formData);
      setEditModeBot(true);
      setFormData({ ...formData, lastName: "" });
      SetSave(true);
    }
  };
  const handleChangeName = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = formData;
    changeName(id, token, firstName, lastName)
      .then((response) => {
        setMode("profile");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onFileInput = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
    setBlop(URL.createObjectURL(e.target.files[0]));
  };

  const onUpload = async () => {
    const { file } = formData;
    if (!file) return;
    const formDataToSend = new FormData();
    formDataToSend.append("image", file);
    const url = `https://fazzpay-rose.vercel.app/user/image/${id}`;
    try {
      const result = await axios.patch(url, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  return (
    <PrivateRouteNotLogin>
      <Title title="Profile Page">
        <Header />
        {modal === true ? (
          <Modal info2="Change Password Success"></Modal>
        ) : (
          <></>
        )}
        {modal1 === true ? <Modal info2="Correct Pin"></Modal> : <></>}
        {modal2 === true ? <Modal info2="Change Pin Sucess"></Modal> : <></>}
        <div className="flex">
          <AsideLogin />
          <div className="w-[850px] ml-[17px] mt-10 rounded-[25px] bg-white">
            {mode === "profile" && (
              <>
                {upload ? (
                  <>
                    <div className="w-[500px] h-[300px] bg-white drop-shadow-drop left-[600px] top-[350px] absolute">
                      <p
                        onClick={() => {
                          setUpload(false),
                            setBlop(null),
                            setFormData({ ...formData, file: null });
                        }}
                        className="mt-2 ml-2 cursor-pointer"
                      >
                        X
                      </p>
                      {blop ? (
                        <Image
                          src={blop}
                          width={80}
                          height={80}
                          alt="face"
                          className="m-auto mt-10 w-[80px] h-[80px] object-cover"
                        />
                      ) : (
                        <Image
                          src="/person.svg"
                          width={80}
                          height={80}
                          alt="kocak"
                          className="m-auto mt-10 w-[80px] h-[80px] object-cover"
                        />
                      )}
                      <div className="mt-[100px]">
                        <input
                          type="file"
                          onChange={onFileInput}
                          className="ml-[100px]"
                        />
                        <button className="btn btn-primary" onClick={onUpload}>
                          Upload
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {formData.image === null ? (
                  <Image
                    src="/person.svg"
                    width={80}
                    height={80}
                    alt="face"
                    className="m-auto mt-10"
                  />
                ) : (
                  <Image
                    src={
                      "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                      formData.image
                    }
                    width={80}
                    height={80}
                    alt="face"
                    className="m-auto mt-10 w-[80px] h-[80px] object-cover"
                  />
                )}
                <div className="flex mt-[10px] justify-center">
                  <Image
                    src="/pen.svg"
                    width={9}
                    height={9}
                    alt="pen"
                    className="cursor-pointer"
                  />
                  <p
                    onClick={handleClickUpload}
                    className="ml-[11px] text-[#7A7886]"
                  >
                    Edit
                  </p>
                </div>
                <p className="text-2xl font-bold text-center mt-[15px]">
                  {formData.firstName + " " + formData.lastName}
                </p>
                <p className="text-base text-[#3a3d42] text-opacity-90 text-center mt-[10px]">
                  {formData.noTelp}
                </p>
                <div
                  onClick={handlePersonal}
                  className="flex m-auto mt-[50px] bg-[#e5e8ed] w-[433px] h-[64px] p-5 rounded-xl cursor-pointer"
                >
                  <p className="text-base font-bold text-[#4d4b57] flex-[3]">
                    Personal Information
                  </p>
                  <Image
                    src="/arrow-right.svg"
                    width={28}
                    height={28}
                    alt="arrow"
                    className=" flex-[1]"
                  />
                </div>
                <div
                  onClick={handlePass}
                  className="flex m-auto mt-5 bg-[#e5e8ed] w-[433px] h-[64px] p-5 rounded-xl cursor-pointer"
                >
                  <p className="text-base font-bold text-[#4d4b57] flex-[3]">
                    Change Password
                  </p>
                  <Image
                    src={"/arrow-right.svg"}
                    width={28}
                    height={28}
                    className=" flex-[1]"
                    alt="arrow"
                  />
                </div>
                <div
                  onClick={handlePin}
                  className="flex m-auto mt-5 bg-[#e5e8ed] w-[433px] h-[64px] p-5 rounded-xl cursor-pointer"
                >
                  <p className="text-base font-bold text-[#4d4b57] flex-[3]">
                    Change Pin
                  </p>
                  <Image
                    src="/arrow-right.svg"
                    width={28}
                    height={28}
                    className=" flex-[1]"
                    alt="arrow"
                  />
                </div>
                <div
                  onClick={handleLog}
                  className="flex m-auto mt-5 bg-[#e5e8ed] w-[433px] h-[64px] p-5 rounded-xl cursor-pointer"
                >
                  <p className="text-base font-bold text-[#4d4b57] flex-[3]">
                    Logout
                  </p>
                </div>
              </>
            )}
            {mode === "personal" && (
              <>
                <div className="">
                  <div className="flex">
                    <p className="font-bold text-lg mt-[30px] text-[#3a3d42] ml-[30px] w-[180px]">
                      Personal Information
                    </p>
                    {save ? (
                      <button
                        type="submit"
                        onClick={handleChangeName}
                        className={`ml-[500px] mt-4 p-2 ${
                          isDisabledName
                            ? "bg-[#DADADA] cursor-not-allowed"
                            : "bg-blue-500"
                        } h-14 rounded-xl`}
                        disabled={isDisabledName}
                      >
                        Save Change
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="text-[#7a7886] mt-[25px] w-[42%] ml-[30px]">
                    We got your personal information from the sign up proccess.
                    If you want to make changes on your information, contact our
                    support.
                  </p>
                  <div className="m-auto mt-10 bg-white rounded-[10px] drop-shadow-drop w-[92%] h-[92px]">
                    <div className="flex">
                      <p className="text-[#7a7886] pt-[15px] ml-[15px] w-[100px]">
                        First Name
                      </p>
                      <Image
                        onClick={handleEditTop}
                        src="/pen.svg"
                        width={15}
                        height={15}
                        className="ml-[630px] mt-5"
                        alt="pen"
                      />
                    </div>
                    {editModeTop ? (
                      <input
                        onChange={handleFirstName}
                        type="text"
                        name="firstName"
                        className="outline-none w-[300px] ml-4 border-b border-black border-solid mt-[10px] text-[22px] font-bold"
                      />
                    ) : (
                      <p className="mt-[10px] text-[22px] ml-[15px] font-bold">
                        {formData.firstName}
                      </p>
                    )}
                  </div>
                  <div className="m-auto mt-5 bg-white rounded-[10px] drop-shadow-drop w-[92%] h-[92px]">
                    <div className="flex">
                      <p className="text-[#7a7886] pt-[15px] ml-[15px] w-[100px]">
                        Last Name
                      </p>
                      <Image
                        onClick={handleEditBot}
                        src="/pen.svg"
                        width={15}
                        height={15}
                        className="ml-[630px] mt-5"
                        alt="pen"
                      />
                    </div>
                    {editModeBot ? (
                      <input
                        onChange={handleLastName}
                        type="text"
                        name="firstName"
                        className="outline-none w-[300px] ml-4 border-b border-black border-solid mt-[10px] text-[22px] font-bold"
                      />
                    ) : (
                      <p className="mt-[10px] text-[22px] ml-[15px] font-bold">
                        {formData.lastName}
                      </p>
                    )}
                  </div>
                  <div className="m-auto mt-5 bg-white rounded-[10px] drop-shadow-drop w-[92%] h-[92px]">
                    <p className="text-[#7a7886] pt-[15px] ml-[15px]">
                      Verified E-mail
                    </p>
                    <p className="mt-[10px] text-[22px] ml-[15px] font-bold">
                      {formData.email}
                    </p>
                  </div>
                  <div className="m-auto mt-5 bg-white rounded-[10px] drop-shadow-drop w-[92%] h-[92px]">
                    <p className="text-[#7a7886] pt-[15px] ml-[15px]">
                      Phone Number
                    </p>
                    {formData.noTelp === null ? (
                      <div className="flex">
                        <p className="mt-[10px] text-[22px] ml-[15px] font-bold w-[250px]">
                          -
                        </p>
                        <p
                          className="text-[#6379F4] ml-[440px] cursor-pointer"
                          onClick={handleTelp}
                        >
                          Manage
                        </p>
                      </div>
                    ) : (
                      <div className="flex">
                        <p className="mt-[10px] text-[22px] ml-[15px] font-bold w-[250px]">
                          {formData.noTelp}
                        </p>
                        <p
                          className="text-[#6379F4] ml-[440px] cursor-pointer"
                          onClick={handleTelp}
                        >
                          Manage
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {mode === "pass" && (
              <>
                <p className="font-bold text-lg mt-[30px] text-[#3a3d42] ml-[30px]">
                  Change Password
                </p>
                <p className="text-[#7a7886] mt-[25px] w-[42%] ml-[30px]">
                  You must enter your current password and then type your new
                  password twice.
                </p>
                <div
                  className={`m-auto mt-[110px] w-[431px] gap-3 flex items-center border-b-2 border-solid ${
                    isPassFilled
                      ? "border-blue-500"
                      : "border-[#A9A9A9] border-opacity-60"
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
                    placeholder="Current password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                  ></input>
                </div>
                <div
                  className={` m-auto mt-[63px] w-[431px] gap-3 flex items-center border-b-2 border-solid ${
                    isPassFilled
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
                    placeholder="New password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                  ></input>
                </div>
                <div
                  className={` m-auto mt-[63px] w-[431px] gap-3 flex items-center border-b-2 border-solid ${
                    isPassFilled
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
                    placeholder="Repeat your password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  ></input>
                </div>
                {error ? (
                  <p className="w-[433px] m-auto mt-5 text-base text-center text-red-500">
                    {error}
                  </p>
                ) : (
                  <></>
                )}
                <button
                  onClick={handleChangePass}
                  type="submit"
                  className={`flex m-auto items-center justify-center w-[432px] mt-[70px] ${
                    isDisabledPass
                      ? "bg-[#DADADA] cursor-not-allowed"
                      : "bg-blue-500"
                  } h-14 rounded-xl`}
                  disabled={isDisabledPass}
                >
                  Change Password
                </button>
              </>
            )}
            {mode === "phone" && (
              <>
                <p className="font-bold text-lg mt-[30px] text-[#3a3d42] ml-[30px]">
                  Edit Phone Number
                </p>
                <p className="text-[#7a7886] mt-[25px] w-[42%] ml-[30px]">
                  Add at least one phone number for the transfer ID so you can
                  start transfering your money to another user.
                </p>
                <div
                  className={` w-[431px]  m-auto mt-[123px] gap-3 flex items-center border-b-2 border-solid ${
                    isInputFilled
                      ? "border-blue-500"
                      : "border-[#A9A9A9} border-opacity-60"
                  } mt-[50px] p-2`}
                >
                  <Image
                    src="/phonenum.svg"
                    alt="image"
                    width={24}
                    height={24}
                    className="h-6"
                  />
                  <p>+62</p>
                  <input
                    className="outline-none"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.noTelp}
                    onChange={handleChange}
                    name="noTelp"
                  ></input>
                </div>
                <button
                  onClick={handleChangePhone}
                  type="submit"
                  className={`flex m-auto items-center justify-center w-[432px] mt-[70px] ${
                    isDisabled
                      ? "bg-[#DADADA] cursor-not-allowed"
                      : "bg-blue-500"
                  } h-14 rounded-xl`}
                  disabled={isDisabled}
                >
                  Edit Phone Number
                </button>
              </>
            )}
            {mode === "pin" && (
              <>
                <p className="font-bold text-lg mt-[30px] text-[#3a3d42] ml-[30px]">
                  Change Pin
                </p>
                <p className="text-[#7a7886] mt-[25px] w-[42%] ml-[30px]">
                  Enter your current 6 digits Fazzpay PIN below to continue to
                  the next steps.
                </p>
                <div className="rounded-xl text-center mt-[100px]">
                  {[...Array(6)].map((_, index) => (
                    <input
                      type="text"
                      maxLength="1"
                      key={index}
                      value={pin[index] || ""}
                      onChange={(event) => handleChanges(event, index)}
                      className={`w-12 h-12 m-2 text-2xl text-center border-2 rounded focus:outline-none ${
                        isInputFilled
                          ? "border-blue-500"
                          : "border-[#A9A9A9} border-opacity-60"
                      }`}
                    />
                  ))}
                </div>
                {error ? (
                  <p className="w-[433px] m-auto mt-5 text-base text-center text-red-500">
                    {error}
                  </p>
                ) : (
                  <></>
                )}
                <button
                  onClick={handleCheckPIN}
                  type="submit"
                  className={`w-[433px] flex justify-center items-center m-auto mt-24 ${
                    isDisabledpin
                      ? "bg-[#DADADA] cursor-not-allowed"
                      : "bg-blue-500"
                  } h-14 rounded-xl`}
                  disabled={isDisabledpin}
                >
                  Confirm
                </button>
              </>
            )}
            {mode === "pinsuccess" && (
              <>
                <p className="font-bold text-lg mt-[30px] text-[#3a3d42] ml-[30px]">
                  Change Pin
                </p>
                <p className="text-[#7a7886] mt-[25px] w-[42%] ml-[30px]">
                  Type your new 6 digits security PIN to use in Fazzpay.
                </p>
                <div className="rounded-xl text-center mt-[100px]">
                  {[...Array(6)].map((_, index) => (
                    <input
                      type="text"
                      maxLength="1"
                      key={index}
                      value={pin[index] || ""}
                      onChange={(event) => handleChanges(event, index)}
                      className={`w-12 h-12 m-2 text-2xl text-center border-2 rounded focus:outline-none ${
                        isInputFilled
                          ? "border-blue-500"
                          : "border-[#A9A9A9} border-opacity-60"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleChangePIN}
                  type="submit"
                  className={`w-[433px] flex justify-center items-center m-auto mt-24 ${
                    isDisabledpin
                      ? "bg-[#DADADA] cursor-not-allowed"
                      : "bg-blue-500"
                  } h-14 rounded-xl`}
                  disabled={isDisabledpin}
                >
                  Change Pin
                </button>
              </>
            )}
          </div>
        </div>
        <Footer />
      </Title>
    </PrivateRouteNotLogin>
  );
}

export default Profile;
