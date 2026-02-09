import '@my-component-lib/theme/components/_button.scss';
import type { AllHTMLAttributes, ElementType } from 'react';

import clsx from 'clsx';

export interface ButtonProps extends Omit<
  AllHTMLAttributes<HTMLElement>,
  'as'
> {
  /**
   * 渲染的元件類型
   * @default 'button'
   */
  as?: ElementType;

  /**
   * 是否為載入中
   */
  loading?: boolean;
}

function Button({
  as: Component = 'button',
  children,
  className,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  const isButton = Component === 'button';
  const isBlocked = loading || disabled;
  const buttonClassName = clsx('my-button', className);

  return (
    <Component
      {...props}
      aria-busy={loading || undefined}
      aria-disabled={isBlocked || undefined}
      className={buttonClassName}
      data-disabled={disabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
      disabled={isButton ? isBlocked : undefined}
      type={isButton ? 'button' : undefined}
    >
      {children}
    </Component>
  );
}

export default Button;
