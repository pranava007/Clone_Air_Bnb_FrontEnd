import React from 'react';

const Footer = () => {
  return (
    // <!-- Footer -->
    <footer className="bg-light p-3">
        <div className="container text-center">
            <div className="row">
                <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
                    <h3>Company Info</h3>
                    <p>Address</p>
                    <p>Contact</p>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-3 mb-md-0">
                    <h3>Services</h3>
                    <p>Service 1</p>
                    <p>Service 2</p>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                    <h3>Follow Us</h3>
                    <p>Social Media Links</p>
                </div>
            </div>
            <p className="mt-3">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </footer>
    
  );
};

export default Footer;
