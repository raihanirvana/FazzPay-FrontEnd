import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Checkpin({ children }) {
  const pin = useSelector((state) => state.user.data?.data?.pin);
  const router = useRouter();

  if (pin) {
    router.push("/dashboard");
    return null;
  }

  return <>{children}</>;
}

export default Checkpin;
