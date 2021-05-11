import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

function onSubmit(e){
  e.preventDefault();
  const formData = new FormData();
  formData.append('productName', e.target.productName.value);
  formData.append('productPrice', e.target.productPrice.value);
  formData.append('productImage', e.target.productImage.files[0]);
  formData.append('productInformation', e.target.productInformation.value);

  fetch("https://localhost:3001/product-registration", {
    credentials: 'include',
    method: 'post',
    body: formData,
  })
  .then(res => res.json())
  .then(success => {
    if(success){
      alert("product registration success");
    }
  })
}

export default function ProductRegistration() {
  return (
    <div>
      <Header />
      <Nav />
      <div className="product-registration">
        <form onSubmit={onSubmit} method="post" className="register-form" encType='multipart/form-data'>
          <label htmlFor="name-of-product">name of product</label>
          <input id="name-of-product" name="productName" type="text" />
          <label htmlFor="product-price">price</label>
          <input id="product-price" name="productPrice" type="text" />
          <label htmlFor="product-image">main Image</label>
          <input name="productImage" id="product-image" type="file" accept="image/png, image/jpg, image/jpeg"/>
          <label htmlFor="product-information">information</label>
          <textarea id="product-information" name="productInformation"></textarea>

          <input type="submit" className="submit"/>
        </form>
      </div>
      ;
      <Footer />
    </div>
  );
}
