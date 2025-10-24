import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

interface LoanApplication {
  id: string;
  full_name: string;
  loan_amount: number;
  loan_purpose: string;
  status: string;
  created_at: string;
}

export default function LoanStatus() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("loan_applications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
      case "Under Review":
        return <Clock className="h-4 w-4" />;
      case "Approved":
      case "Disbursed":
        return <CheckCircle className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "Approved":
      case "Disbursed":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <CardTitle className="text-2xl">My Loan Applications</CardTitle>
            <CardDescription>
              Track the status of all your loan applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <DollarSign className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-semibold mb-1">No applications yet</p>
                  <p className="text-sm text-muted-foreground">
                    You haven't submitted any loan applications
                  </p>
                </div>
                <Button onClick={() => navigate("/apply")}>
                  Apply for Loan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-1">
                          <p className="font-semibold">{app.full_name}</p>
                          <p className="text-sm text-muted-foreground">
                            Applied on {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={getStatusVariant(app.status)} className="flex items-center gap-1">
                          {getStatusIcon(app.status)}
                          {app.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold text-lg">
                            KSh {parseFloat(app.loan_amount.toString()).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Purpose</p>
                          <p className="font-semibold">{app.loan_purpose}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}