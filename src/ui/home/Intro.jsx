const Intro = ({}) => {
  return    <div
  id="intro-slider"
  className="h-screen p-10 bg-black font-extrabold space-y-10 text-black absolute top-0 left-0 font-spaceGrotesk z-[90] w-full flex flex-col justify-center items-center tracking-tight"
>
  <h1 className="special-font hero-heading  z-40 " id="title-1">
    WELC<b>O</b>ME
  </h1>
  {/* <h1 className="text-4xl md:text-6xl lg:text-8xl text-center" >
    Welcome
  </h1> */}
  <h1 className="special-font hero-heading uppercase" id="title-2">
    to
  </h1>
  <h1 className="special-font hero-heading uppercase text-blue-75" id="title-3">
    Cyber<b>k</b>oko
  </h1>
  <div id="title-3" className='absolute bottom-0 max-lg:bottom-20 left-0 w-full'>

    <h1 className="  text-lg md:text-xl   lg:text-xl text-center">
      Developed by <span className='special-font hero-heading-s text-sm uppercase'>Kostadin Draganov</span>
    </h1>
  </div>
</div>
}

export default Intro