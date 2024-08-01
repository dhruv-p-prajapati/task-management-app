import * as React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPass, setShowPass] = React.useState(false);

    if (type === 'password') {
      return (
        <div className="relative w-full">
          <input
            type={showPass ? 'text' : 'password'}
            className={cn(
              'flex h-10 w-full rounded-md border-[1px] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer p-4"
            onClick={() => setShowPass(!showPass)}
          >
            {!showPass ? (
              <FaRegEye className="h-5 w-5" />
            ) : (
              <FaRegEyeSlash className="h-5 w-5" />
            )}
          </div>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border-[1px] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
