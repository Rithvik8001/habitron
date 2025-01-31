import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { Features } from "./components/landing/features";
import { Testimonials } from "./components/landing/testimonials";
import { Pricing } from "./components/landing/pricing";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
      </main>
    </div>
  );
}
