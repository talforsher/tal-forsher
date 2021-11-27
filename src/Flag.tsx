import { useLocation } from "react-router";

const Flag = () => {
  const {
    state: {
      country: { name, flag },
    },
  } = useLocation();
  localStorage.setItem(name, JSON.stringify({ name, flag }));
  return <img src={flag} alt="flag" />;
};

export default Flag;
