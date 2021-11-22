import React from "react";
import { Toaster, toast } from "react-hot-toast";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export default function Error({ message, hideError }) {
  if (!message) {
    return null;
  }
  return (
    <>
      toast({message})
      <Toaster />
    </>
  );
}
