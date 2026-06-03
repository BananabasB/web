import { forwardRef, type ButtonHTMLAttributes } from "react";

const baseClasses =
  "text-xs font-bold uppercase tracking-widest cursor-pointer border-b-5 active:mt-0.75 active:border-b-2 border-2 p-2 hover:opacity-60 transition-opacity";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, ...props }, ref) => {
    const classes = className ? `${baseClasses} ${className}` : baseClasses;
    return <button ref={ref} type={type ?? "button"} className={classes} {...props} />;
  }
);

Button.displayName = "Button";

export default Button;
