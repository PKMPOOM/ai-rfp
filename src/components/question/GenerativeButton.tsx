import { Button, ConfigProvider } from "antd";
import { Sparkles } from "lucide-react";
type Props = {
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

const GenerativeButton = ({ children, icon, ...props }: Props) => {
  const defaultBgColor = ["#6253E1", "#04BEFE"];
  const defaultBgColorhover = ["#7b6df9", "#21c6fd"];
  const defaultBgColorActive = ["#5A4ECE", "#04B0EA"];
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            // bg
            defaultBg: `linear-gradient(135deg,${defaultBgColor.join(",")})`,
            defaultActiveBg: `linear-gradient(90deg, ${defaultBgColorActive.join(
              ",",
            )})`,
            defaultHoverBg: `linear-gradient(90deg, ${defaultBgColorhover.join(
              ",",
            )})`,
            // text
            defaultColor: "#fff",
            defaultHoverColor: "#fff",
            defaultActiveColor: "#fff",
            // border
            defaultBorderColor: "#fff",
            defaultHoverBorderColor: "#fff",
            // shadow
            defaultShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
          },
        },
      }}
    >
      {children ? (
        <Button {...props} icon={icon ?? <Sparkles size={20} />}>
          {children}
        </Button>
      ) : (
        <Button {...props} icon={icon ?? <Sparkles size={20} />} />
      )}
    </ConfigProvider>
  );
};

export default GenerativeButton;
