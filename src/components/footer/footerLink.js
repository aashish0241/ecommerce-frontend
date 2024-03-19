import React from 'react'
import "./footerLink.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from "../../assets/shopito_logo.png";


const footerLink = () => {
  return (
    <>
                    <section className='footer-section'>
                                    <div className='container footer'>
                                                      <div className='footer-logo'>
                                                                        <img src={logo} alt='logo'/>
                                                      </div>
                                                      <div className='footer-menu'>
                                                                        <p className='link-heading'>
                                                                                          Features
                                                                        </p>
                                                                        <ul className='nav-ul footer-links'>
                                                                                          <li>
                                                                                                            <a href="#home">Link Shortening</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Branded Links</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Analaytics</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Blog</a>
                                                                                          </li>

                                                                        </ul>
                                                      </div>
                                                      <div className='footer-menu'>
                                                                        <p className='link-heading'>
                                                                                          Features
                                                                        </p>
                                                                        <ul className='nav-ul footer-links'>
                                                                                          <li>
                                                                                                            <a href="#home"></a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Branded Links</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Analaytics</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Blog</a>
                                                                                          </li>
                                                                                          <li>
                                                                                            <a href='#home'>Docs</a>
                                                                                          </li>

                                                                        </ul>
                                                      </div>
                                                      <div className='footer-menu'>
                                                                        <p className='link-heading'>
                                                                                          Features
                                                                        </p>
                                                                        <ul className='nav-ul footer-links'>
                                                                                          <li>
                                                                                                            <a href="#home">Link Shortening</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Branded Links</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Analaytics</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Blog</a>
                                                                                          </li>

                                                                        </ul>
                                                      </div>
                                                      <div className='footer-menu'>
                                                                        <p className='link-heading'>
                                                                                          Features
                                                                        </p>
                                                                        <ul className='nav-ul footer-links'>
                                                                                          <li>
                                                                                                            <a href="#home">Link Shortening</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Branded Links</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Analaytics</a>
                                                                                          </li>
                                                                                          <li>
                                                                                                            <a href="#home">Blog</a>
                                                                                          </li>

                                                                        </ul>
                                                      </div>
                                    </div>

                                      </section></>
  )
}

export default footerLink