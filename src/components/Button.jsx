import { memo } from "react";

const Button = memo(function Button({
  href,
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses =
    "font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300";

  const variants = {
    primary:
      "px-8 py-3 bg-accent-primary text-background hover:bg-accent-secondary hover-glow",
    secondary:
      "px-8 py-3 bg-card border border-border text-text-main hover:bg-secondary hover:border-accent-primary/50",
    nav: "px-5 py-2 bg-accent-primary/10 text-accent-primary border border-accent-primary/30 text-sm hover:bg-accent-primary hover:text-background hover-glow",
    ghost:
      "px-6 py-2 bg-card border border-border text-text-main hover:bg-secondary hover:border-accent-primary/50 rounded-lg",
  };

  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
});

export default Button;
