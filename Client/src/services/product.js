import axios from "axios";
import { baseUrl } from "./apiconfig";

export async function getAllProducts() {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token = userData?.token;

  const resp = await axios.get(`${baseUrl}/product/basic`, {
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

export async function getAllProductDetails() {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token = userData?.token;

  const resp = await axios.get(`${baseUrl}/product/getAll`, {
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

export async function getProductById(id) {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token = userData?.token;

  const resp = await axios.get(`${baseUrl}/product/${id}`, {
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

export async function placeOrder(product_id) {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const token = userData?.token;

  if (!userData) {
    throw new Error("User not logged in");
  }

  const { name, email, phone, address } = userData;

  const resp = await axios.post(
    `${baseUrl}/order/placeOrder`,
    {
      product_id,
      name,
      email,
      phone,
      address,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = resp.data;
  if (result.status !== "success") {
    throw new Error(result.message);
  }

  return result.data;
}
