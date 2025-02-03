import { LoaderCircle } from "lucide-react";

export default function Loader() {
    
    return(
        <div className='flex w-full justify-center items-center p-4'>
            <LoaderCircle size={66} className="text-primary animate-spin animate-infinite animate-duration-[10s] animate-delay-1000"/>
        </div>
    );
}
