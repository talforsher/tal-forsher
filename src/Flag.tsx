import { useLocation } from "react-router";

const Flag = () => {
  const {
    state: { country },
  }: any = useLocation();

  localStorage.setItem(
    country.name,
    JSON.stringify({ name: country.name, flag: country.flag }),
  );
  return <img src={country.flag} alt='flag' />;
};

export default Flag;
