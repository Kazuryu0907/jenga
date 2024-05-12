import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
// MantineのNotificationを使いたいがためのLayout
export const fetchCache = "only-no-store";
export default function Layout({children}:{children:React.ReactNode}){
    return (
        <MantineProvider>
           <Notifications/> 
              {children}
        </MantineProvider>
    )
}