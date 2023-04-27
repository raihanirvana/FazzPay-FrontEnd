import AsideLogin from "@/components/LoginAside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { getUser } from "@/utils/axios/https";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PrivateRouteNotLogin from "@/components/PrivateRouteLogin";
import Title from "@/utils/wrapper/title";
function Transfer() {
  const router = useRouter();
  const token = useSelector((state) => state.user.data?.data?.token);
  const [formData, setFormData] = useState({
    page: 1,
    search: "",
    limit: 4,
    sort: "",
    data: [],
  });
  useEffect(() => {
    const queryPage = parseInt(router.query.page);
    const queryLimit = parseInt(router.query.limit);
    const querySort = router.query.sort;

    // Mengubah state formData menggunakan query string yang ditemukan
    setFormData({
      ...formData,
      page: isNaN(queryPage) ? formData.page : queryPage,
      limit: isNaN(queryLimit) ? formData.limit : queryLimit,
      sort: querySort || formData.sort,
    });
  }, [router.query]);

  useEffect(() => {
    const { sort, page, limit, search } = formData;
    getUser(token, page, limit, search, sort)
      .then((response) => {
        setFormData({
          ...formData,
          data: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    router.push(`/transfer?page=${page}&limit=${limit}&filter=${search}`);
  }, [formData.search, formData.page, formData.limit, formData.sort]);
  const handleChangePage = (event) => {
    const newPage = parseInt(event.target.value);
    // Mengubah query string pada URL
    router.push(`/transfer?page=${newPage}`);
    setFormData({ ...formData, page: newPage });
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
  const handleSearch = (e) => {
    const newSearch = e.target.value;
    // Mengubah query string pada URL
    router.push(`/transfer?search=${newSearch}`);
    setFormData((prevData) => ({
      ...prevData,
      search: newSearch,
    }));
  };

  return (
    <PrivateRouteNotLogin>
      <Title title="Transfer Page">
        <Header />
        <div className="flex">
          <AsideLogin />
          <div className="w-[850px] ml-[17px] mt-10 rounded-[25px] bg-white">
            <div className="flex">
              <p className="font-bold text-lg ml-[30px] mt-[30px] text-[#3A3D42]">
                Search Receiver
              </p>
              <div className="ml-[150px] flex mt-[30px]">
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
            </div>
            <div className="flex ml-[30px] mt-6  w-[790px] h-[54px] rounded-[12px]">
              <Image
                src="/search.svg"
                width={24}
                height={24}
                alt="search"
                className=" bg-[#3A3D421A]/10 w-[100px] p-3"
              />
              <input
                onChange={handleSearch}
                value={formData.search}
                type="text"
                placeholder="Search receiver here"
                className="bg-[#3A3D421A]/10 p-2 w-[790px] outline-none"
              />
            </div>
            {formData.data.map((data) => (
              <div
                onClick={() => router.push(`/transfer/${data.id}`)}
                className="items-center flex ml-[30px] mt-5 w-[790px] h-[110px] drop-shadow-md bg-white rounded-[10px] cursor-pointer"
                key={data.id}
              >
                {data.image === null ? (
                  <Image
                    src="/person.svg"
                    width={70}
                    height={70}
                    alt="test"
                    className="ml-5 object-cover w-[70px] h-[70px]"
                  />
                ) : (
                  <Image
                    src={
                      "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
                      data.image
                    }
                    width={70}
                    height={70}
                    alt="test"
                    className="ml-5 object-cover w-[70px] h-[70px]"
                  />
                )}
                <div className="ml-5">
                  <p className="text-lg font-bold">
                    {data.firstName} {data.lastName}
                  </p>
                  <p className="text-xs text-[#3a3d42] text-opacity-90">
                    {data.noTelp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </Title>
    </PrivateRouteNotLogin>
  );
}

export default Transfer;
