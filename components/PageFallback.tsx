import Logo from "@/components/Logo";

const PageFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-screen">
      <Logo vertical noLink />
    </div>
  );
};

export default PageFallback;
