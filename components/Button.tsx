import { IButtonProps } from '../types';
import { ButtonVariants } from '../types';

const Button: React.FC<IButtonProps> = ({ text, onClick, variant, className }) => {
  const renderVariant = () => {
    switch (variant) {
      case ButtonVariants.PRIMARY:
        return 'bg-blue-400 hover:bg-blue-700 transition-all ease-in-out duration-200 hover:scale-105 hover:text-white p-2 my-2 rounded';
      case ButtonVariants.ERROR:
        return 'bg-red-400 hover:bg-red-700 transition-all ease-in-out duration-200 hover:scale-105 hover:text-white p-2 my-2 rounded';
      default:
        return 'bg-blue-400 hover:bg-blue-700 transition-all ease-in-out duration-200 hover:scale-105 hover:text-white p-2 my-2 rounded';
    }
  };

  return (
    <div className={`cursor-pointer ${renderVariant()} ${className}`} onClick={() => onClick()}>
      {text}
    </div>
  );
};
export default Button;
