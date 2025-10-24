import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Copy, CreditCard, CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

const mpesaCodeSchema = z.string().trim().min(10, "M-Pesa code must be at least 10 characters").max(20, "M-Pesa code must be less than 20 characters");

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const [mpesaCode, setMpesaCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData) {
      navigate("/apply");
    }
  }, [formData, navigate]);

  const copyTillNumber = () => {
    navigator.clipboard.writeText("8456602");
    toast({
      title: "Copied!",
      description: "Till number copied to clipboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      mpesaCodeSchema.parse(mpesaCode);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please login to submit your application",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("loan_applications").insert({
        user_id: user.id,
        full_name: formData.fullName,
        id_number: formData.idNumber,
        phone_number: formData.phoneNumber,
        study_type: formData.studyType,
        college_name: formData.collegeName,
        admission_number: formData.admissionNumber,
        loan_purpose: formData.loanPurpose,
        loan_amount: formData.loanAmount,
        mpesa_code: mpesaCode,
        status: "Pending",
      });

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "Your loan application has been submitted successfully.",
      });

      navigate("/success");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission failed",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/confirm", { state: formData })}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Confirmation
        </Button>

        <Card className="shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="h-8 w-8 text-secondary" />
              <CardTitle className="text-2xl">Service Fee Payment</CardTitle>
            </div>
            <CardDescription>
              Complete the payment to submit your loan application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-secondary/10 border-2 border-secondary rounded-lg p-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Service Fee</p>
                <p className="text-3xl font-bold text-secondary">KSh 150</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Till Number</p>
                    <p className="text-2xl font-bold">8456602</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyTillNumber}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Payment Instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Go to M-Pesa on your phone</li>
                        <li>Select Lipa na M-Pesa → Buy Goods and Services</li>
                        <li>Enter Till Number: <strong>8456602</strong></li>
                        <li>Enter Amount: <strong>KSh 150</strong></li>
                        <li>Enter your M-Pesa PIN and confirm</li>
                        <li>You'll receive an M-Pesa confirmation message</li>
                        <li>Enter the M-Pesa code below</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mpesaCode">M-Pesa Transaction Code</Label>
                <Input
                  id="mpesaCode"
                  placeholder="e.g., SH12ABC34D"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter the M-Pesa confirmation code you received via SMS
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}