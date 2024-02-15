import Email from "../email";

const TopBar = () => (
  <div className="bg-primary top-0 z-10">
    <div className="flex flex-col justify-center items-center gap-4 py-3 lg:flex-row lg:gap-8">
      <div className="mr-2 rounded bg-danger px-1.5 py-0.5 text-xs font-bold text-white">
        <span className="mr-1">Mailing list</span>▶
      </div>
      <div className="font-bold">
        <span className="hidden sm:inline">
          stay in the loop with our newest feature releases (no spam)
        </span>
        <span className="inline sm:hidden">stay in the loop (no spam)</span>
      </div>
      <Email
        buttonProps={{
          className: "font-semibold h-11",
          color: "default",
          variant: "flat",
        }}
        inputProps={{
          color: "default",
          classNames: {
            inputWrapper: "border-foreground h-11 font-semibold",
            helperWrapper: "!hidden",
          },
          variant: "bordered",
        }}
      />
    </div>
  </div>
);

export default TopBar;
