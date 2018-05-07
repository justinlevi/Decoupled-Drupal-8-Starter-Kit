import React from 'react';

const Footer = () => (
  <footer className="page-footer font-small stylish-color-dark pt-4">
    <div className="container text-center text-md-left">
      <div className="row text-center text-md-left mt-3 pb-3">
        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Company name</h6>
          <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>

        <hr className="w-100 clearfix d-md-none" />

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Column 1</h6>
          <p><a href="#!">link 1</a></p>
          <p><a href="#!">link 2</a></p>
          <p><a href="#!">link 3</a></p>
          <p><a href="#!">link 4</a></p>
        </div>

        <hr className="w-100 clearfix d-md-none" />

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Useful links</h6>
          <p><a href="#!">Your Account</a></p>
          <p><a href="#!">Dashboard</a></p>
          <p><a href="#!">Seach</a></p>
          <p><a href="#!">Help</a></p>
        </div>

        <hr className="w-100 clearfix d-md-none" />

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
          <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
          <p><i className="fa fa-home mr-3" /> Albany, NY 10012, US</p>
          <p><i className="fa fa-envelope mr-3" /> info@gmail.com</p>
          <p><i className="fa fa-phone mr-3" /> + 01 234 567 88</p>
          <p><i className="fa fa-print mr-3" /> + 01 234 567 89</p>
        </div>

      </div>

      <hr />

      <div className="row py-3 d-flex align-items-center">

        <div className="col-md-8 col-lg-8">

          <p className="text-center text-md-left grey-text">© 2018 Copyright: <a href=""><strong> WEBSITE URL HERE</strong></a></p>

        </div>


        <div className="col-md-4 col-lg-4 ml-lg-0">

          <div className="text-center text-md-right">
            <ul className="list-unstyled list-inline">
              <li className="list-inline-item"><a className="btn-floating btn-sm rgba-white-slight mx-1"><i className="fa fa-facebook" /></a></li>
              <li className="list-inline-item"><a className="btn-floating btn-sm rgba-white-slight mx-1"><i className="fa fa-twitter" /></a></li>
              <li className="list-inline-item"><a className="btn-floating btn-sm rgba-white-slight mx-1"><i className="fa fa-google-plus" /></a></li>
              <li className="list-inline-item"><a className="btn-floating btn-sm rgba-white-slight mx-1"><i className="fa fa-linkedin" /></a></li>
            </ul>
          </div>

        </div>

      </div>

    </div>

  </footer>
);

export default Footer;
