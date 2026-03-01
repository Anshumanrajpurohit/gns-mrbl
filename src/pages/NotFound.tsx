import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 page visited:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-lg rounded-3xl border border-border/60 bg-card p-10 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">404</p>
        <h1 className="mt-4 font-display text-4xl text-foreground">This page wandered off the map.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Let&apos;s take you back to marble, granite, and temple craftsmanship at Ganpati Marble Goa.
        </p>
        <div className="mt-6 flex justify-center">
          <Button variant="warm" asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
