import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Bu alan zorunludur"),
  unitPrice: Yup.number()
    .required("Bu alan zorunludur")
    .min(0, "0 dan küçük olamaz"),
  stock: Yup.number()
    .required("Bu alan zorunludur")
    .min(0, "0 dan küçük olamaz"),
  quantityPerUnit: Yup.string().required("Bu alan zorunludur"),
});

const Validation = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://northwind.vercel.app/api/products",
        values
      );
      console.log("Başarılı:", response.data);
      resetForm();
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        unitPrice: "",
        stock: "",
        quantityPerUnit: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="name">Ürün Adı</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="unitPrice">Birim Fiyatı</label>
            <Field type="number" id="unitPrice" name="unitPrice" />
            <ErrorMessage name="unitPrice" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="stock">Stok Miktarı</label>
            <Field type="number" id="stock" name="stock" />
            <ErrorMessage name="stock" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="quantityPerUnit">Birim Başına Miktar</label>
            <Field type="text" id="quantityPerUnit" name="quantityPerUnit" />
            <ErrorMessage
              name="quantityPerUnit"
              component="div"
              className="error"
            />
          </div>

          <button type="submit">Ekle</button>
        </Form>
      )}
    </Formik>
  );
};

export default Validation;
