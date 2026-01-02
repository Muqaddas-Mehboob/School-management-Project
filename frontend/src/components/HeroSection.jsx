import { BookOpen, GraduationCap, Settings } from "lucide-react";
import { Logo } from "./Logo";
import { FeatureItem } from "./FeatureItem";

export const HeroSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "For Teachers",
      description:
        "Manage classes, assignments, grades, and communicate with students and parents effortlessly.",
    },
    {
      icon: GraduationCap,
      title: "For Students",
      description:
        "Access your courses, submit assignments, track grades, and stay connected with your education journey.",
    },
    {
      icon: Settings,
      title: "For Administrators",
      description:
        "Oversee operations, manage staff, track performance, and make data-driven decisions.",
    },
  ];

  return (
    <div className="hero-gradient min-h-screen flex flex-col justify-center px-1 xxs:px-2 xs:px-4 sm:px-6 md:px-8 lg:px-16 py-2 xxs:py-4 xs:py-8 sm:py-12 overflow-x-hidden w-full">
      <div className="max-w-lg w-full mx-auto">
        <div className="mb-4 xxs:mb-6 xs:mb-8 sm:mb-12 animate-fade-in">
          <Logo />
        </div>

        <h1 
          className="text-sm xxs:text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-hero-foreground leading-tight mb-2 xxs:mb-3 xs:mb-4 sm:mb-6 animate-fade-in break-words"
          style={{ animationDelay: "0.1s" }}
        >
          Welcome to Your
          <br />
          <span className="text-primary">School</span>
          <br />
          <span className="text-xs xxs:text-sm xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Management Portal</span>
        </h1>

        <p 
          className="text-hero-muted text-[8px] xxs:text-xs xs:text-sm sm:text-base lg:text-lg mb-4 xxs:mb-6 xs:mb-8 sm:mb-12 leading-relaxed animate-fade-in break-words"
          style={{ animationDelay: "0.15s" }}
        >
          Streamline education management with our comprehensive platform designed for teachers, parents, and administrators.
        </p>

        <div className="space-y-2 xxs:space-y-3 xs:space-y-4 sm:space-y-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <FeatureItem
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

