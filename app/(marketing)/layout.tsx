import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import ExitIntentPopup from "@/components/layout/ExitIntentPopup";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
