
import Navigation from "@/components/ui/shared/Navigation";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default MainLayout;
