import React from 'react'
import "./AboutPage.css";

function AboutPage() {
  return (
    <div>

    <h1>
      About The Developers
      </h1>
        <ul className='developers'>
      <li className='mike'>
        <h2>Michael Restrepoross</h2>
        <img src="/img/MichaelRestrepoross.jpg" alt="Michael Restrepoross's picture" /><br />
        <p>Hello, I'm Michael Restrepoross, a 25 year old Full Stack Forward Engineer with a strong foundation in computer science. My fascination with website and video game development from a young age drove me to pursue this field. With a background in cybersecurity, I bring a deep understanding of the importance of secure coding to ensure robust and reliable solutions. I'm now seeking an opportunity to bring my passion and expertise to a dynamic team, where I can contribute to meaningful projects and continue learning. I'm particularly drawn to companies that share my commitment to innovation and creativity. I believe that my proficiency in JavaScript, along with my cybersecurity background, allows me to approach coding with security in mind.</p>
        <a href="https://github.com/MichaelARestrepoross" target='_blank'>GitHub Link</a>
      </li>
      <li className='chris'>
      <h2>Chris Miranda</h2>
        <img src="/img/ChristopherMiranda.jpg" alt="Chris Miranda's picture" /><br />
        <p> 
        Hello! My name is Christopher Miranda and I am a 27 year old from Yonkers, NY. I got into coding as it was always an interest of mine, but I never took any action on it. As a kid, I had been the troubleshooter in the house for anything computer/internet related. After not finishing college (as I didn't know what I wanted to major in) I worked dead end jobs for a couple of years. I was then introduced to Pursuit from a friend of mine and figured it was the best course of action to be where I want in the future.
        </p>
        <a href="https://github.com/ChrisCodeTrials" target='_blank'>GitHub Link</a>
      </li>
      <li className='isiah'>
      <h2>Isiah Arrufat</h2>
        <img src="/img/IsiahArrufat.jpeg" alt="Isiah Arrufat's picture" /><br />
        <p>Hello My Name is Isiah Arrufat I'm  34 year old Software Engineer from Harlem, NY. I first started coding in High School then i took a break from it, However in 2019 I decided to get back into web development and stared going to a bootcamp Named PerScholas. I joined two internship's since graduating in 2020, but they was the right fit for me and I also felt I needed more training to really be employable, so in 2023 that's when I Joined pursuit after seeing a flyer in my mailbox. I knew this was a sign for me to put best effort into achieving my dream in working as A Software Engineer.</p>
        <a href="https://github.com/IsiahArrufat" target='_blank'>GitHub Link</a>
      </li>
    </ul>
    </div>
  )
}

export default AboutPage