import defaultIamge from "../assets/foresty_green.png";
// import forestBg from "../assets/building.jpg";
import img from "../assets/foresty_white.png";

// const IMAGE_BASE_URL = "http://localhost:8080/v1/api/image/";
const IMAGE_BASE_URL = "https://platform.foresty.uz/v1/api/image/";

// export const getHeaderImageSrc = (headerImage) => {
//   return headerImage !== null
//     ? `${IMAGE_BASE_URL}${headerImage?.id}?t=${new Date().getTime()}`
//     : forestBg;
// };

export const getProfileAvatar = (avatar) => {
  return avatar !== null && avatar?.id
    ? `${IMAGE_BASE_URL}${avatar?.id}?t=${new Date().getTime()}`
    : defaultIamge;
};

export const getLogoSrc = (logo) => {
  return logo !== null && logo?.id
    ? `${IMAGE_BASE_URL}${logo?.id}?t=${new Date().getTime()}`
    : img;
};
