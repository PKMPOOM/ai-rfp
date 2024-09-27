import { Button } from "antd";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-red-50 h-screen w-screen flex flex-col item-center p-2">
      <div className="">
        <Button type="primary">Primary Button</Button>
      </div>
    </div>
  );
}
