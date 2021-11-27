import { useLocation } from "react-router";

const Flag = () => {
  const location = useLocation();

  return <img src={location.state.image} alt="flag" />;
};

export default Flag;
