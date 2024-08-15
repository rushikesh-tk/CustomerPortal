import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Info from "./components/Info";

interface Character {
  id: string;
  attributes: {
    name: string;
    slug: string;
    gender?: string;
  };
}

const App: React.FC = () => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [charDataInfo, setCharDataInfo] = useState<Character | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetch("https://api.potterdb.com/v1/characters");
      const { data } = await result.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Network error in getting data");
    } finally {
      setLoading(false);
    }
  }, []);

  const getCharacterData = useCallback(
    (id: string) => {
      const charData = data.find((item) => item.id === id);
      setCharDataInfo(charData || null);
    },
    [data]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (selectedId) {
      getCharacterData(selectedId);
    }
  }, [selectedId, getCharacterData]);

  return (
    <div className="App">
      <Sidebar
        data={data}
        loading={loading}
        errorMsg={errorMsg}
        setSelectedId={setSelectedId}
        selectedId={selectedId}
      />
      <Info charDataInfo={charDataInfo} selectedId={selectedId} />
    </div>
  );
};

export default App;
