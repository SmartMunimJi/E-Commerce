import axios from "axios";
import { baseUrl } from "./apiconfig";

export async function placeOrder(product_id, name, email, phone, address) {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token = userData?.token;

  const url = `${baseUrl}/order/placeOrder`;
  const body = { product_id, name, email, phone, address };

  const resp = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const result = resp.data;
  if (result.status !== "success") {
    throw new Error(result.message);
  }

  return result.data;
}
