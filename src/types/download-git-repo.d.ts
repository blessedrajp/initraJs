declare module 'download-git-repo' {
  const download: (
    repo: string,
    dest: string,
    callback: (err: Error | null) => void
  ) => void;

  export = download;
}
