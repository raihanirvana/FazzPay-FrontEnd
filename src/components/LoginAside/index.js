import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { topUp } from "@/utils/axios/https";
import Modal from "../Modal";

function AsideLogin() {
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [modall, setModall] = useState(false);
  const [amount, setAmount] = useState("");
  const token = useSelector((state) => state.user.data?.data?.token);
  const handleLog = () => {
    localStorage.removeItem("persist:wallet");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 300); // tunggu selama 2 detik sebelum memuat ulang halaman
  };
  const router = useRouter();
  const handleProfile = (e) => {
    e.preventDefault();
    router.push("/profile");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };
  const handleTopUp = (e) => {
    e.preventDefault();
    setModal(true);
  };
  const handleCancle = (e) => {
    e.preventDefault();
    setModal(false);
    setAmount("");
    setError(false);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDashboard = (e) => {
    e.preventDefault();
    router.push("/dashboard");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };
  const handleTransfer = (e) => {
    e.preventDefault();
    router.push("/transfer");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const handletopup = async (e) => {
    e.preventDefault();
    try {
      const response = await topUp(token, amount);
      setModall(true);
      setModal(false);
      setAmount("");
      const redirectUrl = response.data.data.redirectUrl;
      window.open(redirectUrl, "_blank");
      setTimeout(() => {
        setModall(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setError("Isi No Handphone Anda Terlebih Dahulu!!!");
    }
  };
  const isDisabled = !amount;
  return (
    <>
      {modall === true ? <Modal info2="Top Up Berhasil"></Modal> : <></>}
      {modal === true && (
        <>
          <div className="fixed inset-0 z-[1] bg-black/80 flex justify-center items-center select-none"></div>
          <div
            className={`rounded-[25px] fixed top-0 left-0 right-0 bottom-0 m-auto bg-white drop-shadow-drop w-[503px] h-[417px] z-50  `}
          >
            <div className="ml-[35px]">
              <div className="flex">
                <p className="mt-[35px] font-bold text-lg">Topup</p>
                <p
                  onClick={handleCancle}
                  className="mt-[30px] text-xl ml-[359px] cursor-pointer"
                >
                  x
                </p>
              </div>
              <p className="w-[302px] mt-5 text-[#3A3D4299]/60">
                Enter the amount of money and click submit
              </p>
              <input
                type="number"
                value={amount}
                onChange={handleAmount}
                className="p-2 border border-solid border-[#A9A9A9]/60 w-[437px] mt-[43px] h-[65px]"
              />
            </div>
            {error ? (
              <p className="text-center mt-2 text-red-500 text-lg">{error}</p>
            ) : (
              <></>
            )}

            <button
              onClick={handletopup}
              type="submit"
              disabled={isDisabled}
              className={`w-[170px] h-[57px] rounded-[12px] mt-[77px] ml-[298px] ${
                isDisabled ? "bg-[#DADADA] cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              Submit
            </button>
          </div>
        </>
      )}
      <div
        className={`w-[270px] bg-white rounded-3xl ml-[150px] mt-10 ${
          router.pathname === "/transfer/success" ||
          router.pathname === "/transfer/failed"
            ? "h-[1035px]"
            : router.pathname === "/transfer/confirm"
            ? "h-[850px]"
            : "h-[678px]"
        }`}
      >
        <div
          className={`flex mt-[50px]  ${
            router.pathname === "/dashboard"
              ? "border-l-4 border-solid border-blue-500"
              : ""
          } `}
        >
          <Image
            src={
              router.pathname === "/dashboard" ? "/grid-blue.svg" : "/grid.svg"
            }
            width={28}
            height={28}
            alt="image"
            className="ml-[30px]"
          />
          <p
            onClick={handleDashboard}
            className={`text-lg font-bold text-opacity-80 ml-[23px]  hover:cursor-pointer hover:text-blue-500 ${
              router.pathname === "/dashboard"
                ? "text-blue-500"
                : "text-[#3A3D42]"
            }`}
          >
            Dashboard
          </p>
        </div>
        <div className="flex pt-[50px]">
          <Image
            src={
              router.pathname === "/transfer" ||
              router.pathname === "/transfer/[dataId]" ||
              router.pathname === "/transfer/confirm" ||
              router.pathname === "/transfer/failed" ||
              router.pathname === "/transfer/success"
                ? "/arrow-blue.svg"
                : "/arrow-up.svg"
            }
            width={28}
            height={28}
            alt="image"
            className="ml-[30px]"
          />
          <p
            onClick={handleTransfer}
            className={`text-lg font-bold text-opacity-80 ml-[23px]  hover:cursor-pointer hover:text-blue-500 ${
              router.pathname === "/transfer" ||
              router.pathname === "/transfer/[dataId]" ||
              router.pathname === "/transfer/confirm" ||
              router.pathname === "/transfer/failed" ||
              router.pathname === "/transfer/success"
                ? "text-blue-500"
                : "text-[#3A3D42]"
            }`}
          >
            Transfer
          </p>
        </div>
        <div className="flex pt-[50px]">
          <Image
            src="/plus.svg"
            width={28}
            height={28}
            alt="image"
            className="ml-[30px]"
          />
          <p
            onClick={handleTopUp}
            className="text-lg font-bold text-[#3A3D42] text-opacity-80 ml-[23px] hover:cursor-pointer hover:text-blue-500"
          >
            Top Up
          </p>
        </div>
        <div
          className={`flex mt-[50px]  ${
            router.pathname === "/profile"
              ? "border-l-4 border-solid border-blue-500"
              : ""
          } `}
        >
          <Image
            src={
              router.pathname === "/profile" ? "/user-blue.svg" : "/user.svg"
            }
            width={28}
            height={28}
            alt="image"
            className="ml-[30px]"
          />
          <p
            className={`text-lg font-bold text-opacity-80 ml-[23px]  hover:cursor-pointer hover:text-blue-500 ${
              router.pathname === "/profile"
                ? "text-blue-500"
                : "text-[#3A3D42]"
            }`}
            onClick={handleProfile}
          >
            Profile
          </p>
        </div>
        <div
          className={`flex ${
            router.pathname === "/transfer/success" ||
            router.pathname === "/transfer/failed"
              ? "pt-[625px]"
              : router.pathname === "/transfer/confirm"
              ? "pt-[440px]"
              : "pt-[268px]"
          }`}
        >
          <Image
            src="/log-out.svg"
            width={28}
            height={28}
            alt="image"
            className="ml-[30px]"
          />
          <p
            onClick={handleLog}
            className="text-lg font-bold text-[#3A3D42] text-opacity-80 ml-[23px] cursor-pointer hover:text-blue-500"
          >
            Logout
          </p>
        </div>
      </div>
    </>
  );
}

export default AsideLogin;
