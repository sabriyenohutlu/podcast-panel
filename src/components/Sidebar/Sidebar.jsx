import "./Sidebar.scss";
import SidebarItem from "./SidebarItem/SidebarItem";
import HomeIcon from "@mui/icons-material/Home";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
const Sidebar = () => {
  const sidebarItems = [
    {
      label: "Anasayfa",
      id: 1,
      icon: <HomeIcon />,
      to: "/",
    },
    {
      label: "Podcast",
      id: 2,
      icon: <PodcastsIcon />,
      to: "/podcastler",
      nested: true,
      nest: [
        {
          label: "Podcast Ekle",
          to: "/podcastler/podcastekle",
        },
      ],
    },
    {
      label: "Kategoriler",
      icon: <LibraryMusicIcon />,
      id: 3,
      to: "/kategoriler",
      nested: false,
      nest: [
        {
          label: "Kategori Ekle",
          to: "/kategoriler/kategoriekle",
        },
      ],
    },
  ];

  const sidebarItemsList = sidebarItems.map((i, id) => {
    return <SidebarItem key={id} i={i} />;
  });


  return (
    <div className="sidebar">
      <div className="sidebar-itemList">{sidebarItemsList}</div>
    </div>
  );
};

export default Sidebar;
