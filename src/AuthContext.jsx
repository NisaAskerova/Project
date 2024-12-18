import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Token yoxlanışı
    if (!token) {
      setIsLoading(false);
      // Token yoxdur, login səhifəsinə yönləndir
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/"
      ) {
        window.location.href = "/login";
      }
      return;
    }

    // API ilə istifadəçi məlumatlarını çəkmək
    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized"); // Token etibarsızdırsa, səhv atılır
        }

        const data = await response.json();
        if (data.status) {
          const userData = data.data;

          // İstifadəçi məlumatlarını state-də saxla
          setUser(userData);

          // İstifadəçi id-ni localStorage-ə əlavə et
          localStorage.setItem("user_id", userData.id);
          localStorage.setItem('firstName', userData.first_name);    
          localStorage.setItem('lastName', userData.last_name);    
          localStorage.setItem('email', userData.email);    
        } else {
          // Loginə yönləndir
          if (
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/"
          ) {
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        // Xəta baş verdikdə loginə yönləndir
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/"
        ) {
          window.location.href = "/login";
        }
      } finally {
        setIsLoading(false); // Yükləmə bitdi
      }
    };

    fetchUser();
  }, [token]);

  // Yükləmə vəziyyəti
  if (isLoading) {
    return <div className="loadingDiv"><img src="./loading.gif" alt="" /></div>;
  }

  // Kontekst təminatı
  return (
    <AuthContext.Provider value={{ user, setUser, token, role }}>
      {children}
    </AuthContext.Provider>
  );
};
