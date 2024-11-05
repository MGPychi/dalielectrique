import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="relative">
        {/* <Header
          containerClassName=""
          className="relative bg-blue-500  !top-0 max-w-screen-2xl"
        /> */}
      </div>
      <main>{children}</main>
    </>
  );
};

export default layout;
