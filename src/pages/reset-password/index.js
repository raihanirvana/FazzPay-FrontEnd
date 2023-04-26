import Aside from "../../components/aside";
import Image from "next/image";
import { useState, useEffect } from "react";
import { checkEmail } from "@/utils/axios/https";
import PrivateRouteLOGIN from "@/components/PrivateRouteNotLogin";

function Checkemail() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setIsInputFilled(email !== "");
  }, [email]);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const linkDirect = "http://localhost:3000/reset-password/";
  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    checkEmail(email, linkDirect)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const isDisabled = !email;
  return (
    <PrivateRouteLOGIN>
      <form>
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
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                name="email"
              ></input>
            </div>
            <button
              onClick={handleCheck}
              type="submit"
              className={`w-[433px] ml-[50px] mt-24 ${
                isDisabled ? "bg-[#DADADA] cursor-not-allowed" : "bg-blue-500"
              } h-14 rounded-xl`}
              disabled={isDisabled}
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </PrivateRouteLOGIN>
  );
}

export default Checkemail;
