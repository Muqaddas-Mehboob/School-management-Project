export const FeatureItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex gap-1 xxs:gap-1.5 xs:gap-2 sm:gap-4 animate-fade-in">
      <div className="w-6 h-6 xxs:w-7 xxs:h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-3 h-3 xxs:w-3.5 xxs:h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-hero-foreground mb-0.5 xxs:mb-0.5 xs:mb-1 text-[10px] xxs:text-xs xs:text-sm sm:text-base break-words">{title}</h3>
        <p className="text-hero-muted text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm leading-relaxed break-words">{description}</p>
      </div>
    </div>
  );
};
