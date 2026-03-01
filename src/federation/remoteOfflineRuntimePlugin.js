function createOfflineModule(id, error) {
  const remoteName = id?.split("/")?.[0] || "remote";

  const RemoteOfflineFallback = function RemoteOfflineFallback() {
    return `Remote Unavailable: ${remoteName} failed to load${
      error?.message ? ` (${error.message})` : ""
    }`;
  };

  RemoteOfflineFallback.displayName = "RemoteOfflineFallback";
  RemoteOfflineFallback.getInitialProps = function getInitialProps() {
    return {};
  };

  return {
    __esModule: true,
    default: RemoteOfflineFallback,
    getServerSideProps: function getServerSideProps() {
      return { props: {} };
    },
  };
}

export default function remoteOfflineRuntimePlugin() {
  return {
    name: "host-remote-offline-runtime-plugin",
    errorLoadRemote(args) {
      const id = args?.id;
      const error = args?.error;

      return createOfflineModule(id, error);
    },
  };
}
