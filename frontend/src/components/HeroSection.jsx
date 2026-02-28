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
      color: "text-[hsl(var(--role-teacher))]",
    },
    {
      icon: GraduationCap,
      title: "For Students",
      description:
        "Access your courses, submit assignments, track grades, and stay connected with your education journey.",
      color: "text-[hsl(var(--role-student))]",
    },
    {
      icon: Settings,
      title: "For Administrators",
      description:
        "Oversee operations, manage staff, track performance, and make data-driven decisions.",
      color: "text-[hsl(var(--role-admin))]",
    },
  ];

  return (
    <section className="hero-gradient min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 overflow-x-hidden w-full">
      <div className="max-w-lg w-full mx-auto">
        <div className="mb-6 sm:mb-10 animate-fade-in">
          <Logo />
        </div>

        <h1
          className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[hsl(var(--hero-foreground))] leading-tight mb-4 animate-fade-in break-words"
          style={{ animationDelay: "0.1s" }}
        >
          Welcome to Your
          <br />
          <span className="text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[hsl(var(--hero-foreground))]">School</span>
          <br />
          <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl">
            Management Portal
          </span>
        </h1>

        <p
          className="text-[hsl(var(--hero-muted))] text-xs sm:text-base lg:text-lg mb-8 leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          Streamline education management with our comprehensive platform designed
          for teachers, students, and administrators.
        </p>

        <div className="space-y-4 sm:space-y-6">
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
                iconClassName={feature.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};