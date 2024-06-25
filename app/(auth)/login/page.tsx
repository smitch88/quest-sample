import LoginModal from "@/components/modals/LoginModal/LoginModal";

export default async function LoginPage() {
  return (
    <div className="relative flex flex-col flex-grow text-white w-full gap-4">
      <img
        className="absolute top-0 left-0 object-cover h-full w-full pointer-events-none z-0"
        src="/images/backgrounds/login.png"
        alt="background"
      />
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        <LoginModal />
      </div>
    </div>
  );
}
