import AsideLogin from "@/components/LoginAside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";
import {
  setAmount,
  setNote,
  setIds,
  setImage,
  setFirstName,
  setLastName,
  setNoTelp,
} from "@/redux/slices/transfer";
import { useDispatch } from "react-redux";

function success() {
  const router = useRouter();
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.transferDetail.amount);
  const firstName = useSelector((state) => state.transferDetail.firstName);
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
  const handleDashboard = () => {
    dispatch(setAmount(""));
    dispatch(setNote(""));
    dispatch(setIds(""));
    dispatch(setImage(""));
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    dispatch(setNoTelp(""));
    router.push("/dashboard");
  };
  return (
    <PrivateRouteNotLogin>
      <Header />
      <div className="flex">
        <AsideLogin />
        <div className="w-[850px] ml-[17px] mt-10 rounded-[25px] bg-white">
          <Image
            src="/success-green.svg"
            width={70}
            height={70}
            className="m-auto mt-[60px]"
          />
          <p className="text-center text-[#4D4B57] text-[22px] font-bold mt-[30px]">
            Transfer Success
          </p>
          <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
            <p className="text-[#7a7886] mt-[15px] ml-[15px] ">Amount</p>
            <p className="font-bold text-[22px] text-[#514f5b] mt-[10px] ml-[15px]">
              {`${amount.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}`}
            </p>
          </div>
          <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
            <p className="text-[#7a7886] mt-[15px] ml-[15px] ">Balance Left</p>
            <p className="font-bold text-[22px] text-[#514f5b] mt-[10px] ml-[15px]">
              {`${balanceLeft.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}`}
            </p>
          </div>
          <div className="ml-[30px] mt-5 w-[790px] h-[92px] drop-shadow-md bg-white rounded-[10px]">
            <p className="text-[#7a7886] mt-[15px] ml-[15px] ">Date & Time</p>
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
          <p className="font-bold text-lg ml-[30px] mt-10 text-[#3A3D42]">
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
          <button
            onClick={handleDashboard}
            className="w-[170px] h-[57px] ml-[650px] mt-10 text-lg text-white bg-blue-500 rounded-[12px]"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer />
    </PrivateRouteNotLogin>
  );
}

export default success;
