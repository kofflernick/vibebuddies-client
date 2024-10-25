import React from "react"
import { Box, Typography, Avatar } from "@mui/material"
import { formatTimeDifference } from "../../../utils/formatTimeDifference"
import { Link } from "react-router-dom"

interface CommentItemProps {
  username: string
  user_id: string
  comment_id: string
  comment_body: string
  timestamp: number
}

const CommentItem: React.FC<CommentItemProps> = ({
  username,
  user_id,
  comment_id,
  comment_body,
  timestamp,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      padding={2}
      bgcolor="rgba(240, 240, 240, 0.5)"
      borderRadius={2}
      marginBottom={2}
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Avatar alt={username} sx={{ width: 40, height: 40, marginRight: 2 }}>
        {username.charAt(0).toUpperCase()}
      </Avatar>

      {/* Comment Content */}
      <Box flex={1}>
        {/* Username and Time Container */}
        <Box display="flex" alignItems="center">
          {/* Username link with visual indicator */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ marginRight: 1 }}
          >
            <Link
              to={`/profile/${username}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              {username}
            </Link>
          </Typography>

          {/* Time displayed next to the username */}
          <Typography variant="body2" color="textSecondary">
            {formatTimeDifference(timestamp)}
          </Typography>
        </Box>

        <Typography variant="body1" marginBottom={1}>
          {comment_body}
        </Typography>
      </Box>
    </Box>
  )
}

export default CommentItem
