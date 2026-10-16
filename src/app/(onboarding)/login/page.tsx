import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginUserForm from "@/features/Onboarding/forms/LoginUserForm";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-primary font-semibold">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LoginUserForm />
      </CardContent>
    </Card>
  );
}
