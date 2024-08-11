import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <div>
          <div className="flex flex-col w-auto h-64 animate-pulse rounded-xl p-4 gap-4 ml-8">
            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            </div>
          </div>
          <div className="flex flex-col w-auto h-64 animate-pulse rounded-xl p-4 gap-4 ml-8">
            <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
              <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
