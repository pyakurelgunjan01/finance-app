export default function Loading() {
  return (
    <div className="p-6 space-y-6">

      <div className="grid gap-6 md:grid-cols-3">

        {[1,2,3].map((item)=>(
          <div
            key={item}
            className="h-32 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}

      </div>


      <div className="grid gap-6 lg:grid-cols-2">

        <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />

        <div className="h-80 rounded-xl bg-gray-200 animate-pulse" />

      </div>


      <div className="h-60 rounded-xl bg-gray-200 animate-pulse" />

    </div>
  );
}