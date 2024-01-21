import React from 'react'
import "./footer.scss"
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'


const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className='footer'>
      <ContentWrapper>
        <ul className='menuItems'>
          <li className='menuItem'>Terms of Use</li>
          <li className='menuItem'>Privacy Policy</li>
          <li className='menuItem'>About</li>
          <li className='menuItem'>Blog</li>
          <li className='menuItem'>FAQ</li>
        </ul>
        <div className='infoText'>
        Explore a dynamic cinematic experience on my React-powered website. Fueled by Redux for seamless state management, it seamlessly integrates with TMDb API to deliver up-to-date movie information. Immerse yourself in a user-friendly interface that combines cutting-edge technology and the latest film data for an unparalleled entertainment journey.
        </div>
        <div className='socialIcons'>
          <span className='icon'>
            <Link to="https://github.com/sDeswal10">
              <FaGithub/>
            </Link>
          </span>
          <span className='icon'>
            <Link to="https://www.instagram.com/">
              <FaInstagram/>
            </Link>
          </span>
          <span className='icon'>
            <Link to="https://www.linkedin.com/in/sachindeswal10">
              <FaLinkedin/>
            </Link>
          </span>
        </div>
      </ContentWrapper>
    </footer>
  )
}

export default Footer