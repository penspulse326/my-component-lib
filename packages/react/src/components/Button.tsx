import '@my-component-lib/theme/components/_button.scss';
import clsx from 'clsx';

/**
 * Button
 * 按鈕元件，固定 type="button"
 */
interface ButtonProps {
  /**
   * 可以自行插入文字或元件
   */
  children: React.ReactNode;

  /**
   * 自訂 className，套用於按鈕最外層
   */
  className?: string;

  /**
   * 是否為載入中
   */
  isLoading?: boolean;

  /**
   * 點擊事件
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 自訂內聯樣式，套用於按鈕最外層
   */
  style?: React.CSSProperties;
}

function Button({
  children,
  className,
  isLoading,
  onClick,
  style,
}: ButtonProps) {
  const buttonClassName = clsx(
    'my-button',
    {
      'is-loading': isLoading,
    },
    className
  );

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      style={style}
      type="button"
    >
      {children}
    </button>
  );
}

export default Button;
