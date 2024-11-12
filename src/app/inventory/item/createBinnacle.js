export default async function createBinnacle(numSerial) {
  const now = new Date();
  function formatDateForSQL(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const formattedDate = formatDateForSQL(now);
  //console.log(formattedDate);

  const binnacleData = {
    numserial: numSerial,
    DateOfEntry: formattedDate,
  };

  console.log(binnacleData);
  
  try {
    const response = await fetch(
      "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/binnacle",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(binnacleData),
      }
    );

    if (response.ok) {
      const result = await response.json();
      //console.log("Binnacle created successfully:", result);
    } else {
      const errorResult = await response.json();
      console.error("Error creating binnacle:", errorResult.message);
    }
  } catch (error) {
    console.error("Error creating binnacle:", error);
  }
}
