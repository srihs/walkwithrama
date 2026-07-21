import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import Music from "@/components/Music";
import Sea from "@/components/Sea";
import Vlogs from "@/components/Vlogs";
import Training from "@/components/Training";
import Stats from "@/components/Stats";
import Gallery from "@/components/Gallery";
import Ventures from "@/components/Ventures";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Origin />
        <Music />
        <Sea />
        <Vlogs />
        <Training />
        <Stats />
        <Gallery />
        <Ventures />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
