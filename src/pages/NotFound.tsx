
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-harmony-light">
      <div className="text-center px-4">
        <div className="mb-6 inline-flex rounded-full bg-harmony-primary p-4">
          <Clock className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-harmony-primary">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          This page has not been scheduled to ring
        </p>
        <Button asChild className="bg-harmony-secondary hover:bg-harmony-secondary/90">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
