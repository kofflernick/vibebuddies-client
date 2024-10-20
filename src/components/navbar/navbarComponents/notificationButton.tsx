import React from "react"
import { IconButton, Tooltip, Badge } from "@mui/material"
import PeopleIcon from "@mui/icons-material/People"

/*button on the feed page that will show the user their notifications*/

interface NotificationsButtonProps {
  handleOpenNotifications: (event: React.MouseEvent<HTMLElement>) => void
  notificationCount: number
}

const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  handleOpenNotifications,
  notificationCount,
}) => {
  return (
    <Tooltip title="Friend Requests" arrow placement="top">
      <IconButton
        onClick={handleOpenNotifications}
        sx={{
          color: "grey",
          width: "100px",
          height: "100px",
        }}
      >
        {/* <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon sx={{ fontSize: 60 }} />
        </Badge> */}
        <PeopleIcon sx={{ fontSize: 60 }} />
      </IconButton>
    </Tooltip>
  )
}

export default NotificationsButton
