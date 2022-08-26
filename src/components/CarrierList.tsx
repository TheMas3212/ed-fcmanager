import { Typography } from "@mui/material";
import { useCarrierStore } from "../contexts/CarrierStore";
import CarrierInfo from "./CarrierInfo";

function CarrierList() {
  const [carriers, dispatchCarriers] = useCarrierStore();
  const cards = Object.keys(carriers).map((id) => {
    return (<CarrierInfo carrierID={id} key={id}/>);
  });

  return (
    <>
      {cards}
    </>
  );
}

export default CarrierList;