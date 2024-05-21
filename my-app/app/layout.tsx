import "../src/styles/layout.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}
      </head>
      <body>
        <div id="content">
          <div className="wrapper">
            <h1>SnapMap</h1>
          </div>
          <div id="children-wrapper">{children}</div>
          <div className="wrapper">
            <h3>Thanks,</h3>
            <p>Deshon</p>
            <p>عبد الشکور</p>
          </div>
        </div>
      </body>
    </html>
  );
}
