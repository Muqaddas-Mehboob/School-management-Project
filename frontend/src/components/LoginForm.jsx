import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, UserCircle, GraduationCap, Shield, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RoleCard } from "./RoleCard";
import { ContactSupportDialog } from "./ContactSupportDialog";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState("teacher");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const { toast } = useToast();

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const roles = [
    { id: "teacher", label: "Teacher", icon: UserCircle },
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "admin", label: "Admin", icon: Shield },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Login Successful",
      description: `Welcome back, ${selectedRole}!`,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!signupEmail || signupEmail.trim() === "") {
      toast({
        title: "Error",
        description: "Email or Username is required",
        variant: "destructive",
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password
    if (!signupPassword || signupPassword.trim() === "") {
      toast({
        title: "Error",
        description: "Password is required",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password length
    if (signupPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    
    // Validate confirm password
    if (!signupConfirmPassword || signupConfirmPassword.trim() === "") {
      toast({
        title: "Error",
        description: "Please confirm your password",
        variant: "destructive",
      });
      return;
    }
    
    // Validate password match
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // All validations passed
    toast({
      title: "Account Created!",
      description: "You can now login with your credentials.",
    });
    
    // Reset form
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    
    // Switch to login tab
    setActiveTab("login");
  };

  const getButtonColor = () => {
    switch (selectedRole) {
      case "teacher":
        return "bg-role-teacher hover:bg-role-teacher/90";
      case "student":
        return "bg-role-student hover:bg-role-student/90";
      case "admin":
        return "bg-role-admin hover:bg-role-admin/90";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-w-[10px] h-full flex flex-col overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-0.5 xxs:p-0.5 sm:p-1 mb-1.5 xxs:mb-2 xs:mb-3 sm:mb-4 gap-0.5 xxs:gap-0.5 sm:gap-1 min-w-0 shrink-0">
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 py-1 xxs:py-1.5 xs:py-2 sm:py-2.5 text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold rounded-md transition-all duration-200 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${
            activeTab === "login"
              ? "bg-background text-foreground shadow-sm font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`flex-1 py-1 xxs:py-1.5 xs:py-2 sm:py-2.5 text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold rounded-md transition-all duration-200 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${
            activeTab === "signup"
              ? "bg-background text-foreground shadow-sm font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form Header */}
      <div className="mb-1.5 xxs:mb-2 xs:mb-3 sm:mb-4 shrink-0 min-w-0">
        <h2 className="text-[10px] xxs:text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold text-foreground mb-0.5 xxs:mb-1 break-words overflow-wrap-anywhere">
          {activeTab === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm text-muted-foreground break-words overflow-wrap-anywhere">
          {activeTab === "login"
            ? "Please login to access your account"
            : "Fill in the details to create your account"}
        </p>
      </div>

      {/* Role Selection */}
      <div className="mb-1.5 xxs:mb-2 xs:mb-3 sm:mb-4 shrink-0 min-w-0">
        <label className="block text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-foreground mb-1 xxs:mb-1.5 xs:mb-2 break-words">
          Select Your Role
        </label>
        <div className="flex gap-0.5 xxs:gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5 min-w-0 overflow-x-auto">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              icon={role.icon}
              label={role.label}
              role={role.id}
              selected={selectedRole === role.id}
              onClick={() => setSelectedRole(role.id)}
            />
          ))}
        </div>
      </div>

      {/* Forms Container - No Scroll */}
      <div className="flex-1 flex flex-col min-h-0">
        {activeTab === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col flex-1">
            {/* Email Input */}
            <div className="mb-1.5 xxs:mb-2 xs:mb-2.5 sm:mb-3">
              <label className="block text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm font-medium text-foreground mb-1 xxs:mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-2 xxs:left-2.5 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xxs:w-4 xxs:h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-muted-foreground z-10" />
                <Input
                  type="email"
                  placeholder="Enter your email or username"
                  className="pl-9 xxs:pl-10 xs:pl-11 sm:pl-12"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-1.5 xxs:mb-2 xs:mb-2.5 sm:mb-3">
              <label className="block text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm font-medium text-foreground mb-1 xxs:mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2 xxs:left-2.5 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 xxs:w-4 xxs:h-4 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-muted-foreground z-10" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-9 xxs:pl-10 xs:pl-11 sm:pl-12 pr-9 xxs:pr-10 xs:pr-11 sm:pr-12"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 xxs:right-2.5 xs:right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5 xxs:w-4 xxs:h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Eye className="w-3.5 h-3.5 xxs:w-4 xxs:h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-2 xxs:mb-2.5 xs:mb-3 sm:mb-4 flex-wrap gap-1.5 xxs:gap-2">
              <div className="flex items-center gap-1.5 xxs:gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label htmlFor="remember" className="text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm text-muted-foreground cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm text-link hover:underline font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="login"
              size="lg"
              className={`mb-2 xxs:mb-2.5 xs:mb-3 sm:mb-4 ${getButtonColor()}`}
            >
              <LogIn className="w-3.5 h-3.5 xxs:w-4 xxs:h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              <span className="text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm">Login to Dashboard</span>
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            {/* Compact Grid Layout for Signup */}
            <div className="grid grid-cols-1 gap-1 xxs:gap-1.5 xs:gap-2 sm:gap-2.5 flex-1 min-h-0 pb-2">
              {/* Email Input */}
              <div className="min-w-0 shrink-0">
                <label className="block text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-foreground mb-0.5 xxs:mb-1 xs:mb-1.5 break-words">
                  Email or Username <span className="text-destructive">*</span>
                </label>
                <div className="relative min-w-0">
                  <Mail className="absolute left-1.5 xxs:left-2 xs:left-2.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-muted-foreground z-10 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-7 xxs:pl-9 xs:pl-10 sm:pl-11 md:pl-12 text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm min-w-0 w-full"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="min-w-0 shrink-0">
                <label className="block text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-foreground mb-0.5 xxs:mb-1 xs:mb-1.5 break-words">
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative min-w-0">
                  <Lock className="absolute left-1.5 xxs:left-2 xs:left-2.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-muted-foreground z-10 pointer-events-none" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password (min 6 chars)"
                    className="pl-7 xxs:pl-9 xs:pl-10 sm:pl-11 md:pl-12 pr-7 xxs:pr-9 xs:pr-10 sm:pr-11 md:pr-12 text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm min-w-0 w-full"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1.5 xxs:right-2 xs:right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-0.5 min-w-[20px] min-h-[20px] flex items-center justify-center"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Eye className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="min-w-0 shrink-0">
                <label className="block text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium text-foreground mb-0.5 xxs:mb-1 xs:mb-1.5 break-words">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <div className="relative min-w-0">
                  <Lock className="absolute left-1.5 xxs:left-2 xs:left-2.5 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-4 sm:h-4 text-muted-foreground z-10 pointer-events-none" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="pl-7 xxs:pl-9 xs:pl-10 sm:pl-11 md:pl-12 pr-7 xxs:pr-9 xs:pr-10 sm:pr-11 md:pr-12 text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm min-w-0 w-full"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1.5 xxs:right-2 xs:right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10 p-0.5 min-w-[20px] min-h-[20px] flex items-center justify-center"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Eye className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Signup Button - Create Account - Always Visible */}
            <div className="mt-1.5 xxs:mt-2 xs:mt-2.5 sm:mt-3 shrink-0 sticky bottom-0 bg-background pt-2 pb-1 z-20">
              <Button
                type="submit"
                variant="login"
                size="lg"
                className={`w-full ${getButtonColor()} min-h-[32px] xxs:min-h-[36px] xs:min-h-[40px] sm:min-h-[44px] text-[8px] xxs:text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold`}
              >
                <UserPlus className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Create Account</span>
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Support Link */}
      <p className="text-center text-[9px] xxs:text-[10px] xs:text-xs sm:text-sm text-muted-foreground mt-2 xxs:mt-2.5 xs:mt-3 sm:mt-4 pt-1 xxs:pt-1.5">
        Need help?{" "}
        <button
          onClick={() => setContactDialogOpen(true)}
          className="text-link hover:underline font-medium"
        >
          Contact Support
        </button>
      </p>

      <ContactSupportDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
      />
    </div>
  );
};
