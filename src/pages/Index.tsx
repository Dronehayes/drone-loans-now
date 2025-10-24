import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, Clock, DollarSign } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[image:var(--gradient-hero)] text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="bg-background/10 backdrop-blur-sm p-4 rounded-2xl">
              <GraduationCap className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Drone's Campus Microfinance
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl text-primary-foreground/90">
              Quick, reliable, and convenient student loans for campus life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-background text-primary hover:bg-background/90 text-lg px-8"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth")}
                className="bg-transparent border-2 border-background text-background hover:bg-background/10 text-lg px-8"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Fast Processing</h3>
                <p className="text-muted-foreground">
                  Get your loan approved within 24-48 hours with our streamlined process
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-accent mx-auto flex items-center justify-center">
                  <Shield className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Your data is protected with bank-level security and encryption
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-primary mx-auto flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold">Affordable Service Fee</h3>
                <p className="text-muted-foreground">
                  Only KSh 150 service fee to process your student loan application
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              { step: 1, title: "Create Account", desc: "Sign up with your email and student details" },
              { step: 2, title: "Fill Application", desc: "Complete the simple loan application form" },
              { step: 3, title: "Pay Service Fee", desc: "Pay KSh 150 via M-Pesa to process your application" },
              { step: 4, title: "Get Approved", desc: "Receive approval within 24-48 hours" },
            ].map((item) => (
              <Card key={item.step} className="border-l-4 border-l-primary">
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-primary-foreground">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[image:var(--gradient-primary)] text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Apply for Your Student Loan?
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Join thousands of students who trust us for their financial needs
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-background text-primary hover:bg-background/90 text-lg px-8"
          >
            Apply Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center text-muted-foreground">
          <p>&copy; 2025 Drone's Campus Microfinance. All rights reserved.</p>
          <p className="mt-2">Contact: hayeslavusa1@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;