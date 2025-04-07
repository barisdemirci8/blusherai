import { Atom, LoaderCircle } from "lucide-react";

export default function Loader() {
  // return(
  //     <div className='flex w-full justify-center items-center p-4'>
  //         <LoaderCircle size={66} className="text-primary animate-spin animate-infinite animate-duration-[10s] animate-delay-1000"/>
  //     </div>
  // );

  // return (
  //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  // );

  return (
    <div className="animate-spin left-1/2 right-1/2 -transform-x-1/2 -transform-y-1/2">
      <Atom size={66} className="border-primary text-primary/50" />
    </div>
  );
}
