import { CopyrightIcon } from "lucide-react" 

export default function Footer() {

    return(
        <footer className="flex justify-center items-center space-x-1 p-3 border-t border-primary-50 shadow-xl">
            <CopyrightIcon size={24} className="text-muted-foreground"/>
            <p className="text-sm text-muted-foreground">All Rights reserved.</p>
        </footer>
    );
}
