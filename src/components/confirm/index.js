import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Confrim = ({ children }) => {
  const userData = useSelector((state) => state.transferDetail.amount);
  const router = useRouter();

  if (userData === "") {
    // Redirect ke halaman dashboard jika user sudah login
    router.push("/dashboard");
    return null;
  }

  return children;
};

export default Confrim;
