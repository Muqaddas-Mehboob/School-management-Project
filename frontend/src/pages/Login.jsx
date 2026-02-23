import { HeroSection } from "@/components/HeroSection";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-x-hidden w-full max-w-full min-w-[10px]">
      {/* Left Side - Hero Section */}
      <div className="w-full lg:w-1/2 lg:h-screen min-h-[200px] xxs:min-h-[300px] sm:min-h-[400px] shrink-0">
        <HeroSection />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 lg:h-screen flex items-center justify-center px-0.5 xxs:px-1 xs:px-2 sm:px-3 md:px-4 sm:py-4 md:py-6 lg:px-12 bg-background min-h-[300px] xxs:min-h-[400px] overflow-hidden min-w-0">
        <div className="w-full max-w-md h-full flex items-center min-w-0">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;

