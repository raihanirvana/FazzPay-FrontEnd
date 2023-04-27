import AsideLogin from "@/components/LoginAside";
import { getData, getHistoryTransaction, topUp } from "@/utils/axios/https";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";
import SimpleBarChart from "@/components/Testing";
import { useRouter } from "next/router";
function Dashboard() {
  const router = useRouter();
  const [mode, setMode] = useState("home");
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState("");
  const token = useSelector((state) => state.user.data?.data?.token);
  const id = useSelector((state) => state.user.data?.data?.id);
  const [formData, setFormData] = useState({
    balance: "",
    noTelp: "",
    page: 1,
    filter: "",
    limit: 50,
    data: [],
    totalPage: 0,
  });
  const handleCancle = (e) => {
    e.preventDefault();
    setModal(false);
    setAmount("");
  };
  const isDisableddd = !amount;
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handletopup = async (e) => {
    e.preventDefault();
    try {
      const response = await topUp(token, amount);
      setModal(false);
      setAmount("");
      const redirectUrl = response.data.data.redirectUrl;
      window.open(redirectUrl, "_blank");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangePage = (event) => {
    setFormData({ ...formData, page: parseInt(event.target.value) });
  };
  const handlePrevPage = () => {
    setFormData((prevData) => ({
      ...prevData,
      page: Math.max(prevData.page - 1, 1),
    }));
  };

  const handleNextPage = () => {
    setFormData((prevData) => ({
      ...prevData,
      page: prevData.page + 1,
    }));
  };
  const handleHistory = () => {
    setMode("history");
    setFormData({ ...formData, limit: 6 });
  };
  useEffect(() => {
    const { filter, page, limit } = formData;

    Promise.all([
      getData(id, token),
      getHistoryTransaction(token, page, limit, filter),
    ])
      .then((response) => {
        const [userData, historyData] = response;
        const totalPage = Math.ceil(historyData.data.data.length / 6);

        setFormData((prevState) => ({
          ...prevState,
          totalPage,
          balance: userData.data.data.balance,
          noTelp: userData.data.data.noTelp,
          data: historyData.data.data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    router.push(`/dashboard?page=${page}&limit=${limit}&filter=${filter}`);
  }, [formData.filter, formData.page, formData.limit]);

  const handleTopUp = (e) => {
    e.preventDefault();
    setModal(true);
  };
  const handleFilterChange = (event) => {
    setFormData({ ...formData, filter: event.target.value });
  };

  return (
    <PrivateRouteNotLogin>
      {modal === true && (
        <>
          <div className="fixed inset-0 z-[1] bg-black/80 flex justify-center items-center select-none"></div>
          <div className="rounded-[25px] fixed top-0 left-0 right-0 bottom-0 m-auto bg-white drop-shadow-drop w-[503px] h-[417px] z-50">
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
                className="border border-solid border-[#A9A9A9]/60 w-[437px] mt-[43px] h-[65px]"
              />
            </div>
            <button
              onClick={handletopup}
              type="submit"
              disabled={isDisableddd}
              className={`w-[170px] h-[57px] rounded-[12px] mt-[77px] ml-[298px] ${
                isDisableddd ? "bg-[#DADADA] cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              Submit
            </button>
          </div>
        </>
      )}
      <Header />
      <div className="flex">
        <AsideLogin />
        {mode === "home" && (
          <>
            {" "}
            <div className="grid grid-cols-2 grid-rows-7 gap-4 ml-5">
              <div className="bg-blue-500 mt-10 rounded-[20px] w-[850px] flex col-span-2 row-span-1  h-[190px]">
                <div className="ml-[30px] mt-[30px]">
                  <p className="text-[#e0e0e0] text-lg">Balance</p>
                  <p className="text-[40px] text-white mt-[10px] w-[206px]">
                    {`${formData.balance.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}
                  </p>
                  {formData.noTelp === null ? (
                    <></>
                  ) : (
                    <p className="text-[#e0e0e0] text-lg mt-[15px]">
                      {formData.noTelp
                        .replace(/^0/, "+62 ")
                        .replace(/(\d{3})(\d{4})(\d{3})/, "$1-$2-$3")}
                    </p>
                  )}
                </div>
                <div className="ml-[422px]">
                  <div
                    onClick={() => {
                      router.push("/transfer");
                    }}
                    className="cursor-pointer flex mt-[30px] rounded-xl border border-solid border-white bg-white bg-opacity-20 pr-5 pt-3 pb-3"
                  >
                    <Image
                      src="/arrow-up.svg"
                      width={28}
                      height={28}
                      alt="image"
                      className="ml-[30px]"
                    />
                    <p className="text-lg font-bold text-[#3A3D42] text-opacity-80 ml-[23px]">
                      Transfer
                    </p>
                  </div>
                  <div
                    onClick={handleTopUp}
                    className="cursor-pointer flex mt-4 border border-solid border-white bg-white bg-opacity-20 pr-5 pt-3 pb-3 rounded-xl"
                  >
                    <Image
                      src="/plus.svg"
                      width={28}
                      height={28}
                      alt="image"
                      className="ml-[30px]"
                    />
                    <p className="text-lg font-bold text-[#3A3D42] text-opacity-80 ml-[23px]">
                      Top Up
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white w-[463px] h-[468px] rounded-[25px]">
                <div className="mt-[220px] flex justify-center">
                  <SimpleBarChart className="mt-10"></SimpleBarChart>
                </div>
              </div>
              <div className="bg-white w-[367px] h-[468px] rounded-[25px] overflow-hidden">
                <div className="flex">
                  <p className="font-bold text-lg mt-[30px] ml-[30px]">
                    Transaction History
                  </p>
                  <p
                    onClick={handleHistory}
                    className="text-blue-400 ml-[103px] mt-[30px] text-sm font-semibold cursor-pointer"
                  >
                    See all
                  </p>
                </div>
                {formData.data.slice(0, 4).map((data) => (
                  <div className="flex mt-8 overflow-hidden" key={data.id}>
                    {data.image === null ? (
                      <Image
                        src="/person.svg"
                        width={56}
                        height={56}
                        alt="test"
                        className="ml-[30px] object-cover w-[56px] h-[56px]"
                      />
                    ) : (
                      <Image
                        src={
                          "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                          data.image
                        }
                        width={56}
                        height={56}
                        alt="test"
                        className="ml-[30px] object-cover w-[56px] h-[56px]"
                      />
                    )}
                    <div className="ml-[15px]">
                      <p className="w-[110px] overflow-hidden font-bold">
                        {data.firstName + " " + data.lastName}
                      </p>
                      {data.type === "send" ? (
                        <p className="mt-2 text-[#7A7A7A] text-sm">Transfer</p>
                      ) : data.type === "topup" ? (
                        <p className="mt-2 text-[#7A7A7A] text-sm">Top Up</p>
                      ) : (
                        <p className="mt-2 text-[#7A7A7A] text-sm">Accept</p>
                      )}
                    </div>
                    {data.type === "send" ? (
                      <p className="ml-[25px] text-red-500 font-bold text-right w-[120px]">
                        -
                        {`${data.amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}
                      </p>
                    ) : (
                      <p className="ml-[25px] text-green-400 font-bold text-right w-[120px]">
                        +
                        {`${data.amount.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}`.replace(/(\.|,)0+$|(\.|,)[0-9]+0+$/, "$2")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {mode === "history" && (
          <>
            <div className="w-[850px] ml-[17px] mt-10 rounded-[25px] bg-white">
              <div className="flex  mt-[33px]">
                <p className="font-bold text-lg ml-[30px] w-[172px]">
                  Transaction History
                </p>
                <div className="ml-[150px] flex">
                  <button
                    className="bg-white drop-shadow-drop pl-1 pr-1 rounded-md text-xs w-[70px]"
                    disabled={formData.page === 1}
                    onClick={handlePrevPage}
                  >
                    Prev
                  </button>
                  <p
                    value={formData.page}
                    onChange={handleChangePage}
                    className="ml-2 w-5 mt-2 text-xl"
                  >
                    {formData.page}
                  </p>

                  <button
                    className="bg-white drop-shadow-drop pl-1 pr-1 rounded-md text-xs w-[70px]"
                    disabled={formData.data.length < formData.limit}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
                <div className="ml-[100px]">
                  <select
                    className="py-2 px-4 bg-[#3A3D421A]/10 ml-12 border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleFilterChange}
                  >
                    <option disabled selected>
                      --select filter--
                    </option>
                    <option value="WEEK">WEEK</option>
                    <option value="MONTH">MONTH</option>
                    <option value="YEAR">YEAR</option>
                  </select>
                </div>
              </div>
              {formData.data.map((data) => (
                <div className="flex mt-10" key={data.id}>
                  {data.image === null ? (
                    <Image
                      src="/person.svg"
                      width={56}
                      height={56}
                      alt="test"
                      className="ml-[30px] object-cover w-[56px] h-[56px]"
                    />
                  ) : (
                    <Image
                      src={
                        "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                        data.image
                      }
                      width={56}
                      height={56}
                      alt="test"
                      className="ml-[30px] object-cover w-[56px] h-[56px]"
                    />
                  )}
                  <div className="ml-[15px]">
                    <p className="w-[150px] overflow-hidden font-bold">
                      {data.firstName + " " + data.lastName}
                    </p>
                    {data.type === "send" ? (
                      <p className="mt-[10px] text-[#7A7A7A] text-sm">
                        Transfer
                      </p>
                    ) : data.type === "topup" ? (
                      <p className="mt-[10px] text-[#7A7A7A] text-sm">Top Up</p>
                    ) : (
                      <p className="mt-[10px] text-[#7A7A7A] text-sm">
                        Accept from {data.firstName} {data.lastName}
                      </p>
                    )}
                  </div>
                  {data.type === "send" ? (
                    <p className="ml-[480px] text-red-500 font-bold">
                      -Rp{data.amount}
                    </p>
                  ) : (
                    <p className="ml-[480px] text-green-400 font-bold">
                      +Rp{data.amount}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </PrivateRouteNotLogin>
  );
}

export default Dashboard;
