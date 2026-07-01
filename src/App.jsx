import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";
import Info from "./components/Info";
import CursorTrail from "./components/cursorTrail";
import ThirdSection from "./components/ThirdSection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

const App = () => {
  // lenis scroll

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    // single source of truth for the raf loop — removed the duplicate requestAnimationFrame loop
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000)); // clean up ticker too
      lenis.destroy();
    };
  }, []);

  return (
    <DeviceBlock>
      <CursorTrail
        items={[
          { src: "/images/img-webp/lettuce.webp", alt: "lettuce" },
          { src: "/images/img-webp/tomato.webp", alt: "tomato" },
          { src: "/images/img-webp/cheese.webp", alt: "cheese", rotate: -135 },
          { src: "/images/img-webp/meat.webp", alt: "patty" },
        ]}
        ineWidth={10}
        size={"32px"}
      />
      <main className="w-full select-none">
        <Navbar />
        <Hero />
        <Info />
        <ThirdSection />
        <div className="faltu">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          soluta sed sunt odit at perspiciatis rerum veniam magnam consequatur
          numquam quae eveniet tempora illo officiis laboriosam nemo ex
          deleniti, eum quas explicabo est molestiae! Accusantium cumque eaque
          nam temporibus reprehenderit ipsa praesentium, nulla totam a nobis
          eius molestias est ea ut ducimus labore sunt non enim voluptas quos.
          Facilis, corrupti! Excepturi voluptates facilis reprehenderit at illo
          consequuntur sed doloremque quia distinctio impedit eaque perferendis
          accusantium, quaerat quae omnis, odit similique necessitatibus dolor
          incidunt nobis hic beatae! Voluptates voluptas dolor praesentium
          consequuntur tenetur debitis quod odit? Voluptate sed aperiam omnis
          quia. Dicta maxime non, minus fugit ipsa obcaecati quidem dolorem
          officia possimus voluptatem tempore quo dolorum, velit eaque soluta
          facere necessitatibus quos? Laboriosam voluptatum ipsam facere
          corporis dolorem, tenetur eum, consectetur quam mollitia, blanditiis
          eaque veniam repudiandae sapiente possimus reiciendis quas incidunt
          tempora optio impedit nulla. Quisquam corrupti minus saepe itaque
          ullam porro ipsa asperiores similique libero quasi earum labore quis,
          magni tempora voluptas numquam sed consequuntur laborum dignissimos
          sunt vero fugiat ipsam unde! Quasi commodi dignissimos dolorem ipsa
          suscipit amet ut repellendus eius, tenetur quaerat doloribus omnis
          sunt laboriosam ad ipsum facere delectus illo iusto facilis temporibus
          similique est culpa? Reiciendis enim tempora hic vel necessitatibus.
          Commodi aliquid facere odit placeat, assumenda alias consequuntur a
          atque illum eaque beatae nisi pariatur, molestias hic perferendis sit
          quia necessitatibus. Consequatur expedita velit enim doloribus!
          Accusantium debitis aperiam odit veniam veritatis id neque optio?
          Explicabo itaque tempore, maxime cumque et blanditiis, quo ex
          repellendus animi ullam perferendis nobis, mollitia consequatur
          assumenda beatae quidem similique aperiam quos modi dolor tenetur sunt
          laborum. Dolore laboriosam, dicta nam consequatur ipsa sint animi
          ducimus, necessitatibus nihil placeat perspiciatis cupiditate mollitia
          rem asperiores exercitationem aspernatur dolores temporibus ipsum.
          Debitis quia dolorem nemo, magni consequatur illo officiis labore
          reprehenderit delectus, fuga tempore dolor! Vero eaque voluptate
          incidunt odit quia quidem. Illum distinctio obcaecati consequuntur
          temporibus esse aspernatur tenetur. Culpa temporibus optio quis quam
          eum quisquam debitis nesciunt iste! Consectetur tenetur, recusandae
          ducimus dolore soluta ab praesentium laborum laboriosam molestias
          perspiciatis corporis eaque quas aliquid vero animi provident fugit
          officia corrupti quasi consequuntur, sed fugiat similique voluptas!
          Mollitia repudiandae velit debitis quia est dolorem in neque modi
          ullam voluptatibus nisi commodi ducimus culpa, quae, consequatur cum
          numquam ab similique unde quidem molestias. Similique, asperiores
          repellendus consectetur excepturi quia a fugit nemo reiciendis,
          impedit repudiandae cum! Vero quisquam neque quasi rem quam cum quae
          quaerat similique quas doloremque! Exercitationem adipisci dolore
          alias, molestiae similique iste esse explicabo quo voluptas! Deleniti
          dolorem, vitae veritatis saepe quos est cupiditate! Omnis cumque
          blanditiis, non ipsum impedit atque culpa quod, distinctio cum eum ad
          nisi dolor accusamus nihil sequi debitis neque delectus esse. Nulla,
          illum adipisci laudantium libero incidunt nam distinctio atque
          perspiciatis maiores pariatur at magnam consequuntur eius tempora
          provident aspernatur voluptates voluptatem quam excepturi numquam.
          Reiciendis laborum nisi architecto perspiciatis ab molestias eligendi,
          amet tempora placeat nemo unde saepe odio optio consectetur similique
          sed, quaerat ullam labore minus sequi, est laboriosam quia dolor?
          Repellat vel, veniam in maiores tempora at iste consequuntur quam quod
          obcaecati sunt ea provident sint dolorem. Rem quaerat laboriosam est
          iure autem, laudantium porro odit voluptas, dolore modi quisquam iste
          ut harum? Magnam vel iste sunt quisquam fuga alias, vero officia id
          minima nostrum repellat et soluta, obcaecati, dolore ipsum repudiandae
          voluptate cum? Sit nostrum sunt vitae, eligendi neque consectetur
          laboriosam non praesentium voluptatem id explicabo rem, magnam,
          excepturi vel expedita maiores ipsum quisquam rerum. Molestias est
          tempore dolorum officiis possimus distinctio odit dignissimos
          obcaecati! In quo debitis eos sapiente facilis facere magni alias esse
          veritatis mollitia, sequi fugiat!
        </div>
      </main>
    </DeviceBlock>
  );
};;

export default App;
