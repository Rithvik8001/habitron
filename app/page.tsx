import { Header } from "./components/landing/header";
import { Hero } from "./components/landing/hero";
import { Features } from "./components/landing/features";
import { Testimonials } from "./components/landing/testimonials";
import { Footer } from "./components/landing/footer";

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section id="hero">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
      </main>
      <Footer />
    </div>
  );
}
