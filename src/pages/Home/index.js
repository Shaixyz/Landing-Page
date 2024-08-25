 import React from 'react'
 import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import Workflow from './WorkFlow';
import Pricing from './Pricing';

 function Home() {
   return (
     <div className="max-w-7xl mx-auto pt-20 px-6"> 
     
     <HeroSection/>
     <FeatureSection/>
     <Workflow/>
     <Pricing/>
     </div>
   )
 }
 
 export default Home