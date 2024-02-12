import React, { useState } from "react";

const QRcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrData] = useState("https://tutorjoes.in/");
  const [Qrsize, setQrSize] = useState("300");
  async function generatQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${Qrsize}x${Qrsize}&data=${encodeURIComponent(
        qrdata
      )}`;
      setImg(url);
    } catch (error) {
      console.log("Error generating QR code", error);
    } finally {
      setLoading(false);
    }
  }
  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log("Error downloading QR code", error);
      });
  }

  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
      {img && <img src={img} alt="images" className="qr-code-image" />}
      {loading && <p>Please wait...</p>}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
        </label>
        <input
          type="text"
          id="dataInput"
          value={qrdata}
          onChange={(e) => setQrData(e.target.value)}
          placeholder="Enter data for QR code"
        />
        <label htmlFor="sizeInput" className="input-label">
          Image size (e.g., 150):
        </label>
        <input
          type="text"
          id="sizeInput"
          value={Qrsize}
          onChange={(e) => setQrSize(e.target.value)}
          placeholder="Enter image size"
        />
        <button
          className="generate-button"
          disabled={loading}
          onClick={() => generatQR()}
        >
          Generate QR Code
        </button>
        <button className="download-button" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
      <p></p>
    </div>
  );
};

export default QRcode;
