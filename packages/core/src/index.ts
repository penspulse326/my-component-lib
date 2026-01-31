// 範例：一個通用的按鈕屬性處理邏輯
export const getButtonClass = (variant: 'primary' | 'secondary') => {
  const baseClass = 'btn-base';
  return `${baseClass} btn-${variant}`;
};