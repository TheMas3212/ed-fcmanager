import { Typography } from "@mui/material";
import { useCarrierStore } from "../contexts/CarrierStore";
import CarrierInfoBrief from "./CarrierInfoBrief";

function CarrierList(props: { brief: boolean }) {
  const [carriers, dispatchCarriers] = useCarrierStore();
  const cards = Object.keys(carriers).map((id) => {
    return (<CarrierInfoBrief carrierID={id} key={id}/>);
  });

  return (
    <>
      {cards}
    </>
  );
}

export default CarrierList;