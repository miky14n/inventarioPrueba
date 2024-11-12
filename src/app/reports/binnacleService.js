export async function fetchReports() {
    try {
      const response = await fetch("https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/binnacle");
      if (!response.ok) {
        throw new Error("Error fetching reports");
      }
      const data = await response.json();
      return data.binnacle; 
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  
  export async function createBinnacle(numSerial, setReports) {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
  
    const binnacleData = {
      numserial: numSerial,
      dateofentry: formattedDate,
    };
  
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
        const updatedReports = await fetchReports();
        setReports(updatedReports); 
      } else {
        const errorResult = await response.json();
        console.error("Error creating binnacle:", errorResult.message);
      }
    } catch (error) {
      console.error("Error creating binnacle:", error);
    }
  }
  