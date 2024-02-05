import React from 'react'
import "./LandingPage.css";

function LandingPage({navigateToRecipes,navigateToProfiles}) {
  return (
    <div className='landing-page-wrapper'>
      <video autoPlay loop muted playsInline className="landing-page-video">
        <source src="https://res.cloudinary.com/drsj2l9it/video/upload/v1707098375/istockphoto-1148854218-640_adpp_is_sjcf9s.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section className='landing-info'>
      <h1 className='landing-page-h1'>Safeplate</h1>
      <h3 >Welcome to SafePlate – where your culinary journey begins with safety and satisfaction! 🍽️</h3>
      <p>
        At SafePlate, we understand that planning meals can be a delightful yet challenging task,
         especially when allergies come into play. That's why we're here to make your experience not only 
         enjoyable but worry-free!
      </p><br />
      <p>
        Embark on a personalized adventure by creating your allergy profile –
         a simple step that ensures every recipe you explore aligns perfectly with your dietary needs.
          With SafePlate, you'll never have to second-guess your choices. 
          Discover a world of diverse and delectable recipes tailored to your preferences.
      </p><br />
        <p>Ready to savor the flavors without compromising your well-being?
           Click the button below to start creating your allergy profile and
            unlock a universe of culinary possibilities. 
            Your journey to stress-free and satisfying meal planning begins here! 🌟
      </p><br />
      <button className ="landing-page-to-recipes-button" onClick={navigateToRecipes}>
        Start Searching for <br /> Recipes now.
      </button>
      <button className ="landing-page-to-profile-button" onClick={navigateToProfiles}>
        Have an allergy?<br /> Set your user allergie profile here.
      </button>
      </section>

    </div>
  )
}

export default LandingPage