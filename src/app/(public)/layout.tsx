export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full gap-4 flex flex-col justify-center items-center content-center">
        <h1 className="">Public Pages</h1>
        {children}
    </div>
  );
}
