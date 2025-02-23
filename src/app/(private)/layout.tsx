export default function PrivateLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div>
          <h1>Private Pages</h1>
          {children}
      </div>
    );
  }
  