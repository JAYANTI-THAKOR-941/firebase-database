import React, { useState } from "react";
import {
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const ProductManagement = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        id: Date.now(),
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({
        name: "",
        price: "",
        image: "",
      });
      alert("Product added successfully.!");
    } catch (err) {
      console.log("Failed to add product.!", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image"
        />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default ProductManagement;
