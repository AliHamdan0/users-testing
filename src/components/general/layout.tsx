import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({
  children,
  custom,
}: {
  children: React.ReactNode;
  custom: boolean;
}) => {
  if (custom) return <>{children}</>;
  else
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
};
