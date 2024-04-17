// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TextFit from 'react-textfit';



function Hero() {
  return (
    <section className=" py-44 flex justify-center items-center rounded-xl shadow-sm shadow-gray-900 border-white hero ">
      <div >
        <TextFit mode="single" max={40}>
          <h1 className= " text-underlay-2 absolute right-28 mt-[-110px] text-6xl font-serif animate-pulse antialiased  "  > 
          Realize Your Career Goals
          </h1>
        </TextFit>
      </div>
    </section>
  );
}

export default Hero;  





