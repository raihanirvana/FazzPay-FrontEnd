import AsideLogin from "@/components/LoginAside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { getData } from "@/utils/axios/https";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  setAmount,
  setNote,
  setIds,
  setImage,
  setFirstName,
  setLastName,
  setNoTelp,
} from "@/redux/slices/transfer";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";
import Loading from "@/components/loading";
import Title from "@/utils/wrapper/title";
function UserDetail() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [much, setMuch] = useState("");
  const [notes, setNotes] = useState("");
  const balance = useSelector((state) => state.transferDetail.balance);
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    noTelp: "",
  });
  const handleAmout = (e) => {
    parseInt(setMuch(e.target.value));
  };
  const handleNote = (e) => {
    setNotes(e.target.value);
  };
  const token = useSelector((state) => state.user.data?.data?.token);
  useEffect(() => {
    if (router.query.dataId) {
      setId(router.query.dataId);
    }
  }, [router.query.dataId]);

  const handleSubmit = () => {
    if (much > balance) {
      return setError("Saldo Anda Kurang!!!");
    }
    if (much <= 1000) {
      return setError("Minimal Transfer Adalah 1001");
    }
    parseInt(dispatch(setAmount(much)));
    dispatch(setNote(notes));
    dispatch(setIds(id));
    dispatch(setImage(formData.image));
    dispatch(setFirstName(formData.firstName));
    dispatch(setLastName(formData.lastName));
    dispatch(setNoTelp(formData.noTelp));
    router.push("/transfer/confirm");
  };

  useEffect(() => {
    if (id) {
      setLoading(true); // set loading to true before making the API call
      getData(id, token)
        .then((response) => {
          setFormData({
            image: response.data.data.image,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            noTelp: response.data.data.noTelp,
          });
          setLoading(false); // set loading to false when data is fetched
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // set loading to false when an error occurs
        });
    }
  }, [id, token]);

  if (loading) return <Loading></Loading>;
  return (
    <PrivateRouteNotLogin>
      <Title title="Transfer Page">
        <Header />
        <div className="flex">
          <AsideLogin />
          <div className="w-[850px] ml-[17px] mt-10 rounded-[25px] bg-white">
            <p className="font-bold text-lg ml-[30px] mt-[30px] text-[#3A3D42]">
              Transfer Money
            </p>
            <div className="items-center flex ml-[30px] mt-5 w-[790px] h-[110px] drop-shadow-md bg-white rounded-[10px]">
              <Image
                src={
                  formData.image === null
                    ? "/person.svg"
                    : "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                      formData.image
                }
                width={70}
                height={70}
                alt="test"
                className="ml-5 object-cover w-[70px] h-[70px]"
              />
              <div className="ml-5">
                <p className="text-lg font-bold">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-xs text-[#3a3d42] text-opacity-90">
                  {formData.noTelp}
                </p>
              </div>
            </div>
            <p className="text-[#7a7886] w-[336px] mt-10 ml-[30px]">
              Type the amount you want to transfer and then press continue to
              the next steps.
            </p>
            <input
              value={much}
              onChange={handleAmout}
              className="outline-none text-[42px] m-auto mt-10 flex h-14 w-[400px] bg-white text-center"
              type="number"
              placeholder="0.00"
            />
            <p className="text-[#3A3D42] mt-10 font-bold text-center">
              {`${balance.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}{" "}
              Available
            </p>
            <input
              value={notes}
              onChange={handleNote}
              className="border-b border-solid border-[#A9A9A999] outline-none text-lg m-auto mt-10 flex h-14 w-[343px] bg-white text-center"
              type="text"
              placeholder="add some notes"
            />
            {error ? (
              <p className="w-[433px] m-auto mt-5 text-base text-center text-red-500">
                {error}
              </p>
            ) : (
              <></>
            )}
            <button
              onClick={handleSubmit}
              className="w-[170px] h-[57px] ml-[650px] mt-8 text-lg text-white bg-blue-500 rounded-[12px]"
            >
              Continue
            </button>
          </div>
        </div>
        <Footer />
      </Title>
    </PrivateRouteNotLogin>
  );
}

export default UserDetail;
