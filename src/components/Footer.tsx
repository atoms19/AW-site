import React from 'react';

export default function Footer() {
  const today = new Date();
  return (
    <footer style={{
      padding: '2em 1em 6em 1em',
      color: '#a9a',
      textAlign: 'center',
      fontSize: '0.8rem'
    }}>
      &copy; {today.getFullYear()} Atoms19 , All rights reserved.    
    </footer>
  );
}
