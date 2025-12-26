import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-3 rounded-full border border-border bg-muted">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Access Denied
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            You don’t have permission to view this page.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3">
         {/*  <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button> */}
          <Button variant="destructive" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
