import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface ESButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  isPending?: boolean;
}

const ESButton: FC<ESButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
  isPending = false,
}) => {
  return (
    <button
      type={type}
      className={clsx(`btn btn-sm ${!className ? 'btn-success' : className}`)}
      onClick={onClick}
      disabled={isPending ? true : disabled}
    >
      {isPending ? (
        <span className="spinner-border spinner-border-sm mx-5" />
      ) : (
        children
      )}
    </button>
  );
};

export { ESButton };
