import Banner from '@/components/homePage/banner/Banner'
import FeaturedPrompts from '@/components/homePage/featuredPrompts/FeaturedPrompts'
import Footer from '@/components/homePage/footer/Footer'
import MultiPlatforms from '@/components/homePage/multiPlatforms/MultiPlatforms'
import Navbar from '@/components/homePage/navbar/Navbar'
import Review from '@/components/homePage/reviews/Review'
import StepsToMastery from '@/components/homePage/stepsToMastery/StepsToMastery'
import TopCreators from '@/components/homePage/topCreators/TopCreators'
import WhyChooseUs from '@/components/homePage/whyChooseUs/WhyChooseUs'
import React from 'react'

const RootPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <FeaturedPrompts />
      <WhyChooseUs />
      <StepsToMastery />
      <TopCreators />
      <Review />
      <MultiPlatforms />
      <Footer />
    </div>
  )
}

export default RootPage
