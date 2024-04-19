import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export default function Layout({children}:{children:React.ReactNode}){
    return (
        <MantineProvider>
           <Notifications/> 
              {children}
        </MantineProvider>
    )
}