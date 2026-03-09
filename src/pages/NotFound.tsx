import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("Erro 404: essa rota não existe: ", location.pathname);
  }, [location.pathname]);

  return (
    <div className="w-screen min-h-screen bg-muted flex items-center flex-col justify-center gap-4">
      <span className="text-4xl font-bold">404</span>
      <span className="text-xl text-muted-foreground">Oops! Página não encontrada</span>
      <a href="/" className="text-primary underline font-bold hover:text-primary/90">Voltar à página principal</a>
    </div>
  );
};
