import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Shashtika Caught React Render Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    localStorage.removeItem('shashtika_admin_leads');
    localStorage.removeItem('shashtika_customers_registry');
    sessionStorage.removeItem('shashtika_admin_auth');
    sessionStorage.removeItem('vels_admin_authenticated');
    window.location.hash = '#admin';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
            backgroundColor: '#F8F3EA'
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              background: '#FFFDF9',
              border: '2px solid #C6A15B',
              borderRadius: '8px',
              padding: '36px',
              boxShadow: '0 12px 40px rgba(26, 7, 9, 0.15)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'rgba(198, 161, 91, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A9823A" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#1A0709', fontSize: '1.4rem', fontWeight: 800 }}>
              PORTAL SESSION RECOVERY
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(26,7,9,0.75)', margin: '12px 0 20px', lineHeight: 1.6 }}>
              A cached data conflict occurred in local storage. Click below to clear invalid session cache and safely load the SHASHTIKA Admin Portal.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '12px 24px',
                  background: '#1A0709',
                  color: '#E5D2A6',
                  border: '1.5px solid #C6A15B',
                  borderRadius: '4px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  letterSpacing: '1px',
                  cursor: 'pointer'
                }}
              >
                RESET CACHE &amp; OPEN ADMIN PORTAL &rarr;
              </button>
              <a
                href="#"
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  color: '#1A0709',
                  border: '1px solid rgba(26,7,9,0.2)',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
              >
                Return to Home
              </a>
            </div>
            {this.state.error && (
              <pre
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  background: '#f1ebd8',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  color: '#842029',
                  textAlign: 'left',
                  overflowX: 'auto',
                  fontFamily: 'monospace'
                }}
              >
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
