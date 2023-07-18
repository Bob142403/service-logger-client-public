import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => navigate("/log"), [navigate]);
  return <></>;
}

export default HomePage;
