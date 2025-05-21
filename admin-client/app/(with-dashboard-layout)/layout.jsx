import LeftSidebar from "@/components/containers/LeftSidebar";
import PageContent from "@/components/containers/PageContent";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="drawer  lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <PageContent>{children}</PageContent>
        <LeftSidebar />
      </div>

      {/* Left drawer - containing page content and side bar (always open) */}

      {/* Right drawer - containing secondary content like notifications list etc.. */}
      {/* <RightSidebar /> */}

      {/** Notification layout container */}
      {/* <NotificationContainer /> */}

      {/* Modal layout container */}
      {/* <ModalLayout /> */}
    </>
  );
}
