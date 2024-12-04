export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col m-10 w-full">
      {children}
    </div>
  );
}
