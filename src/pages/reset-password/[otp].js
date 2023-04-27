import Aside from "../../components/aside";
import Image from "next/image";
import { useEffect, useState } from "react";
import { resetEmail } from "@/utils/axios/https";
import { useRouter } from "next/router";
import PrivateRouteLOGIN from "@/components/PrivateRouteNotLogin";

function Otp() {
  const router = useRouter();
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const keysChangePassword = router.query.otp;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const isDisabledSUP = Object.values(formData).some((value) => value === "");
  useEffect(() => {
    setIsInputFilled(Object.values(formData).some((value) => value !== ""));
  }, [formData]);

  const resetPassword = (e) => {
    if (formData.newPassword !== confirmPassword)
      return setError("Password Tidak Seragam");
    e.preventDefault();
    const { newPassword, confirmPassword } = formData;
    resetEmail(keysChangePassword, newPassword, confirmPassword)
      .then((response) => {
        setModal(true);
        setError(null);
        setTimeout(() => {
          setModal(false);
        }, 1000);
        router.push("/auth");
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PrivateRouteLOGIN>
      {modal === true ? (
        <Modal
          info="Forgot Password Berhasil"
          info2="Silahkan Login Kembali"
        ></Modal>
      ) : (
        <></>
      )}
      <form>
        <div className="flex">
          <Aside className="" />
          <div className="flex-[1] bg-white">
            <p className="text-2xl font-bold ml-[50px] pt-[121px] w-[384px] leading-8">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </p>
            <p className="text-[#3A3D42] text-opacity-60 ml-[50px] w-[433px] mt-[30px] leading-7">
              Now you can create a new password for your FazzPay account. Type
              your password twice so we can confirm your new passsword.
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
                type="password"
                placeholder="Create New Password"
                value={formData.newPassword}
                onChange={handleChange}
                name="newPassword"
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
                placeholder="Create New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
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
              onClick={resetPassword}
              type="submit"
              className={`w-[433px] ml-[50px] mt-24 ${
                isDisabledSUP
                  ? "bg-[#DADADA] cursor-not-allowed"
                  : "bg-blue-500"
              } h-14 rounded-xl`}
              disabled={isDisabledSUP}
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </PrivateRouteLOGIN>
  );
}

export default Otp;
