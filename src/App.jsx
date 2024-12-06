import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QRCodeCanvas } from "qrcode.react";
import { IoIosCloudDownload } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import logo from "./assets/logo.svg";
import background from "./assets/background.svg";
import "./App.css";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

function App() {
   const [pageStatus, setPageStatus] = useState("notLoading");
   const [status, setStatus] = useState("notGen");
   const [inpVal, setInpVal] = useState();
   const [link, setLink] = useState();
   const [comp, setComp] = useState();

   const downloadQRCode = () => {
      try {
         const canvas = document.getElementById("qrCodeEl");
         if (!canvas) {
            console.error("QR Code canvas element not found");
            return;
         }

         const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

         const downloadLink = document.createElement("a");
         downloadLink.href = pngUrl;
         downloadLink.download = `qrcode-${new Date().getTime()}.png`;
         
         document.body.appendChild(downloadLink);
         downloadLink.click();
         document.body.removeChild(downloadLink);
      } catch (error) {
         console.error("Error downloading QR code:", error);
      }
   };

   const shareViaGmail = () => {
      try {
         const canvas = document.getElementById("qrCodeEl");
         const subject = encodeURIComponent("Check out this QR Code!");
         const body = encodeURIComponent(`Here's your QR Code link: ${link}\n\nGenerated using QR Code Generator`);
         
         // Gmail sharing URL
         const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;
         
         // Open Gmail in a new window
         window.open(gmailUrl, '_blank');
      } catch (error) {
         console.error("Error sharing via Gmail:", error);
         alert("There was an error sharing via Gmail. Please try again.");
      }
   };

   if (pageStatus == "Loading") {
      return (
         <div className="App">
            <div className="loader"></div>
            <h1>Hold on please</h1>
         </div>
      );
   } else if (status == "notGen") {
      return (
         <div className="App">
            <div>
               <img src={logo} alt="" />
            </div>
            <div className="InpDiv">
               <input
                  value={inpVal}
                  id="Inp"
                  type="text"
                  onChange={(e) => {
                     setInpVal(e.target.value);
                  }}
                  placeholder="Enter an url"
               ></input>
               <button
                  onClick={() => {
                     setStatus("Gen");
                     setLink(inpVal);
                     setInpVal("");
                     setPageStatus("Loading");
                     setTimeout(() => {
                        setPageStatus("notLoading");
                     }, 2000);
                  }}
               >
                  QR code
               </button>
            </div>
         </div>
      );
   } else if (status == "Gen") {
      return (
         <div className="App">
            <div>
               <img src={logo} alt="" />
            </div>
            <div className="InpDiv">
               <div
                  style={{
                     backgroundColor: "#1E2C51",
                     height: "210px",
                     width: "210px",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     borderRadius: "1111px",
                  }}
               >
                  <div
                     id="qrCodeShow"
                     style={{ padding: "20px", backgroundColor: "white", borderRadius: "15px" }}
                  >
                     <QRCodeCanvas id="qrCodeEl" value={link} size={128} />
                  </div>
               </div>
            </div>
            <div
               style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  justifyContent: "center"
               }}
            >
               <button
                  onClick={downloadQRCode}
                  style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "5px",
                     padding: "8px 16px",
                     borderRadius: "8px",
                     border: "none",
                     backgroundColor: "#1E2C51",
                     color: "white",
                     cursor: "pointer"
                  }}
               >
                  <IoIosCloudDownload size={20} /> Download
               </button>
               <button
                  onClick={shareViaGmail}
                  style={{
                     display: "flex",
                     alignItems: "center",
                     gap: "5px",
                     padding: "8px 16px",
                     borderRadius: "8px",
                     border: "none",
                     backgroundColor: "#DB4437",
                     color: "white",
                     cursor: "pointer"
                  }}
               >
                  <SiGmail size={20} /> Share via Gmail
               </button>
            </div>
            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "25px",
               }}
            >
               <button
                  style={{
                     backgroundColor: "#3762E4",
                     color: "white",
                     width: "240px",
                     height: "50px",
                     padding: "0 60px",
                     borderRadius: "21px",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     gap: "5px",
                  }}
                  onClick={() => {
                     
                     
                        location.reload();
                    
                  }}
               >
                  Generate More
                  <TbSquareRoundedPlusFilled
                     style={{ width: "22px", height: "22px", color: "#7291EA" }}
                  />
               </button>
            </div>
         </div>
      );
   }
}

export default App;
