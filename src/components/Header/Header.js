import React, { useEffect, useState } from 'react'
import "./header.scss"
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import Logo from "../../assets/movix-logo.svg"
import {HiOutlineSearch} from "react-icons/hi"
import {SlMenu} from "react-icons/sl"
import {VscChromeClose} from "react-icons/vsc"
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [show, setShow] = useState("top")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState("")
  const navigate = useNavigate()
  const locaion = useLocation()

  useEffect(()=>{
    window.scrollTo(0,0);
  },[locaion])

  const handleNavbarScroll = ()=>{
    if(window.scrollY>200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide")
      }else{
        setShow("show")
      }
    }else{
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(() => {
    window.addEventListener("scroll", handleNavbarScroll) 
    return () => {
      window.removeEventListener("scroll", handleNavbarScroll)
    }
  }, [lastScrollY])
  

  const openSearch = ()=>{
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = ()=>{
    setMobileMenu(true)
    setShowSearch(false)
  }
  const searchQueryHandler = (e)=>{
    if(e.key === "Enter" && query.length >0){
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
  }
  const navigationHandler = (type)=>{
    if(type === "movie"){
      navigate("/explore/movie")

    }else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }


  return (
    <header className={`header ${mobileMenu ? "mobileView": ""} ${show}`}>
      <ContentWrapper>
        <div className='logo' onClick={()=>navigate("/")}>
          <img src={Logo} alt='logo'/>
        </div>
        <ul className='menuItems'>
          <li className='menuItem' onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className='menuItem' onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>
        <div className='mobileMenuItems'>
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu ? (<VscChromeClose onClick={()=>setMobileMenu(false)}/>): (<SlMenu onClick={openMobileMenu}/>)}          
        </div>
      </ContentWrapper>
      {showSearch && <div className='searchBar'>
        <ContentWrapper>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for a movie or tv show....'
              onChange={(e)=>setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={()=>setShowSearch(false)}/>
          </div>
        </ContentWrapper>
      </div>}
    </header>
  )
}

export default Header