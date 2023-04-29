import { useState } from "react";

import Auth from "@/components/auth";

function Login() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    
  };

  return <Auth handleSubmit={handleSubmit} loading={loading} />;
}

export default Login;
