import Aside from "../../components/aside";
import Image from "next/image";
import { useState } from "react";
import { makePin } from "@/utils/axios/https";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Checkpin from "@/components/checkpin";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";

function Pin() {
  const [mode, setMode] = useState("before");
  const router = useRouter();
  const [pin, setPin] = useState("");
  const isDisabled = pin.length < 6;
  const id = useSelector((state) => state.user.data.data.id);
  const token = useSelector((state) => state.user.data.data.token);
  const handleChange = (event, index) => {
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
  const handlePin = (event) => {
    event.preventDefault();
    makePin(pin, id, token)
      .then((data) => {
        setMode("after");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAfter = (event) => {
    event.preventDefault();
    router.push("/dashboard");
  };
  return (
    <Checkpin>
      <div className="flex">
        <Aside className="" />
        <div className="flex-[1] bg-white">
          {mode === "before" && (
            <>
              <p className="text-2xl font-bold ml-[50px] pt-[121px] w-[384px] leading-8">
                Start Accessing Banking Needs With All Devices and All Platforms
                With 30.000+ Users
              </p>
              <p className="text-[#3A3D42] text-opacity-60 ml-[50px] w-[433px] mt-[30px] leading-7">
                Transfering money is eassier than ever, you can access FazzPay
                wherever you are. Desktop, laptop, mobile phone? we cover all of
                that for you!
              </p>
              <div className="rounded-xl ml-[50px] mt-[50px]">
                {[...Array(6)].map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    value={pin[index] || ""}
                    onChange={(event) => handleChange(event, index)}
                    className="w-12 h-12 m-2 text-2xl text-center border-2 border-gray-400 rounded focus:outline-none focus:border-blue-500"
                  />
                ))}
              </div>
              <button
                type="submit"
                className={`w-[433px] ml-[50px] mt-24 ${
                  isDisabled ? "bg-[#DADADA] cursor-not-allowed" : "bg-blue-500"
                } h-14 rounded-xl`}
                disabled={isDisabled}
                onClick={handlePin}
              >
                Confirm
              </button>
            </>
          )}
          {mode === "after" && (
            <>
              <Image
                src="/success.svg"
                width={70}
                height={70}
                alt="image"
                className="mt-[121px] ml-[50px]"
              />
              <p className="mt-[50px] ml-[50px] text-2xl text-[#3A3D42] font-bold">
                Your PIN Was Successfully Created
              </p>
              <p className="leading-8 text-[#3A3D42] text-opacity-60 mt-10 ml-[50px] w-[433px]">
                Your PIN was successfully created and you can now access all the
                features in FazzPay.
              </p>
              <button
                onClick={handleAfter}
                className="bg-[#6379f4] rounded-xl w-[433px] mt-[120px] ml-[50px] text-white h-[57px]"
              >
                Go To Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </Checkpin>
  );
}

export default Pin;
