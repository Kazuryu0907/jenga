import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {ModalsProvider} from "@mantine/modals";

// MantineのNotificationを使いたいがためのLayout
export const fetchCache = "only-no-store";
export const dynamic = "force-dynamic";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <MantineProvider>
           <Notifications/> 
            <ModalsProvider>
                {children}
            </ModalsProvider>
        </MantineProvider>
    )
}

