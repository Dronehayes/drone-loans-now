import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, FileText } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-[var(--shadow-elegant)]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-secondary to-accent p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-secondary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription>
            Your loan application has been successfully submitted and is now under review
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold">What happens next?</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Our team will verify your M-Pesa payment</li>
              <li>Your application will be reviewed within 24-48 hours</li>
              <li>You'll receive updates via email and SMS</li>
              <li>Check your application status anytime from the dashboard</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/status")} className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              View Application Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}