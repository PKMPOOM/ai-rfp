import SideMenu from "@/components/Menu";

export default function Home() {
  return (
    <div className="item-center flex h-screen w-screen flex-col">
      <div className="flex h-full w-full justify-between">
        <div className="flex flex-1 flex-col">
          {/* <Nav /> */}
          <div className="flex flex-1 flex-row gap-3 bg-slate-50 p-4">
            <SideMenu />
            quesion
          </div>
        </div>
      </div>
    </div>
  );
}
