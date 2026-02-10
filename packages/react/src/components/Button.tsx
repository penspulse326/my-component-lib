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
   * 是否為禁用狀態
   */
  disabled?: boolean;

  /**
   * 是否為載入中
   */
  loading?: boolean;
}

function Button({
  as: Component = 'button',
  role,
  tabIndex,
  children,
  className,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  const isButton = Component === 'button';
  const isBlocked = loading || disabled;
  const buttonClassName = clsx('my-button', className);

  const accessibilityProps = {
    // 如果不是原生 button，預設 role="button"
    role: role ?? (!isButton ? 'button' : undefined),
    // 如果不是原生 button 且沒被禁用，預設 tabIndex={0} 讓鍵盤能選中
    // 如果被禁用，則為 -1 (不可被選中)
    tabIndex: tabIndex ?? (!isButton ? (isBlocked ? -1 : 0) : undefined),
  };

  return (
    <Component
      {...props}
      {...accessibilityProps}
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
