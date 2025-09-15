import React from "react";

import { getCats } from "../api";
import { Cat } from "../api/types";

export const useCatsHooks = () => {
  const [cats, setCats] = React.useState<Cat[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchCats = async () => {
    setLoading(true);
    const cats = await getCats(10);
    setCats(cats);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCats();
  }, []);

  return { cats, loading, error };
};