import SideMenu from "@/components/Menu";
import QuestionPane from "@/components/question/QuestionPane";

export default function Home() {
  return (
    <div className="item-center flex h-screen w-screen flex-col">
      <div className="flex h-full w-full justify-between gap-2 bg-slate-300 p-2">
        <SideMenu />
        <QuestionPane />
      </div>
    </div>
  );
}
