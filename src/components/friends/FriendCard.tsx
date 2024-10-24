import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { UserContext } from '../Context/UserContext';
import deleteFriend from '../../api/deleteFriend';
import sendFriendRequest from '../../api/sendFriendRequest';

interface FriendProps {
  friend: {
    username?: string;
    profileImage?: string;
    favoriteSong?: string;
    favoriteArtist?: string;
    favoriteAlbum?: string;
    city?: string;
    state?: string;
    country?: string;
    bio?: string;
  };
}

const FriendCard: React.FC<FriendProps> = ({ friend }) => {
  /**
   * functional compoenent to display individual user information in card
   *
   */

  // getting information from usercontext
  const {
    username: loggedInUser,
    setProperty,
    friendList,
  } = useContext(UserContext)!;

  // checking if current user is friend of the logged in user
  let isFriend = friendList?.has(friend.username!);

  // navigate object
  const navigate = useNavigate();

  // function to handle navigating to user's profile when username is clicked, sets editing option to false
  const handleUsernameClick = (username: string | undefined) => {
    if (username) {
      navigate(`/profile/${username}`);
      setProperty('isEditing', false);
    }
  };

  // function to handle the deleting of a friend, updates context friendList
  async function handleDeleteFriend(
    username: string | undefined
  ): Promise<void> {
    await deleteFriend(username!);
    setProperty(
      `friendList`,
      new Set([...friendList!].filter((friend) => friend !== username))
    );
  }

  // function to send a friend request
  async function handleAddFriend(username: string | undefined): Promise<void> {
    await sendFriendRequest(username!);
  }

  // JSX
  return (
    <Card>
      <CardMedia>
        {/* profile image */}
        <Avatar
          src={
            friend.profileImage
              ? friend.profileImage
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s'
          }
          alt={friend.username}
          sx={{
            width: 100,
            height: 100,
            margin: 'auto',
            marginTop: 2,
          }}
        />
      </CardMedia>

      {/* clickable username */}
      <CardContent>
        <Typography
          variant="h6"
          onClick={() => handleUsernameClick(friend.username)}
          sx={{
            cursor: 'pointer',
            textAlign: 'center',
            textDecoration: 'underline',
          }}
        >
          {friend.username}
        </Typography>

        {/* conditionally render delete/add buttons*/}
        {loggedInUser !== friend.username && (
          <Button
            variant="contained"
            color={isFriend ? 'error' : 'primary'}
            startIcon={isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
            onClick={() =>
              isFriend
                ? handleDeleteFriend(friend.username)
                : handleAddFriend(friend.username)
            }
            sx={{ margin: 'auto', marginTop: 2 }}
          >
            {isFriend ? 'Remove Friend' : 'Add Friend'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendCard;
