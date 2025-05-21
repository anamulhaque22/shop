export default function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          style={{ zIndex: 9999 }}
        >
          <span className="loading loading-infinity w-20"></span>
        </div>
      )}
    </>
  );
}
