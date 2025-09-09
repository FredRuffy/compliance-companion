export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0, height: '100dvh',
        display: 'grid', placeItems: 'center',
        background: '#111', color: '#fff',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
      }}>
        {children}
      </body>
    </html>
  );
}
