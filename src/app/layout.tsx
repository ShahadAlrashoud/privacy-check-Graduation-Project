import "./globals.css";  
import type { Metadata } from "next";  
import type { ReactNode } from "react";  
  
export const metadata: Metadata = {  
  title: "Wafiq Biwa'i",  
  description: "Analyze Terms of Service and Privacy Policy pages with a simple risk summary."  
};  
  
type RootLayoutProps = {  
  children: ReactNode;  
};  
  
export default function RootLayout({ children }: RootLayoutProps) {  
  return (  
    <html lang="en">  
      <body>{children}</body>  
    </html>  
  );  
}