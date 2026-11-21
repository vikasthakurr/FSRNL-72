import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Kitchens from "./components/Kitchens";
import Menu from "./components/Menu";
import Testimonials from "./components/Testimonials";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [kitchen, setKitchen] = useState("All");

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <HowItWorks />
        <Kitchens selected={kitchen} onSelect={setKitchen} />
        <Menu kitchen={kitchen} onClearKitchen={() => setKitchen("All")} />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
