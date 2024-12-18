import React from "react"
import { Box, Typography } from "@mui/material"
import CommentItem from "./commentItem"

/* arranges the comments into a scrollable list on the modal*/

interface Comment {
  username: string
  user_id: string
  comment_id: string
  comment_body: string
  timestamp: number
}

interface CommentListProps {
  comments: Comment[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const sortedComments = [...comments].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <Box
      sx={{
        maxHeight: "18vh",
        overflowY: "auto",
        paddingRight: "10px",
        marginTop: 2,
        padding: 1,
      }}
    >
      {sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <CommentItem
            key={comment.comment_id}
            comment_id={comment.comment_id}
            user_id={comment.user_id}
            username={comment.username}
            comment_body={comment.comment_body}
            timestamp={comment.timestamp}
          />
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6" align="center">
            No Comments
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default CommentList
