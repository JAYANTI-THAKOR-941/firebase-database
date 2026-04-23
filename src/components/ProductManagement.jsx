import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const ProductManagement = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getProducts = async () => {
    await onSnapshot(collection(db, "products"), (snapshot) => {
      const productList = snapshot.docs.map((p) => ({
        docId: p.id,
        ...p.data(),
      }));
      setProducts(productList);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const docRef = doc(db,"products",`${editId}`);
      await updateDoc(docRef,{
        ...form
      })
      alert("Product Update successfully.!");
      setEditId(null);
    } else {
      try {
        await addDoc(collection(db, "products"), {
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
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      image: p.image,
    });
    setEditId(p.docId);
  };


  const handleDelete = async(docId)=>{
    const docRef = doc(db,"products",`${docId}`);
      await deleteDoc(docRef)
      alert('Product Deleted successfully.!')
  }

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
        {products.length === 0 ? (
          <h2>No Products Found.!</h2>
        ) : (
          products.map((p) => (
            <tr key={p.docId}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <img src={p.image} alt="" />
              </td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={()=>handleDelete(p.docId)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </table>

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
