import React from "react";
import ReactDOM from "react-dom/client";
import QRcode from "../QR code.jsx";
import "../public/Qrcode.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>{<QRcode />}</React.StrictMode>
);
