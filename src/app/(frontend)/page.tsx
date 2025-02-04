import About from '@/ui/home/About'
import Contact from '@/ui/home/Contact'
import Features from '@/ui/home/Features'
import Hero from '@/ui/home/Hero'
import FloatingImage from '@/ui/home/Story'
import Universe from '@/ui/home/Universe'
import WhoAreWe from '@/ui/home/WhoAreWe'
import Glance from '@/ui/home/Glance'
import Labels from '@/ui/home/Labels'
import Updates from '@/ui/home/Updates'
import TypeShuffleComponent from '@/ui/modules/TypeShuffle'


export default  function Page() {
  return (
    
 
      <>
       <Hero />
       <About />
       <Features />
       <FloatingImage />
       <Universe />
       <WhoAreWe />
       <Glance />
       <Labels />
       <Updates />
       <Contact /> 
       <TypeShuffleComponent effect='fx1'>
        <b>Aria McDonald</b>
        <b>Creative Web Developer</b>
        <b>5 years experience - HTML, CSS, JavaScript. Passion for creativity in the digital space. Problem solver. Hiker, guitar player, culinary enthusiast. Constantly seeking new challenges, growth opportunities.Bringing imaginative ideas to life. Skilled in modern web development frameworks such as React and Angular. Strong understanding of UI/UX design principles and ability to create visually appealing and usable websites.</b>
        <b>Eco Explorer, SkyBridge, SparkSail</b>
        <b>Best User Experience Design, Webby Awards 2021</b>
       </TypeShuffleComponent>
      </>
       
       

  );
}

