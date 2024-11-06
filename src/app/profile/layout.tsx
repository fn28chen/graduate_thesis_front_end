"use client";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col flex-1 overflow-hidden border-l-2">
        {children}
      </div>
    </div>
  );
}
