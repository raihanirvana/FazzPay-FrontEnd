import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const PrivateRouteNotLogin = ({ children }) => {
  const userData = useSelector((state) => state.user.data?.data?.token);
  const router = useRouter();

  if (!userData) {
    // Redirect ke halaman login jika user belum login
    router.push("/auth");
    return null;
  }

  return children;
};

export default PrivateRouteNotLogin;
