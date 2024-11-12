export async function getItems() {
  try {
    const response = await fetch(
      "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/items"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getClient() {
  try {
    const response = await fetch(
      "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/clients"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.clients;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getBinnacle() {
  try {
    const response = await fetch(
      "https://uildbknzgh.execute-api.us-east-2.amazonaws.com/dev/binnacle"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.binnacle;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
