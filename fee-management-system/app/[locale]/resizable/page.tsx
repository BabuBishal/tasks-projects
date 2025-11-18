import {
  Resizable,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ResizablePanel";

const ResizablePage = () => {
  return (
    <div className="flex justify-center items-center w-1/2 h-[500px] border rounded">
      <Resizable direction="vertical">
        <ResizablePanel defaultSize={30}>
          <div className="p-4">Top</div>
        </ResizablePanel>

        <ResizableHandle />

        <Resizable direction="horizontal">
          <ResizablePanel defaultSize={40}>
            <div className="p-4">Left</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={60}>
            <div className="p-4">Right</div>
          </ResizablePanel>
        </Resizable>
      </Resizable>
    </div>
  );
};

export default ResizablePage;
