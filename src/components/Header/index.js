import { setBalance } from "@/redux/slices/transfer";
import { getData, getHistoryTransaction } from "@/utils/axios/https";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/loading";

function Header() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(false);
  const token = useSelector((state) => state.user.data?.data?.token);
  const id = useSelector((state) => state.user.data?.data?.id);
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    noTelp: "",
    page: 1,
    filter: "WEEK",
    limit: 5,
    data: [],
  });
  const handleNotif = () => {
    if (notif) {
      return setNotif(false);
    }
    setNotif(true);
  };
  useEffect(() => {
    const { filter, page, limit } = formData;
    Promise.all([
      getData(id, token),
      getHistoryTransaction(token, page, limit, filter),
    ])
      .then((response) => {
        setLoading(false);
        const [userData, historyData] = response;
        setFormData({
          image: userData.data.data.image,
          firstName: userData.data.data.firstName,
          lastName: userData.data.data.lastName,
          noTelp: userData.data.data.noTelp,
          data: historyData.data.data,
        });
        dispatch(setBalance(userData.data.data.balance));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loading) return <Loading></Loading>;
  return (
    <>
      <div className="flex items-center h-[140px] bg-white drop-shadow-drop">
        <p className="text-blue-500 text-3xl ml-[150px]">FazzPay</p>
        <div className="flex ml-[797px]">
          {formData.image === null ? (
            <Image src="/person.svg" width={52} height={52} alt="face" />
          ) : (
            <Image
              src={
                "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                formData.image
              }
              width={52}
              height={52}
              alt="face"
              className="w-[52px] h-[52px] object-cover"
            />
          )}
          <div className="ml-5">
            <p className="text-lg font-bold">
              {formData.firstName + " " + formData.lastName}
            </p>
            {formData.noTelp === null ? (
              <></>
            ) : (
              <p className="text-xs text-[#3a3d42] text-opacity-90">
                {formData.noTelp
                  .replace(/^0/, "+62 ")
                  .replace(/(\d{3})(\d{4})(\d{3})/, "$1-$2-$3")}
              </p>
            )}
          </div>
          <Image
            onClick={handleNotif}
            src="/bell.svg"
            width={24}
            height={24}
            alt="bell"
            className="ml-[33px] cursor-pointer"
          />
        </div>
      </div>
      <div
        className={`h-[612px] w-[403px] bg-white rounded-[20px] mt-[10px] drop-shadow-2xl absolute z-50 ${
          notif ? "right-[228px]" : "hidden"
        } `}
      >
        {formData.data.map((data) => (
          <div className="pt-[23px] " key={data.id}>
            <div className="w-[343px] h-[92px] bg-white drop-shadow-2xl rounded-[10px] m-auto">
              <div className="flex">
                {data.type === "send" ? (
                  <Image
                    src="/arrow-merah.svg"
                    width={28}
                    height={28}
                    alt="arrow"
                    className="mt-5 ml-5"
                  />
                ) : (
                  <Image
                    src="/arrow-hijau.svg"
                    width={28}
                    height={28}
                    alt="arrow"
                    className="mt-5 ml-5"
                  />
                )}
                <div>
                  {data.type === "send" ? (
                    <p className="ml-4 mt-5 text-[#7A7A7A] text-sm">
                      Transfer to {data.firstName} {data.lastName}
                    </p>
                  ) : data.type === "topup" ? (
                    <p className="ml-4 mt-5 text-[#7A7A7A] text-sm">Top Up</p>
                  ) : (
                    <p className="ml-4 mt-5 text-[#7A7A7A] text-sm">
                      Accept from {data.firstName} {data.lastName}
                    </p>
                  )}

                  <p className="ml-4 mt-2 font-bold text-[#43484F] text-lg">
                    {`${data.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Header;
