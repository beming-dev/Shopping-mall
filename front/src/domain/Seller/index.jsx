import { useEffect } from "react";
import "./style.css";

import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import Nav from "../../components/Nav/index";

export default function Seller() {
  useEffect(() => {
    fetch("https://localhost:3001/api/isLogined", {
      credentials: "include",
      method: "post",
    })
      .then((res) => res.json())
      .then((login) => {
        if (!login) {
          window.location.href = "/home";
        }
      });
  }, []);
  return (
    <div className="seller">
      <Header />
      <Nav />
      <div className="seller-body">
        <form action="https://localhost:3001/seller-registration" method="post">
          <button>seller register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
