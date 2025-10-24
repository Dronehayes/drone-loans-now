import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, LogOut, FileText, DollarSign, Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Drone's Campus Microfinance</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome, Student!</h2>
          <p className="text-muted-foreground">Choose an action below to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow cursor-pointer border-2 hover:border-primary" onClick={() => navigate("/apply")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Apply for Loan</CardTitle>
              <CardDescription>
                Submit a new loan application with our quick and easy form
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Application</Button>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow cursor-pointer border-2 hover:border-secondary" onClick={() => navigate("/status")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-secondary-foreground" />
              </div>
              <CardTitle>My Loan Status</CardTitle>
              <CardDescription>
                Check the status of your submitted loan applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">View Status</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Contact our support team for assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(`https://wa.me/254700000000?text=${encodeURIComponent("Hello, I need help with my loan application")}`, "_blank")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Chat on WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.location.href = "mailto:hayeslavusa1@gmail.com"}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email: hayeslavusa1@gmail.com
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;