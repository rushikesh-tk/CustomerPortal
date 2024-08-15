import React from "react";

interface Character {
  id: string;
  attributes: {
    name: string;
    slug: string;
    gender?: string;
  };
}

interface SidebarProps {
  data: Character[];
  loading: boolean;
  errorMsg: string;
  setSelectedId: (id: string) => void;
  selectedId: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  data,
  loading,
  errorMsg,
  setSelectedId,
  selectedId,
}) => {
  if (loading) {
    return <div className="sidebar-main">Loading...</div>;
  }

  if (errorMsg) {
    return <div className="sidebar-main">{errorMsg}</div>;
  }

  return (
    <div className="sidebar-main">
      {data.map((item) => (
        <div
          className="item-main"
          key={item.id}
          onClick={() => setSelectedId(item.id)}
          style={{
            backgroundColor: item.id === selectedId ? "skyblue" : undefined,
          }}
        >
          <div className="title">
            <p className="header">Name:</p> <p>{item.attributes.name}</p>
          </div>
          <div className="sub-title">
            <p className="header">Slug:</p> <p>{item.attributes.slug}</p>
          </div>
          <div className="sub-title">
            <p className="header">Gender:</p>
            <p>{item.attributes.gender || "Unknown"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
