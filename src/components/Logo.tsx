const Logo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "text-2xl",
    default: "text-4xl md:text-5xl",
    large: "text-5xl md:text-7xl"
  };

  return (
    <div
      className={`criativo-logo ${sizeClasses[size]}`}
      aria-label="crIAtivo"
    >
      <span>cr</span>
      <strong>IA</strong>
      <span>tivo</span>
      <i aria-hidden="true">.</i>
    </div>
  );
};

export default Logo;
