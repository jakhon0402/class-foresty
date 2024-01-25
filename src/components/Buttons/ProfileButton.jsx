import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function EditProfileButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className='w-[40px] h-[40px] flex justify-center items-center rounded-xl bg-fyTropic-200 dark:bg-forestydark-500 text-forestydark-100/80'
    >
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}

export function SocialLinkButton({ icon, text }) {
  return (
    <a
      href={text}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex gap-2 pr-2 text-[14px] text-forestydark-100 justify-center items-center p-1 w-fit h-[30px] backdrop-blur-md rounded-full  hover:text-foresty-500'
    >
      <FontAwesomeIcon
        icon={linksIcon[icon]}
        className='group-hover:text-white w-[20px] h-[20px]'
      />
      {text}
    </a>
  );
}

const linksIcon = {
  telegram: faTelegram,
  instagram: faInstagram,
  twitter: faTwitter,
  facebook: faFacebook,
  youTube: faYoutube,
  website: faGlobe,
};
