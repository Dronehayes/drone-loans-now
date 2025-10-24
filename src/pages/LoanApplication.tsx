import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

const loanSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  idNumber: z.string().trim().min(5).max(20),
  phoneNumber: z.string().trim().regex(/^(\+?254|0)[17]\d{8}$/, "Invalid Kenyan phone number"),
  studyType: z.enum(["Diploma", "Degree", "Certificate", "Masters", "PhD", "Other"]),
  collegeName: z.string().trim().min(2).max(200),
  admissionNumber: z.string().trim().min(2).max(50),
  loanPurpose: z.enum(["Medical Emergency", "Fee Payment", "Books and Supplies", "Accommodation", "Others"]),
  loanAmount: z.number().positive().max(1000000),
});

export default function LoanApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phoneNumber: "",
    studyType: "",
    collegeName: "",
    admissionNumber: "",
    loanPurpose: "",
    loanAmount: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = loanSchema.parse({
        ...formData,
        loanAmount: parseFloat(formData.loanAmount),
      });

      navigate("/confirm", { state: validatedData });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
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
            <CardTitle className="text-2xl">Loan Application Form</CardTitle>
            <CardDescription>
              Fill in all required information to apply for a student loan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as registered)</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="0712345678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyType">Type of Study</Label>
                <Select value={formData.studyType} onValueChange={(value) => setFormData({ ...formData, studyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select study type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Degree">Degree</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Masters">Masters</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="collegeName">College/University Name</Label>
                <Input
                  id="collegeName"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissionNumber">Admission Number</Label>
                <Input
                  id="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Select value={formData.loanPurpose} onValueChange={(value) => setFormData({ ...formData, loanPurpose: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                    <SelectItem value="Fee Payment">Fee Payment</SelectItem>
                    <SelectItem value="Books and Supplies">Books and Supplies</SelectItem>
                    <SelectItem value="Accommodation">Accommodation</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (KSh)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="10000"
                  value={formData.loanAmount}
                  onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Continue to Confirmation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}