import React, { useEffect, useState, useCallback } from "react";

interface Character {
  id: string;
  attributes: {
    name: string;
    slug: string;
    gender?: string;
  };
}

interface Photo {
  id: string;
  download_url: string;
}

interface InfoProps {
  charDataInfo: Character | null;
  selectedId: string;
}

const Info: React.FC<InfoProps> = ({ charDataInfo, selectedId }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPhotos = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const result = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=9`
      );
      const data = await result.json();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedId) {
      setPageNumber(1);
      fetchPhotos(1);
    }
  }, [selectedId, fetchPhotos]);

  useEffect(() => {
    if (selectedId) {
      fetchPhotos(pageNumber);
    }
  }, [pageNumber, selectedId, fetchPhotos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageNumber((prevPage) => prevPage + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="info-main">
      <div>
        {charDataInfo ? (
          <pre>
            <div className="item-main" style={{ width: "50rem" }}>
              <div className="title">
                <p className="header">Name:</p>
                <p>{charDataInfo.attributes.name}</p>
              </div>
              <div className="sub-title">
                <p className="header">Slug:</p>
                <p>{charDataInfo.attributes.slug}</p>
              </div>
              <div className="sub-title">
                <p className="header">Gender:</p>
                <p>{charDataInfo.attributes.gender || "Unknown"}</p>
              </div>
            </div>
          </pre>
        ) : (
          <p>No character data selected</p>
        )}
      </div>

      <div className="photos-main">
        {loading ? (
          <p>Loading photos...</p>
        ) : (
          photos.map((photoItem) => (
            <img
              key={photoItem.id}
              src={photoItem.download_url}
              alt="Random photo"
              className="image-main"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Info;
