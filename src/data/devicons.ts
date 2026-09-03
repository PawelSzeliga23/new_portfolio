// Maps skill ids (src/i18n/*.json -> skills.groups[].items[].id) to their Devicon class.
// Not every skill has a real-world logo (e.g. "SQL" generically, or soft skills like
// "Agile teamwork") — those simply have no entry and render without an icon.
export const DEVICONS: Record<string, string> = {
  typescript: "devicon-typescript-plain colored",
  javascript: "devicon-javascript-plain colored",
  python: "devicon-python-plain colored",
  java: "devicon-java-plain colored",
  csharp: "devicon-csharp-plain colored",
  cpp: "devicon-cplusplus-plain colored",
  react: "devicon-react-original colored",
  html5: "devicon-html5-plain colored",
  css3: "devicon-css3-plain colored",
  tailwindcss: "devicon-tailwindcss-original colored",
  framermotion: "devicon-framermotion-original colored",
  figma: "devicon-figma-plain colored",
  aspnetcore: "devicon-dotnetcore-plain colored",
  nodejsexpress: "devicon-nodejs-plain colored",
  postgresql: "devicon-postgresql-plain colored",
  mssqlserver: "devicon-microsoftsqlserver-plain colored",
  redis: "devicon-redis-plain colored",
  git: "devicon-git-plain colored",
  docker: "devicon-docker-plain colored",
};
