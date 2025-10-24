import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;

  useEffect(() => {
    if (!formData) {
      navigate("/apply");
    }
  }, [formData, navigate]);

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/apply")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Form
        </Button>

        <Card className="shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="h-8 w-8 text-secondary" />
              <CardTitle className="text-2xl">Review Your Application</CardTitle>
            </div>
            <CardDescription>
              Please verify all information before proceeding to payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Full Name:</span>
                <span>{formData.fullName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">ID Number:</span>
                <span>{formData.idNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Phone Number:</span>
                <span>{formData.phoneNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Study Type:</span>
                <span>{formData.studyType}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">College/University:</span>
                <span>{formData.collegeName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Admission Number:</span>
                <span>{formData.admissionNumber}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Loan Purpose:</span>
                <span>{formData.loanPurpose}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Loan Amount:</span>
                <span className="text-lg font-bold text-primary">
                  KSh {parseFloat(formData.loanAmount).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/apply")}
                className="flex-1"
              >
                Edit Application
              </Button>
              <Button
                onClick={() => navigate("/payment", { state: formData })}
                className="flex-1"
              >
                Confirm & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}