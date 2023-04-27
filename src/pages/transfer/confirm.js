import AsideLogin from "@/components/LoginAside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { checkPIN, transaction } from "@/utils/axios/https";
import { useRouter } from "next/router";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";
import Confrim from "@/components/confirm";
import Title from "@/utils/wrapper/title";

function Confirmation() {
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [pin, setPin] = useState("");
  const token = useSelector((state) => state.user.data?.data?.token);
  const amount = parseInt(useSelector((state) => state.transferDetail.amount));

  const firstName = useSelector((state) => state.transferDetail.firstName);
  const id = useSelector((state) => state.transferDetail.id);
  const image = useSelector((state) => state.transferDetail.image);
  const lastName = useSelector((state) => state.transferDetail.lastName);
  const noTelp = useSelector((state) => state.transferDetail.noTelp);
  const note = useSelector((state) => state.transferDetail.note);
  const balance = useSelector((state) => state.transferDetail.balance);
  const balanceLeft = balance - amount;
  const date = new Date();
  const dateString = `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()}, ${date.getFullYear()} - ${date.toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
  const handleOK = () => {
    setModal(true);
  };
  const handleCancle = (e) => {
    e.preventDefault();
    setModal(false);
  };
  const handlePIN = (event, index) => {
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
  const handleCheckPinAndTransaction = (event) => {
    event.preventDefault();
    checkPIN(pin, token)
      .then((response) => {
        return transaction(id, amount, note, token);
      })
      .then((transactionResponse) => {
        setError(false);
        router.push("/transfer/success");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  const isDisabled = pin.length < 6;
  return (
    <PrivateRouteNotLogin>
      <Title title="Transfer Page">
        <Confrim>
          {modal === true && (
            <>
              <div className="fixed inset-0 z-[1] bg-black/80 flex justify-center items-center select-none"></div>
              <div
                className={`rounded-[25px] fixed top-0 left-0 right-0 bottom-0 m-auto bg-white drop-shadow-drop w-[503px] h-[417px] z-50  `}
              >
                <div className="ml-[35px]">
                  <div className="flex">
                    <p className="mt-[35px] font-bold text-lg w-[200px]">
                      Enter PIN to Transfer
                    </p>
                    <p
                      onClick={handleCancle}
                      className="mt-[30px] text-xl ml-[230px] cursor-pointer"
                    >
                      x
                    </p>
                  </div>
                  <p className="w-[302px] mt-5 text-[#3A3D4299]/60">
                    Enter your 6 digits PIN for confirmation to continue
                    transferring money.
                  </p>
                </div>
                <div className="rounded-xl mt-[50px] flex justify-center">
                  {[...Array(6)].map((_, index) => (
                    <input
                      type="text"
                      maxLength="1"
                      key={index}
                      value={pin[index] || ""}
                      onChange={(event) => handlePIN(event, index)}
                      className="w-12 h-12 m-2 text-2xl text-center border-2 border-gray-400 rounded focus:outline-none focus:border-blue-500"
                    />
                  ))}
                </div>
                {error === true ? (
                  <p className="text-center text-red-500 text-lg">
                    PIN yang anda masukkan salah
                  </p>
                ) : (
                  <></>
                )}

                <button
                  type="submit"
                  className={`w-[170px] h-[57px] ml-[300px] mt-20 text-lg text-white rounded-[12px] ${
                    isDisabled
                      ? "bg-[#DADADA] cursor-not-allowed"
                      : "bg-blue-500"
                  } h-14 rounded-xl`}
                  disabled={isDisabled}
                  onClick={handleCheckPinAndTransaction}
                >
                  Continue
                </button>
              </div>
            </>
          )}
          <Header />
          <div className="flex">
            <AsideLogin />
            <div className="w-[850px] ml-[17px] mt-10 rounded-[25px] bg-white">
              <p className="font-bold text-lg ml-[30px] mt-[30px] text-[#3A3D42]">
                Transfer To
              </p>
              <div className="items-center flex ml-[30px] mt-5 w-[790px] h-[110px] drop-shadow-md bg-white rounded-[10px]">
                <Image
                  src={
                    image === null
                      ? "/person.svg"
                      : "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                        image
                  }
                  width={70}
                  height={70}
                  alt="test"
                  className="ml-5 object-cover w-[70px] h-[70px]"
                />
                <div className="ml-5">
                  <p className="text-lg font-bold">
                    {firstName} {lastName}
                  </p>
                  {noTelp === null ? (
                    <p className="text-xs text-[#3a3d42] text-opacity-90">-</p>
                  ) : (
                    <p className="text-xs text-[#3a3d42] text-opacity-90">
                      {noTelp}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-10 ml-[30px] text-[#3a3d42] text-lg font-bold">
                Details
              </p>
              <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
                <p className="text-[#7a7886] mt-[15px] ml-[15px] ">Amount</p>
                <p className="font-bold text-[22px] text-[#514f5b] mt-[10px] ml-[15px]">
                  {`${amount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}{" "}
                </p>
              </div>
              <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
                <p className="text-[#7a7886] mt-[15px] ml-[15px] ">
                  Balance Left
                </p>
                <p className="font-bold text-[22px] text-[#514f5b] mt-[10px] ml-[15px]">
                  {`${balanceLeft.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}{" "}
                </p>
              </div>
              <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
                <p className="text-[#7a7886] mt-[15px] ml-[15px] ">
                  Date & Time
                </p>
                <p className="font-bold text-[22px] text-[#514f5b] mt-[10px] ml-[15px]">
                  {dateString}
                </p>
              </div>
              <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
                <p className="text-[#7a7886] mt-[15px] ml-[15px] ">Notes</p>
                <p className="font-bold text-[22px] text-[#514f5b] mt-[10px] ml-[15px]">
                  {note}
                </p>
              </div>
              <button
                onClick={handleOK}
                className="w-[170px] h-[57px] ml-[650px] mt-8 text-lg text-white bg-blue-500 rounded-[12px]"
              >
                Continue
              </button>
            </div>
          </div>
          <Footer />
        </Confrim>
      </Title>
    </PrivateRouteNotLogin>
  );
}

export default Confirmation;
