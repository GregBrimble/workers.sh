import React, { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import md5 from "md5";

const PROFILEPICTURE_QUERY = gql`
  {
    user {
      email
    }
  }
`;
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export const ProfilePicture: FC<{ className: string }> = ({ className }) => {
  const { loading, error, data } = useQuery(PROFILEPICTURE_QUERY);

  let profileImage = FALLBACK_IMAGE;
  if (!loading && !error)
    profileImage = `https://www.gravatar.com/avatar/${md5(
      data.user.email || ""
    )}?s=256&d=${encodeURIComponent(FALLBACK_IMAGE)}`;

  return <img className={className} src={profileImage} alt="Profile picture" />;
};
