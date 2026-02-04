import '@my-component-lib/theme/components/_button.scss';
import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 可以插入文字或元件
   */
  children: React.ReactNode;

  /**
   * 是否為載入中
   */
  loading?: boolean;
}

function Button({
  children,
  className,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  const buttonClassName = clsx('my-button', className);

  return (
    <button
      {...props}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      className={buttonClassName}
      data-disabled={disabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
      data-state={loading ? 'loading' : disabled ? 'disabled' : 'idle'}
      disabled={disabled || loading}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
