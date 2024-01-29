import { FaGithub, FaYoutube, FaLinkedin, FaTelegram } from "react-icons/fa";
import { memo } from "react";
import Link from "next/link";
const socials = [
    {
        name: "Github",
        link: "https://github.com/sauravhathi",
        icon: <FaGithub className="text-4xl cursor-pointer bg-[#000000] text-white rounded-full p-2" />
    },
    {
        name: "Youtube",
        link: "https://www.youtube.com/c/sauravhathi",
        icon: <FaYoutube className="text-4xl cursor-pointer bg-[#FF0000] text-white rounded-full p-2" />
    },
    {
        name: "Instagram",
        link: "https://instagram.com/saurav_hathi",
        icon: <FaTelegram className="text-4xl cursor-pointer bg-[#E1306C] text-white rounded-full p-2" />
    },
    {
        name: "Linkedin",
        link: "https://linkedin.com/in/sauravhathi",
        icon: <FaLinkedin className="text-4xl cursor-pointer bg-[#0077B5] text-white rounded-full p-2" />
    },
    {
        name: "Telegram",
        link: "https://t.me/sauravhathi_yt_discussion",
        icon: <FaTelegram className="text-4xl cursor-pointer bg-[#0088CC] text-white rounded-full p-2" />
    },
]

export default memo(function Socials() {
    return (
        <div
          className="fixed left-2 top-1/2 transform -translate-y-1/2 z-50 backdrop-filter backdrop-blur-md bg-white bg-opacity-20 rounded-md p-2 flex flex-col gap-y-3"
        >
          {
            socials.map((social) => (
              <Link
                href={social.link}
                key={social.name}
                className="cursor-pointer text-sm hover:scale-110 transform transition-all"
                title={social.name}
              >
                {social.icon}
              </Link>
            ))
          }
        </div>
    )
})