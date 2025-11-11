const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>

      <div>
        
        <h3 style={{ marginBottom: '0.5rem' }}>🏠 RentSpace</h3>
        <p> Find the best apartments and rentals across top cities. </p>

        <p style={{ fontSize: '0.9rem', color: '#777' }}>
          © {year} RentSpace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;