import { Github, Linkedin, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/dalessandro-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/dalessandro-gomes-davi-4394a8329/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://instagram.com/dalessandro.gd"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram size={18} />
        </a>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Desenvolvido por Dalessandro-Dev
      </p>
    </div>
  );
};
