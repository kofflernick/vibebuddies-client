import React, { useEffect, useState } from 'react';
import getFriends from '../../api/getFriends';

// interface props for context
interface UserContextType {
  username: string;
  isEditing: boolean;
  setProperty: (name: string, value: any) => void;
  friendList?: Set<string>;
}

// properties expected within the user state
interface userProps {
  username: string;
  isEditing: boolean;
  friendList?: Set<string>;
}

export const UserContext = React.createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /**
   * context to hold the user's information
   */

  // state to hold the user information
  const [user, setUser] = useState<userProps>({
    username: '',
    isEditing: false,
  });

  // block to get the friends of the user based on the username that was passed through during log in
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // calling api to get friends based on the username
        const data = await getFriends(user.username);
        // block checks if friendlist is returned from server, retrieves the usernames of all the friends
        if (data?.data?.data.friendList) {
          const allFriends = data?.data?.data.friendList;
          const allUsernames = allFriends.map((friend: any) => {
            return friend.username;
          });
          // set the user's friends within the state
          setUser({
            ...user,
            friendList: new Set<string>([...allUsernames]),
          });
        }
      } catch (error) {
        console.log(
          `There was an error while retrieving personal info: ${error}`
        );
      }
    };
    fetchFriends();
  }, [user.username]);

  // function to update a property based on the name and value
  function setProperty(name: string, value: any): void {
    setUser({
      ...user,
      [name]: value,
    });
  }

  // returning the context provider with extractable props
  return (
    <UserContext.Provider
      value={{
        username: user.username,
        isEditing: user.isEditing,
        friendList: user.friendList,
        setProperty,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
