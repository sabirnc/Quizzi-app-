import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <div className="App">
      <div className="header">
        <div className="header-child"></div>
      </div>
        <Outlet />
      <div className="footer">
        <div className="footer-child"></div>
      </div>
    </div>
  );
};

export default RootLayout;
