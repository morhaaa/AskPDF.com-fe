import Login from "@/components/login";
import ReturnToHomePage from "@/components/return-home";

const PageLogin: React.FC = () => {
  return (
    <section className="h-screen w-screen  bg-gradient-to-b from-gray-100 to-gray-100/10 flex flex-col">
      <div className="mt-6 ml-6">
        <ReturnToHomePage />
      </div>
      <div className="w-full flex-1 flex items-center justify-center">
        <Login />
      </div>
    </section>
  );
};

export default PageLogin;
