import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { BsFacebook, BsGoogle, BsInstagram, BsTwitter, BsFillArrowUpCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import darkLogo from '../../images/darkLogo.png'
import lightLogo from '../../images/lightLogo.png'
import "./footer.css"
import { IconButton, Tooltip, Zoom } from "@mui/material";

const Footer = () => {

  const themeSlice = useSelector(state => state.theme)

  const dynamicText = { color: themeSlice === false ? 'white' : 'black' }
  return (
    <MDBFooter
      style={{ backgroundColor: themeSlice === false ? 'rgb(12, 12, 12)' : 'rgb(227, 236, 243)' }}
      className="font-small pt-4 mt-4 footer-design">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <div className="logo-type">
            <h6 style={dynamicText} className="title">Gotta catch 'em all!</h6>
            <img src={themeSlice === false ? darkLogo : lightLogo} width='200rem' alt='darkimg' />
          </div>
          <MDBCol md="4">
            <h5 style={dynamicText} className="title">

            </h5>

          </MDBCol>
          <MDBCol md="4">
            <h5 style={dynamicText} className="title">

            </h5>
            <ul>

            </ul>
          </MDBCol>
          <MDBCol md="4">
            <h5 style={dynamicText} className="title">

            </h5>
            <ul>

            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 after-footer">
        <div className="after-footer-icons">
          <Tooltip TransitionComponent={Zoom}
            title='Go Up'>
            <IconButton aria-label="share">
              <a className="footer-icon" style={dynamicText} href="#"><BsFillArrowUpCircleFill /></a>
            </IconButton>
          </Tooltip>
          {/* <a className="footer-icon" href="#"><BsFacebook /></a>
          <a className="footer-icon" href="#"><BsInstagram /></a>
          <a className="footer-icon" href="#"><BsTwitter /></a>
          <a className="footer-icon" href="#"> <BsGoogle /></a> */}
        </div>
        <MDBContainer style={dynamicText} className="after-footer-copyright" fluid>
          &copy; {new Date().getFullYear()} Copyright: Gal Ben-Shushan. All Rights Reserved.
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;