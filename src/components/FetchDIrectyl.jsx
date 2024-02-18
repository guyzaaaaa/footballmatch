import React, { useState } from "react";

const FetchDIrectyl = () => {
  const [directData, setDirectData] = useState(null);
  console.log(directData);
  const handlegetMatches = async () => {
    const URL =
      "https://netsport.eurosport.io/?variables=%7B%22filters%22%3A%5B%7B%22type%22%3A%22CALENDAR%22%2C%22id%22%3A%222023-11-28%22%7D%5D%2C%22first%22%3A20%2C%22after%22%3Anull%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2242be30abd5bfa3c58687850e04466e45678a371ac1b0e03844778039a72a417e%22%7D%7D";
    try {
      const resp = await fetch(URL, {
        method: "GET",
        headers: {
          "Apollographql-Client-Name": "web",
          "Apollographql-Client-Version": "0.271.0-csr-1012951",
          "Content-Type": "application/json",
          Domain: "www.eurosport.com",
          "Premium-Country-Code": "MA",
          Referer: "https://www.eurosport.com/score-center.shtml",
          "Sec-Ch-Ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"Windows"',
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          "X-Timezone": "Africa/Casablanca",
        },
      });
      if (resp) {
        const data = await resp.json();
        setDirectData(data);
        return;
      }
      console.log({ error: "Sorry this dosent work anymore" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div onClick={handlegetMatches} className="smallDot">
      .
    </div>
  );
};

export default FetchDIrectyl;
