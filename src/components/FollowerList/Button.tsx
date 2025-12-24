interface buttonProps {
  className: string;
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({
  className,
  onClick,
  children,
}: buttonProps): React.JSX.Element => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
