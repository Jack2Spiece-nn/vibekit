export default function NotFound() {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page not found</h2>
            <p style={{ marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
            <a 
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '0.375rem'
              }}
            >
              Go back home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}