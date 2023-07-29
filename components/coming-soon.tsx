import localFont from "next/font/local";

const cabinet = localFont({
  src: "../public/CabinetGrotesk-Variable.ttf",
});
export default function ComingSoon() {
  return (
    <div>
      <div className={`${cabinet.className} flex rounded-md p-4`}>
        <div className="h-28 w-20 rounded-lg mr-8 border border-dashed dark:border-neutral-500 border-neutral-600"></div>
        <div>
          <h2 className={` text-neutral-900 dark:text-neutral-50 font-medium`}>
            MORE COMING SOON
          </h2>
          <p className="text-neutral-700 dark:text-neutral-400 text-sm">
            New read every week
          </p>
          <p className="text-neutral-700 dark:text-neutral-400 text-sm">
            2 - 60 min
          </p>
        </div>
      </div>
    </div>
  );
}
